# Rachel's PM Skill - User Manual

## 1. Installation & Sync

If you want to use this Skill across multiple projects without copy-pasting every time, AND you need to sync it across multiple computers (e.g., working from desktop and laptop), follow these steps:

### Step 1: Centralized Repository Setup (First-time per computer)
Clone this repository to a centralized location on your machine (e.g., your `Documents` folder) so all your projects can reference it.

1. Open Terminal.
2. Clone the repository:
   ```bash
   cd ~/Documents
   git clone https://github.com/codingbaddie/agent-skills.git awesome-agent-skills
   ```

### Step 2: Use Symlink in Your Projects (Recommended 🌟)
Use a **Symlink** to link the centralized skill to each of your projects. This acts as a desktop shortcut; updating the central skill updates it everywhere.

1.  Go to your target project's `.agent/skills` folder (create if missing):
    ```bash
    mkdir -p ~/Documents/your-target-project/.agent/skills
    cd ~/Documents/your-target-project/.agent/skills
    ```
2.  Create the link (pointing to the centralized repository):
    ```bash
    ln -s ~/Documents/awesome-agent-skills/rachel-pm-skill .
    ```
3.  **Done!** Now that project has the latest Skill.

> **💡 Tip: Why `mkdir -p`?**
> *   Antigravity expects skills in `.agent/skills`.
> *   New projects often lack these folders.
> *   `mkdir -p` creates parent directories if they don't exist.

### Step 3: Synching Across Multiple Computers
Since the skill is a Git repository, you can easily synchronize changes across all your computers:

*   **When you update the skill:** Go to `~/Documents/awesome-agent-skills`, run `git commit`, and `git push` to GitHub.
*   **When you switch to another computer:** Open Terminal, go to `~/Documents/awesome-agent-skills`, and run `git pull` to get the latest updates. All your symlinked projects on that computer will instantly use the updated skill.

---

## 2. Configuration

### Google Workspace Connection
If you want me to read your Google files (PRD, Sheets, Slides):
1.  **Get Key**: Download your Google Service Account JSON.
2.  **Place File**: Rename it to `service_account.json` and place it in your project's **root directory**.
3.  **Automation**: When you give me a link, I'll automatically find and use this file.

---

## 3. Interaction Loop

> **Rule**: I will **NEVER** write code/docs without your explicit "Yes". We only act on consensus.

### Phase 1: Discovery
**You say**: "I have an idea for [Feature]..."
**AI Behavior**: Challenges you with **Product Sense (SENSE)** (Strategy, Empathy, Nuance).

### Phase 2: Smart Generation
**AI Behavior**: After agreeing on the story, generates `_context/mock_data.json`.
*   *Story*: "Filter 'High Risk' patients." -> *Data*: Create 5 patients with `risk_level: 'high'`.

### Phase 3: Refinement (The Scalpel)
**AI Behavior**: If the feature is large, uses **SPIDR** to split it (Happy Path vs Edge Cases).

### Phase 4: Documentation (Blueprint)
**AI Behavior**: Generates "Functional Spec".
*   **Focus**: Logic formulas, States (Empty/Error), and Acceptance Criteria.

### Phase 5: Prototyping (Vibe Build)
**AI Behavior**: Switches to **Tier 1 Execution** to build `prototypes/v1-mvp/`.

---

## 4. Key Triggers
-   **"Challenge me"**: Forces a strategic review.
-   **"Split this story"**: Triggers SPIDR refinement.
-   **"Pivot"**: Starts a new experiment (`v2`) without breaking the old one.

---

## 5. How to Test & Maintain (For Rachel)

### Testing the Skill
1.  **Start a new session**.
2.  **Input**: "I have a new idea for a CRM feature."
3.  **Verify**:
    -   Did I ask product sense questions?
    -   Did I insist on specs before code?
    -   Did I explain "Why"?

### Updating the Skill
To add a new rule (e.g., "Always use Tailwind"):
1.  Edit `SKILL.md`: Add the rule under "Key Rules".
2.  Edit `templates/`: Modify templates.
3.  **Reload**: Restart the Agent to apply changes.

---
---

# Rachel's PM Skill (資深 PM 版) - 使用手冊 (中文版)

## 1. 安裝與同步 (Installation & Sync)

如果您想在多個專案使用此 Skill (避免每次更新都複製貼上)，同時又有在**多台電腦間切換工作**的需求，請依照以下步驟設定：

### 第一步：集中管理技能儲存庫 (每台電腦的首次設定)
將此儲存庫下載到電腦上的一個集中位置 (例如 `Documents` 資料夾)，讓所有的專案都能參考到同一份檔案。

1. 開啟終端機 (Terminal)。
2. 下載儲存庫：
   ```bash
   cd ~/Documents
   git clone https://github.com/codingbaddie/agent-skills.git awesome-agent-skills
   ```

### 第二步：在專案中使用 Symlink (軟連結) - 最推薦 🌟
使用 **Symlink** 將集中管理的技能連結到您的各個專案中。概念就像「捷徑」，只要集中管理的檔案更新了，所有專案都會自動同步。

1.  進入目標專案的 `.agent/skills` 資料夾 (若無則建立)：
    ```bash
    mkdir -p ~/Documents/your-target-project/.agent/skills
    cd ~/Documents/your-target-project/.agent/skills
    ```
2.  建立連結 (指向集中管理的儲存庫)：
    ```bash
    ln -s ~/Documents/awesome-agent-skills/rachel-pm-skill .
    ```
3.  **完成！** 現在該專案已經擁有最新的 Skill。

> **💡 給新手的指令小知識：為什麼要 `mkdir -p`？**
> *   Antigravity 規定的 Skill 放置位置是 `.agent/skills`。
> *   但新專案通常沒有這些資料夾。
> *   `mkdir -p .agent/skills` 的意思是：「幫我建立資料夾，如果父層不存在，就順便幫我建出來！」

### 第三步：在多台電腦之間同步工作
因為這個技能庫是以 Git 進行版本控制，在不同電腦間切換非常簡單：

*   **當您更新了技能：** 在 `~/Documents/awesome-agent-skills` 目錄下執行 `git commit` 以及 `git push` 上傳變更。
*   **當您換到另一台電腦：** 開啟終端機進入 `~/Documents/awesome-agent-skills`，執行 `git pull` 抓取最新進度。該電腦上所有透過 Symlink 連結技能的專案，就會在瞬間自動更新！

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
