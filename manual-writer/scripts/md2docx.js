#!/usr/bin/env node
/**
 * md2docx.js — 通用 Markdown → Word 轉換器(使用手冊用)
 *
 * 用法:node md2docx.js <input.md> <output.docx>
 * 依賴:npm install docx marked image-size
 * 相對路徑圖片(如 images/foo.jpg)以 input.md 所在資料夾為基準。
 * 支援:H1-H3、段落、**粗體**、*斜體*、`code`、pipe 表格、有序/無序清單、
 *       blockquote(渲染為左邊框提示框)、圖片(獨立段落 → 置中 + alt 文字作圖說)、hr。
 */
const fs = require('fs');
const path = require('path');
const { marked } = require('marked');
const { imageSize } = require('image-size');
const { Document, Packer, Paragraph, TextRun, Table, TableRow, TableCell, ImageRun,
        AlignmentType, LevelFormat, HeadingLevel, BorderStyle, WidthType, ShadingType } = require('docx');

const [,, INPUT, OUTPUT] = process.argv;
if (!INPUT || !OUTPUT) { console.error('用法:node md2docx.js <input.md> <output.docx>'); process.exit(1); }
const BASE = path.dirname(path.resolve(INPUT));

// ---- 樣式參數(要改外觀就改這裡)----
const FONT = 'Microsoft JhengHei';
const CW = 9026;                 // A4 內容寬(1 吋邊界)
const IMG_PX = 600;              // 圖片顯示寬(px)
const ACCENT = '1A7A85';         // H1 顏色
const NOTE_BG = 'EAF5F7', NOTE_BAR = '2BAAB8';
const TH_BG = 'D9EEF1';

