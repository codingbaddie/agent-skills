---
name: manual-writer
description: "Write and iterate illustrated user manuals (圖文使用手冊) for web products by browsing PROD with Claude in Chrome, capturing real screenshots into the repo, maintaining a Markdown source of truth, and exporting an embedded-image Word file for Google Docs distribution. Triggers: 寫使用手冊, 更新手冊, 迭代手冊, user manual, manual update, 重建 docx, PRD 更新後同步手冊. Works in any repo; state lives in docs/manual_state.md."
---

# Manual Writer — 圖文使用手冊產生與迭代

把「試用 PROD → 截圖 → 寫手冊 → 出 Word 檔給 end user」變成可重複流程。
**單一事實來源 = repo 裡的 `docs/<功能>_user_manual.md` + `docs/images/`**。Word 檔永遠由 md 重建,不手改。

## 檔案約定(每個 repo 相同)

| 路徑 | 用途 |
|---|---|
| `docs/<feature>_user_manual.md` | 手冊內容源頭(圖片用相對路徑 `images/xxx.jpg`) |
| `docs/images/manual_*.jpg` | PROD 實機截圖 |
| `docs/manual_state.md` | 狀態檔:PROD 版本、截圖清單與操作路徑、待確認問題(**每次開工先讀,收工必更新**) |
| `docs/<feature>_user_manual.docx` | 建置產物,給 Google Docs 用,由腳本重建。**不進版控**(gitignore),發佈版本由 Google Drive 版本管理保存 |
| `scripts/md2docx.js` | md → docx 轉換器(本 skill 附帶,第一次使用時複製進 repo) |

## 工作流程

### Phase 0 — Preflight(每次必做)
0. **鎖定功能**:一個 repo 可能有多個小功能、多份 PRD 與多本手冊。從使用者的指名(功能名稱 / PRD 檔名 / 手冊檔名擇一)鎖定本次目標;模糊時列出 `docs/` 下所有 `*_user_manual.md` + PRD 請使用者選,**不要猜**。每個功能一本手冊、manual_state.md 中一個「## 功能:XXX」分節。
1. 讀 `docs/manual_state.md` 中該功能的分節(沒有就從 `templates/manual_state_template.md` 建立)。
2. 讀現有手冊 md 與 PRD;若使用者給了新版 PRD,先 diff 出規格差異清單。
3. 確認瀏覽器:`tabs_context_mcp` → 開 PROD 頁面。**若被導到 login 頁,請使用者手動登入**(絕不代輸帳密)。
4. 確認「下載」資料夾是否已掛載為工作資料夾(能 ls 到最佳);沒有就請使用者掛載,或 fallback 到請使用者手動拖檔。

### Phase 1 — 試用 PROD + 比對
- 逐畫面操作:每個主要視圖、每個互動(點列、開 modal、開 picker、開 dropdown、hover tooltip)。
- 對照手冊現有描述與截圖,列出「UI 有變 / 沒變」清單。**只重拍有變的圖**。
- 發現 PRD 與 PROD 不一致 → 記入 manual_state 的「待確認」,不要自行腦補進手冊。

### Phase 2 — 截圖(關鍵 know-how,照做可避開所有坑)
原生截圖工具看得到但存不了檔;用頁面內 canvas 截圖 + 瀏覽器下載:

1. 注入 html2canvas(cdnjs 1.4.1),建立 `snapdl(name)`:capture `document.body`(scale 1.5, jpeg 0.85)→ 建 `<a download>` 觸發下載。
2. **每拍一張立刻下載**,不要暫存批次下載(分頁一關全沒了)。
3. Chrome 會擋第 2 個之後的自動下載 → 請使用者點網址列的封鎖圖示選「一律允許」(每個瀏覽器 profile 一次)。
4. **每張圖下載後必須用 Read 工具開圖驗證內容**——別相信「拍了就是對的」。
5. 已知限制與對策:
   - **Tooltip(Chakra 等 portal 元件)canvas 拍不到**,即使 DOM 裡存在。對策:tooltip 內容用表格寫進手冊;若運氣好真實滑鼠 hover 後立刻 snap 偶爾拍得到,失敗兩次就放棄。
   - Modal、雙月曆、自訂 dropdown 都拍得到,放心。
   - **使用者調整視窗大小後,先前的座標全部失效**——每次互動前重新 screenshot 取座標。
   - Escape 不一定關得掉 modal,點擊前先 screenshot 確認目前狀態,否則會把 modal 拍進每一張圖。
   - JS dispatch mouseenter 能讓 tooltip 出現在 DOM,但 canvas 仍拍不到,別浪費時間。
6. 檔名:`manual_NN_語意.jpg`(NN = 手冊圖序)。下載後從「下載」資料夾搬進 `docs/images/`(已掛載就自己搬,否則請使用者拖)。

### Phase 3 — 寫 / 改手冊 md
- 結構:用途 → 介面總覽(圖)→ 各區塊逐節(圖文交錯)→ 完整定義表 → FAQ。
- 受眾是非技術使用者:白話、具體數字例子、「灰底不是壞掉」這類安撫性說明。
- 規格類文字(metric 定義、tooltip 文案)必須抄自 PRD / spec 文件,不要憑印象改寫。
- 特殊符號用通用字元(★ 不用 ⭑;箭頭用 →),否則 Word 顯示豆腐字。
- 圖片 alt 文字會變成 Word 裡的圖說,認真寫。

### Phase 4 — 出 Word 檔
```bash
cd <repo> && npm install docx marked image-size   # 第一次
node scripts/md2docx.js docs/<feature>_user_manual.md docs/<feature>_user_manual.docx
```
驗證:轉 pdf → pdftoppm 出前 2 頁 → Read 檢查版面(表格、圖、圖說、提示框)。

### Phase 5 — 收尾
1. 更新 `docs/manual_state.md`:PROD 版本、本次變更、截圖清單、待確認問題。
2. commit(md + images + state,**docx 不進版控、加入 .gitignore**),訊息格式:`docs: <feature> 使用手冊 vX.Y(變更摘要)`。
3. **push 由使用者執行**(沙盒無 SSH 金鑰):`git push origin <branch>`。
4. 提醒使用者:Google Drive 對舊 docx 用「管理版本 → 上傳新版本」,分享連結不變。

## 人類必做清單(向使用者明示)
1. Chrome 登入 PROD(安全規則)
2. 第一次:允許多檔下載 + 掛載「下載」資料夾(之後全自動)
3. `git push`
4. 給新 PRD、審內容差異、回答規格疑問(PM 判斷)
5. Google Drive 上傳新版 docx(或授權 Drive 連接器代傳)
