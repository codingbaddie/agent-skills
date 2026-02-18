# Rachel's PM Skill (資深 PM 版) - 使用手冊

## 1. 安裝與同步 (Installation & Sync)

您問到：「如何讓所有專案同步更新？」這裡有最佳解法：

### Symlink (軟連結) - **最推薦 🌟**
如果您想在多個專案使用此 Skill，但不想每次更新都複製貼上，請使用 **Symlink**。這樣所有的專案都會指向這一份「真理」，您只要更新這裡，所有專案都會同步。

**操作步驟 (Mac/Linux)**：

1.  開啟終端機 (Terminal)。
2.  進入目標專案的 `.agent/skills` 資料夾 (若無則建立)：
    ```bash
    mkdir -p ~/Documents/your-target-project/.agent/skills
    cd ~/Documents/your-target-project/.agent/skills
    ```
3.  建立連結 (指向此 Repo 的路徑)：
    ```bash
    # 假設此 Skill 在 ~/Documents/awesome-agent-skills/rachel-pm-skill
    ln -s ~/Documents/awesome-agent-skills/rachel-pm-skill .
    ```
4.  **完成！** 現在該專案已經擁有最新的 Skill。

> **💡 給新手的指令小知識：為什麼要 `mkdir -p`？**
> *   Antigravity 規定的 Skill 放置位置是 `.agent/skills`。
> *   但新專案通常沒有這些資料夾。
> *   `mkdir -p .agent/skills` 的意思是：「幫我建立 `skills` 資料夾，如果父層 `.agent` 也不存在，就順便幫我建出來！」(Parents flag)。
> *   這一步通了，後面的連結才能成功建立。

---

## 2. 設定 (Configuration)

### Google Workspace 連接
如果您希望我能讀取您的任何 Google 檔案 (包含 PRD, 試算表, 簡報)：
1.  **取得金鑰**：下載您的 Google Service Account JSON。
2.  **放置檔案**：將其重新命名為 `service_account.json` 並放在您專案的 **根目錄**。
3.  **自動化**：當您給我連結時，我會自動尋找這個檔案並使用它。

---

## 3. 互動迴圈 (Interaction Loop)

> **規則**：我 **絕不** 會在沒有您明確說「好/Yes」的情況下寫程式碼/文件。我們只有在達成共識時才會行動。

### 階段 1: 戰略挑戰 (Discovery)
**您說**：「我對 [功能] 有個想法...」
**AI 行為**：用 **產品感 (SENSE)** 挑戰您 (策略, 同理心, 細節)。

### 階段 2: 資料橋樑 (Smart Generation)
**AI 行為**：在同意故事後，生成 `_context/mock_data.json`。
*   *故事*：「篩選『高風險』病患。」 -> *資料*：建立 5 個 `risk_level: 'high'` 的病患。

### 階段 3: 戰術手術刀 (Refinement)
**AI 行為**：如果功能很大，使用 **SPIDR** 拆分 (Happy Path vs Edge Cases)。

### 階段 4: 藍圖 (Documentation)
**AI 行為**：生成「功能規格書 (Functional Spec)」。
*   **重點**：定義邏輯公式、狀態 (Empty/Error) 與驗收標準。

### 階段 5: Vibe Build (Prototyping)
**AI 行為**：切換到 **Tier 1 執行**，建立 `prototypes/v1-mvp/`。

---

## 4. 關鍵指令 (Triggers)
-   **"Challenge me" (挑戰我)**：強制進行戰略審查。
-   **"Split this story" (拆分故事)**：觸發 SPIDR 精煉。
-   **"Pivot" (轉向)**：開始一個新實驗 (`v2`) 而不破壞舊的。

---

## 5. 如何測試與維護 (給 Rachel)

### 測試技能
1.  **開新對話**。
2.  **輸入**：「我有一個關於 CRM 功能的新想法。」
3.  **驗證**：
    -   我有沒有問產品感問題？
    -   我有沒有堅持先寫 Spec 再寫 Code？
    -   我有沒有解釋「為什麼」？

### 更新技能
如果要加入新規則 (例如：「永遠使用 Tailwind」)：
1.  編輯 `SKILL.md`：在「關鍵規則」下加入新規則。
2.  編輯 `templates/`：修改範本。
3.  **重新載入**：重啟 Agent 以套用變更。