// ---- inline tokens → TextRuns ----
function inlineRuns(tokens, st = {}) {
  const out = [];
  for (const t of (tokens || [])) {
    switch (t.type) {
      case 'strong': out.push(...inlineRuns(t.tokens, { ...st, bold: true })); break;
      case 'em': out.push(...inlineRuns(t.tokens, { ...st, italics: true })); break;
      case 'del': out.push(...inlineRuns(t.tokens, { ...st, strike: true })); break;
      case 'link': out.push(...inlineRuns(t.tokens, { ...st, color: '0563C1' })); break;
      case 'codespan': out.push(new TextRun({ text: t.text, font: 'Consolas', size: st.size || 20, shading: { fill: 'F2F2F2', type: ShadingType.CLEAR } })); break;
      case 'br': out.push(new TextRun({ break: 1 })); break;
      case 'image': break; // 段內圖片忽略(獨立段落圖片另行處理)
      case 'escape': case 'text': default:
        if (t.tokens) { out.push(...inlineRuns(t.tokens, st)); }
        else out.push(new TextRun({ text: t.text != null ? unescapeHtml(t.text) : (t.raw || ''), bold: st.bold, italics: st.italics, strike: st.strike, color: st.color, font: FONT, size: st.size || 22 }));
    }
  }
  return out;
}
function unescapeHtml(s) {
  return s.replace(/&amp;/g, '&').replace(/&lt;/g, '<').replace(/&gt;/g, '>').replace(/&quot;/g, '"').replace(/&#39;/g, "'");
}
function textOf(tokens) { return (tokens || []).map(t => t.tokens ? textOf(t.tokens) : (t.text || '')).join(''); }

// ---- block builders ----
const children = [];
const numberingUsed = { bullets: false, numbers: false };

function pushImage(src, alt) {
  const file = path.resolve(BASE, src);
  if (!fs.existsSync(file)) { console.warn('⚠️ 找不到圖片:', src); return; }
  const buf = fs.readFileSync(file);
  const dim = imageSize(buf);
  const type = (dim.type === 'jpg' || dim.type === 'jpeg') ? 'jpg' : dim.type;
  const ph = Math.round(dim.height * IMG_PX / dim.width);
  children.push(new Paragraph({
    children: [new ImageRun({ type, data: buf, transformation: { width: IMG_PX, height: ph },
      altText: { title: alt || src, description: alt || src, name: path.basename(src) } })],
    spacing: { before: 120, after: 40 }, alignment: AlignmentType.CENTER }));
  if (alt) children.push(new Paragraph({
    children: [new TextRun({ text: '▲ ' + alt, font: FONT, size: 18, color: '666666' })],
    alignment: AlignmentType.CENTER, spacing: { after: 200 } }));
}

const border = { style: BorderStyle.SINGLE, size: 1, color: 'BBBBBB' };
const borders = { top: border, bottom: border, left: border, right: border };
function buildTable(tok) {
  const ncol = tok.header.length;
  // 欄寬:依各欄最長字數加權,最小 1100
  const lens = tok.header.map((h, i) => Math.max(textOf(h.tokens).length,
    ...tok.rows.map(r => textOf(r[i].tokens).length), 2));
  const total = lens.reduce((a, b) => a + b, 0);
  let widths = lens.map(l => Math.max(1100, Math.round(CW * l / total)));
  const over = widths.reduce((a, b) => a + b, 0) - CW;
  widths[widths.indexOf(Math.max(...widths))] -= over; // 修正捨入誤差
  const cell = (tokens, w, head) => new TableCell({ borders, width: { size: w, type: WidthType.DXA },
    shading: head ? { fill: TH_BG, type: ShadingType.CLEAR } : undefined,
    margins: { top: 80, bottom: 80, left: 120, right: 120 },
    children: [new Paragraph({ children: inlineRuns(tokens, { bold: head }) })] });
  children.push(new Table({ width: { size: CW, type: WidthType.DXA }, columnWidths: widths,
    rows: [new TableRow({ tableHeader: true, children: tok.header.map((h, i) => cell(h.tokens, widths[i], true)) }),
      ...tok.rows.map(r => new TableRow({ children: r.map((c, i) => cell(c.tokens, widths[i], false)) }))] }));
  children.push(new Paragraph({ children: [], spacing: { after: 120 } }));
}

function walk(tokens, ctx = {}) {
  for (const tok of tokens) {
    switch (tok.type) {
      case 'heading': {
        const lvl = Math.min(tok.depth, 3);
        const heading = [HeadingLevel.HEADING_1, HeadingLevel.HEADING_2, HeadingLevel.HEADING_3][lvl - 1];
        children.push(new Paragraph({ heading, children: inlineRuns(tok.tokens, { size: [30, 26, 24][lvl - 1] }) }));
        break;
      }
      case 'paragraph': {
        const imgs = (tok.tokens || []).filter(t => t.type === 'image');
        const nonImg = textOf((tok.tokens || []).filter(t => t.type !== 'image')).trim();
        if (imgs.length && !nonImg) { imgs.forEach(im => pushImage(im.href, im.text)); break; }
        if (ctx.note) {
          children.push(new Paragraph({ children: inlineRuns(tok.tokens),
            spacing: { after: 160 }, shading: { fill: NOTE_BG, type: ShadingType.CLEAR },
            border: { left: { style: BorderStyle.SINGLE, size: 24, color: NOTE_BAR, space: 8 } },
            indent: { left: 200 } }));
        } else {
          children.push(new Paragraph({ children: inlineRuns(tok.tokens), spacing: { after: 120 } }));
        }
        break;
      }
      case 'table': buildTable(tok); break;
      case 'list': {
        const ref = tok.ordered ? 'numbers' : 'bullets';
        numberingUsed[ref] = true;
        for (const item of tok.items) {
          // 取 item 第一個段落作為列文字,巢狀清單遞迴
          const para = item.tokens.find(t => t.type === 'paragraph' || t.type === 'text');
          children.push(new Paragraph({ numbering: { reference: ref, level: 0 },
            children: inlineRuns(para ? (para.tokens || [para]) : []), spacing: { after: 80 } }));
          const sub = item.tokens.filter(t => t.type === 'list');
          if (sub.length) walk(sub, ctx); // 巢狀清單降級為同層(手冊场景足夠)
        }
        break;
      }
      case 'blockquote': walk(tok.tokens, { ...ctx, note: true }); break;
      case 'hr': children.push(new Paragraph({ children: [],
        border: { bottom: { style: BorderStyle.SINGLE, size: 6, color: 'CCCCCC', space: 1 } },
        spacing: { before: 120, after: 240 } })); break;
      case 'code': children.push(new Paragraph({
        children: [new TextRun({ text: tok.text, font: 'Consolas', size: 18 })],
        shading: { fill: 'F5F5F5', type: ShadingType.CLEAR }, spacing: { after: 120 } })); break;
      case 'space': break;
      default: break;
    }
  }
}

const md = fs.readFileSync(INPUT, 'utf-8');
walk(marked.lexer(md));

const doc = new Document({
  styles: {
    default: { document: { run: { font: FONT, size: 22 } } },
    paragraphStyles: [
      { id: 'Heading1', name: 'Heading 1', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 30, bold: true, font: FONT, color: ACCENT },
        paragraph: { spacing: { before: 320, after: 160 }, outlineLevel: 0 } },
      { id: 'Heading2', name: 'Heading 2', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 26, bold: true, font: FONT },
        paragraph: { spacing: { before: 240, after: 120 }, outlineLevel: 1 } },
      { id: 'Heading3', name: 'Heading 3', basedOn: 'Normal', next: 'Normal', quickFormat: true,
        run: { size: 24, bold: true, font: FONT },
        paragraph: { spacing: { before: 200, after: 100 }, outlineLevel: 2 } },
    ],
  },
  numbering: { config: [
    { reference: 'bullets', levels: [{ level: 0, format: LevelFormat.BULLET, text: '•', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 600, hanging: 300 } } } }] },
    { reference: 'numbers', levels: [{ level: 0, format: LevelFormat.DECIMAL, text: '%1.', alignment: AlignmentType.LEFT,
      style: { paragraph: { indent: { left: 600, hanging: 300 } } } }] },
  ] },
  sections: [{ properties: { page: { size: { width: 11906, height: 16838 },
    margin: { top: 1440, right: 1440, bottom: 1440, left: 1440 } } }, children }],
});

Packer.toBuffer(doc).then(buf => { fs.writeFileSync(OUTPUT, buf); console.log('✅ 已輸出', OUTPUT, '(' + buf.length + ' bytes)'); });
