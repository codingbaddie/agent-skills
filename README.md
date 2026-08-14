# Awesome Agent Skills — 個人 AI Skill 資產庫

> 這是 Rachel 的個人 AI 能力資產庫。Skill = 教會任何 AI(Claude / Gemini / 未來工具)執行某種工作流程的說明書 + 工具。
> 本 README 是**管理方法論本身**,它和 skills 一樣被版控、被迭代。改了方法論,就改這份文件並 commit。

---

## 一、核心理念

1. **Skill 是個人資產,不是專案資產**。專案會結束、工作會換、領域會變,但「我教會 AI 做事的方法」跟著我走。轉職後軟體 PM skills 可以封存,新領域 skills 長進來,倉庫不變。
2. **單一實體,多處接線**。每個 skill 只有這裡一份實體;各專案、各 AI 工具用「捷徑(symlink)+ 指路(設定檔)」接進來。永遠不複製實體——複製就是分叉的開始。
3. **遠端是真相**。GitHub(`codingbaddie/agent-skills`)是唯一真相來源。**改完必推,動工先拉**(`git pull` → 改 → `git push`),否則多台電腦會分叉。
4. **寫給未來的陌生 AI 看**。每次對話都是新的 AI,沒有記憶。Skill 必須完整到「任何 AI 第一次讀就能執行」——包括踩過的坑和為什麼。

## 二、倉庫結構

```
awesome-agent-skills/
├── README.md            ← 本文件(方法論)
├── rachel-pm-skill/     ← 資深 PM 顧問協作規則(軟體產品開發)
├── manual-writer/       ← 圖文使用手冊產生與迭代(瀏覽 PROD + 截圖 + md→docx)
├── brd-writer/          ← 業務/專業服務單位的 BRD 訪談與文件產生
├── brd-reviewer/        ← PM 側:審查收到的 BRD、產出補件問題清單
└── _archive/            ← 封存區:不再使用但不刪除的 skills(轉職時整批移入)
```

每個 skill 資料夾的標準構成:

| 檔案 | 必要性 | 用途 |
|---|---|---|
| `SKILL.md` | 必要 | 主體。frontmatter(name + description 含觸發詞)+ 完整工作流程 + 踩坑記錄 |
| `scripts/` | 視需要 | 可執行工具(讓流程確定性高的部分交給程式,AI 只做判斷) |
| `templates/` | 視需要 | 給使用端專案的範本(如狀態檔範本) |
| `README.md` / `USAGE.md` | 建議 | 給人看的簡介與使用範例 |

## 三、接線方式(skill 如何被各工具讀到)

| 工具 | 接線 | 說明 |
|---|---|---|
| Claude Code(所有 repo) | `~/.claude/skills/<skill> → 本倉庫/<skill>` 個人層捷徑 | 一條捷徑,全部 repo 自動發現,可用 `/skill名` 觸發 |
| Claude Code(特定 repo)/ Gemini / 其他 | repo 內 `.agent/skills/<skill> → 本倉庫/<skill>` 捷徑 + 該工具設定檔(CLAUDE.md / GEMINI.md)指路 | 捷徑**不進專案 git**(它是個人的,不強加給同事) |
| Cowork(桌面 app) | **首選**:開專案時把本倉庫也一起加入工作資料夾,對 AI 說「讀 .agent/skills/<skill> 照著做」(或由專案 CLAUDE.md 指路) | Cowork 不自動掃描資料夾內的 skill;repo 裡的捷徑指向倉庫,倉庫沒掛載捷徑會斷 |
| Cowork(替代) | 把 skill 資料夾 zip 成 `.skill` 安裝 | 換到自動觸發,但安裝是快照,skill 更新後要重新打包安裝 |

**指路原則(progressive disclosure)**:工具設定檔(如 CLAUDE.md)每次對話全文載入,只放「摘要 + 觸發對照表 + 完整內容的路徑」;完整 SKILL.md 命中觸發詞才去讀。省 context,細節不走樣。

