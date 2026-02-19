# PM Vibe Coding Skill

A custom skill designed for Product Managers to iteratively design, document, and prototype features with strict context management.

## Installation

1.  **Copy** this entire `pm-vibe-coding` folder into your project's skill directory.
    -   Recommended: `[Your-Repo]/.antigravity/skills/pm-vibe-coding/`
    -   Or simply keep it in `[Your-Repo]/skills/pm-vibe-coding/`

## Usage

1.  **Start a Session**:
    > "Use the PM Vibe Coding skill to help me design the new [Feature Name]."

2.  **Follow the Flow**:
    -   **Discovery**: The AI will ask you questions to clarify the "Why".
    -   **Documentation**: The AI will help you draft a PRD.
    -   **Prototyping**: The AI will build a `v1` prototype.

3.  **Iterate**:
    -   If you want to change logic, say: "I want to try a different approach for the logic."
    -   The AI will create a `v2` folder to preserve your `v1`.

## Key Files

-   `_context/active_state.md`: The "Brain" of your session. **Always** check this if the AI seems lost.
-   `prototypes/`: Where your code lives, separated by version.

## 💡 Scenario Example

When you propose a vague, large feature, the Agent transforms into your **Agile Coach**, guiding you to break it down:

**User**: 
> "I want to add a feature: When a user uploads a diet record, if calories exceed the limit, the system should pop up a warning, recommend 3 low-cal recipes, and email the nutritionist."

**Agent (Rachel PM Skill)**:
> *(Refinement Mode Activated)*
> 
> This Story sounds like it contains multiple paths and might cause a traffic jam if brought directly into a Sprint. Let's break it down using **SPIDR**:
> 
> 1.  **Rules**: Logic for determining "exceeding calorie limit".
> 2.  **Data**: Algorithm for recommending "low-cal recipes".
> 3.  **Interface**: Emailing the nutritionist.
> 
> **Suggested Split**:
> For this Sprint, shall we focus on the core value: **"Detecting excess calories and showing a warning"**?
> 
> Also, regarding the warning style, per **INVEST's Negotiable principle**: Let's define "User must see the warning" but leave the implementation (Modal vs Toast) open for discussion with RDs during implementation, instead of locking it down now.

---

# PM Vibe Coding Skill (中文版)

專為產品經理 (PM) 設計的技能，用於迭代設計、撰寫文檔和原型製作，並具備嚴格的情境管理。

## 安裝 (Installation)

1.  **複製** 整個 `pm-vibe-coding` 資料夾到你專案的 skill 目錄。
    -   推薦路徑：`[Your-Repo]/.antigravity/skills/pm-vibe-coding/`
    -   或者簡單放在：`[Your-Repo]/skills/pm-vibe-coding/`

## 使用方法 (Usage)

1.  **開始對話 (Start a Session)**:
    > "Use the PM Vibe Coding skill to help me design the new [Feature Name]." (請使用 PM Vibe Coding 技能來幫我設計新的 [功能名稱])

2.  **跟隨流程 (Follow the Flow)**:
    -   **探索 (Discovery)**: AI 會問你問題來釐清 "Why" (為什麼要做)。
    -   **文檔 (Documentation)**: AI 會協助你草擬 PRD。
    -   **原型 (Prototyping)**: AI 會建立 `v1` 原型。

3.  **迭代 (Iterate)**:
    -   如果你想改變邏輯，說："I want to try a different approach for the logic." (我想嘗試不同的邏輯方法)
    -   AI 會建立一個 `v2` 資料夾來保留你的 `v1`。

## 關鍵檔案 (Key Files)

-   `_context/active_state.md`: 你對話的「大腦」。如果 AI 迷路了，**務必**檢查這裡。
-   `prototypes/`: 程式碼存放的地方，依版本區分。

## 💡 實戰場景 (Scenario Example)

當你提出一個模糊的大功能時，Agent 會變身為你的 **Agile Coach**，引導你進行拆解：

**User**: 
> 「我要加一個功能：用戶上傳飲食紀錄後，如果熱量超標，系統要自動跳出警示，並且推薦三個低卡食譜，還要順便寄信給營養師。」

**Agent (Rachel PM Skill)**:
> *(Refinement Mode 啟動)*
> 
> 這張 Story 聽起來包含了很多路徑，直接進 Sprint 可能會塞車。我們用 **SPIDR** 拆解一下：
> 
> 1.  **Rules (規則)**：判斷「熱量超標」的邏輯。
> 2.  **Data (數據)**：推薦「低卡食譜」的演算法。
> 3.  **Interface (介面)**：寄信通知營養師。
> 
> **建議拆法**：
> 這個 Sprint我們先專注在 **「判斷超標並跳出警示」** (核心價值) 好嗎？
> 
> 另外，關於警示樣式，根據 **INVEST 的 Negotiable 原則**：我們先定義「用戶必須看到警示」，至於要用 Modal 還是 Toast，保留給 RD 實作時討論，不要現在寫死。
