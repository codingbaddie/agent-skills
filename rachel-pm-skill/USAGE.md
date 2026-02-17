# Rachel's PM Skill (資深 PM 版) - 使用手冊

## 如何在您現有的 Repo 中使用

這個技能就像是您的「資深產品夥伴」駐紮在 IDE 裡。它不會只是執行程式碼；它會挑戰您的策略、精煉您的故事，並管理您的原型。

### 1. 設定 (Configuration)

#### A. 全域安裝 (Global Install)
不需要設定。只要在 Antigravity 中開啟您的 Repo。確保技能已啟用。

#### B. Google Workspace 連接 (Docs, Sheets, Slides, Drive)
如果您希望我能讀取您的任何 Google 檔案 (包含 PRD, 試算表, 簡報, 或列出資料夾)：
1.  **取得金鑰**：下載您的 Google Service Account JSON。
2.  **放置檔案**：將其重新命名為 `service_account.json` 並放在您專案的 **根目錄**。
3.  **自動化**：當您給我連結時，我會自動尋找這個檔案並使用它，不再囉嗦。

### 6. 如何測試與維護 (給 Rachel)

#### 測試技能
1.  **開新對話**：在 Antigravity 開啟一個全新的 Chat。
2.  **輸入**：「我有一個關於 CRM 功能的新想法。」
3.  **驗證**：
    -   我有沒有問產品感問題 (策略/細節)？
    -   我有沒有在同意故事*之後*才生成 `_context/mock_data.json`？
    -   我有沒有在沒有共識的情況下拒絕寫 code？
    -   **我有沒有解釋「為什麼」？** (我是您的 PM 導師，我應該要說明我的決策邏輯)。

#### 更新技能
如果您想加入新規則 (例如：「永遠使用 Tailwind」)：
1.  編輯 `SKILL.md`：在「關鍵規則」下加入新規則。
2.  編輯 `templates/`：修改 PRD 或 Cursor Rules 範本。
3.  **重新載入**：重啟 Agent 以套用變更。

---

### 1. 安裝 (Installation)

**強烈推薦：設定為全域 Skill (Global Skill)**
這樣您不需要每次都複製檔案。

1.  開啟 Antigravity 設定 (Settings)：按下 `Cmd + ,`。
2.  在搜尋欄輸入 `Skills`。
3.  在 **"Agent: Skills Directory"** 欄位中，填入此路徑：
    `/Users/rachelweng/Documents/awesome-agent-skills`
4.  按下 `Cmd + Shift + P`，輸入 `Reload Window` 並執行。
5.  完成！現在您打開任何專案都能呼叫 Rachel Skill。

### 2. 互動迴圈 (預期會發生什麼)

> **註**：對話語言中英文皆可，但所有檔案 (Files) 都會是 **繁體中文**。
> **規則**：我 **絕不** 會在沒有您明確說「好/Yes」的情況下寫程式碼/文件。我們只有在達成共識時才會行動。

#### 階段 1: 戰略挑戰 (Discovery)
**觸發**：專案開始 / 新想法。
**您說**：「我對 [功能] 有個想法...」
**AI 行為**：
-   我會用 **產品感 (SENSE)** 挑戰您 (策略, 同理心, 細節)。
-   我們一起定義 **User Stories** 和 **場景**。

#### 階段 2: 資料橋樑 (Smart Generation)
**觸發**：在我們對故事達成共識後。
**AI 行為**：
-   **我會說**：「好，基於這些故事，我需要生成資料宇宙 (`mock_data.json`) 來測試它們。」
-   **行動**：我會專門為您的場景生成資料：
    -   *故事*：「篩選『高風險』病患。」 -> *資料*：我建立 5 個 `risk_level: 'high'` 的病患。
    -   *故事*：「處理缺失 Email。」 -> *資料*：我建立 2 個 `email: null` 的病患。
-   **結果**：您的原型將擁有驗證邏輯所需的 *精確* 資料。

#### 階段 3: 戰術手術刀 (Refinement)
**您說**：「好，我們來做 X。」
**AI 行為**：
-   如果功能很大，我會建議使用 **SPIDR** 拆分它。
    -   「我們先做 Happy Path 好嗎？」
    -   「v1 先忽略邊緣案例？」
-   我會用 **INVEST** 檢查品質 (可協商, 有價值, 小)。
-   **產出**：更新 `_context/active_state.md`。

#### 階段 C: 藍圖 (Documentation)
**您說**：「核准。」
**AI 行為**：
-   我會問您要選哪個 PRD 範本：
    -   *標準*：複雜功能。
    -   *一頁式*：快速想法。
    -   *Epic*：衝刺規劃。
-   **產出**：生成 `_context/PRD.md`。

#### 階段 D: Vibe Build (Prototyping)
**您說**：「做吧。」
**AI 行為**：
-   切換到 **Tier 1 執行** (快速, 乾淨的 code)。
-   建立專用資料夾：`prototypes/v1-mvp/`。
-   生成針對您堆疊的 `.cursorrules` 檔案。
-   構建自包含的原型。

### 3. 關鍵指令 (Triggers)
-   **"Challenge me" (挑戰我)**：強制進行戰略審查 (Tier 3)。
-   **"Split this story" (拆分故事)**：觸發 SPIDR 精煉 (Tier 2)。
-   **"Pivot" (轉向)**：開始一個新實驗 (`v2`) 而不破壞舊的。

### 4. 為什麼這感覺很不一樣？
您會看到一個乾淨的結構浮現，而不是混亂的根目錄：
```
your-repo/
├── _context/           # 您的「大腦」與規格
├── prototypes/         # 您的實際程式碼實驗
│   ├── v1-MVP/
│   └── v2-NewIdea/
└── pm_collaboration_rules.md  # 您的專案規則
```
讓您的主程式庫保持安全，同時您可以快速迭代。