## 四、Skill 生命週期

### 建立
1. **先做一次,再萃取**:不要憑空寫 skill。先和 AI 把任務完整做一遍,把過程中的決策、技巧、踩坑即時記下。
2. 任務完成後,讓 AI 把 know-how 萃取成 SKILL.md:「把這次流程寫成 skill,包含所有踩過的坑和解法」。
3. 觸發詞寫進 description(中英文都放),否則 AI 不知道何時該用它。
4. 確定性高的步驟寫成 script 收進 `scripts/`,AI 只負責需要判斷的部分。
5. `git add` → `commit`(規範見下)→ `push`。

### 迭代
1. 每次**使用** skill 後,若發現新坑、新技巧、流程改進 → 當場跟 AI 說「把這個學習更新進 xxx skill」。
2. AI 改 SKILL.md → commit → push。**用了沒更新,等於這次的學習費用白繳。**
3. 使用端專案的狀態(如哪個畫面截過圖)寫進該專案的狀態檔(如 `docs/manual_state.md`),**不要寫進 skill**——skill 放通用方法,專案放專案事實。

### 封存(轉職 / 不再使用)
1. `git mv <skill> _archive/<skill>`,commit 訊息註明原因。
2. 移除各工具的捷徑與指路。
3. **永不刪除**:git 歷史 + `_archive/` 是妳的方法論履歷,新領域常會意外用回舊方法。

## 五、Git 規範

- **Commit 訊息**:`<type>(<skill名>): <做了什麼>`,type 用 `feat` / `fix` / `docs` / `refactor` / `archive`。例:`feat(manual-writer): tooltip 截圖限制與對策`
- **節奏**:改完即 commit + push,不累積。動工前先 `git pull`。
- **新電腦 / 換電腦開機流程**(可重複執行,`ln -sfn` 已存在會覆蓋):
  ```bash
  # 1. skill 倉庫(已有就 pull,沒有就 clone)
  cd ~/Documents/awesome-agent-skills 2>/dev/null && git pull || git clone git@github.com:codingbaddie/agent-skills.git ~/Documents/awesome-agent-skills

  # 2. 個人層捷徑(所有 repo 的 Claude Code 可呼叫)— 每個常用 skill 一條
  mkdir -p ~/.claude/skills
  ln -sfn ~/Documents/awesome-agent-skills/manual-writer ~/.claude/skills/manual-writer
  ln -sfn ~/Documents/awesome-agent-skills/rachel-pm-skill ~/.claude/skills/rachel-pm-skill
  ln -sfn ~/Documents/awesome-agent-skills/brd-writer ~/.claude/skills/brd-writer
  ln -sfn ~/Documents/awesome-agent-skills/brd-reviewer ~/.claude/skills/brd-reviewer

  # 3. 各專案 repo:git pull 後補專案層捷徑(如需要)
  # ln -sfn ~/Documents/awesome-agent-skills/<skill> <repo>/.agent/skills/<skill>
  ```
- **指令同步不到的每機設定**:Chrome「允許多檔下載」(第一次跑截圖時點允許)、Cowork 的 .skill 安裝(要用時重新打包裝一次)。

## 六、給 AI 的指令(把這段唸給任何 AI 都有效)

- 「**建立新 skill**」→ 依本 README 第四節「建立」流程,放進本倉庫,接線後 commit + push 給我確認
- 「**更新 xxx skill**」→ 先 `git pull`,改該 skill 的 SKILL.md / scripts,commit + push 給我確認
- 「**封存 xxx skill**」→ `git mv` 進 `_archive/`,清接線,commit 註明原因
- 任何時候改了本倉庫,**結束前必須提醒 Rachel push**(AI 沙盒通常無權直接推)

---

*方法論版本:v1.0(2026-06-06,由 manual-writer 建立過程萃取)。改進方法論 = 改本文件 + commit,讓它跟 skills 一起進化。*
