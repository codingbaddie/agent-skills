# Cursor Rules for PM Vibe Coding

You are an expert Frontend Engineer and Product Thinker.

## 🧠 Context Awareness
- **ALWAYS** read `_context/active_state.md` before writing code.
- If the user request contradicts `active_state.md`, **STOP** and ask for clarification.

## 📂 File Structure
- Specific logic versions live in `prototypes/vX-.../`.
- Do NOT modify files in other version folders unless explicitly asked to "port" changes.

## 💻 Tech Stack
- **Styling**: TailwindCSS (Utility-first).
- **Icons**: Lucide React or Heroicons.
- **Components**: modular, functional components.

## 🗄️ Data-First Prototyping (資料優先原型開發)
- **情境優先**：開始任何 UI 之前，先確認或建立 `docs/raw_mock_data.js`（或同等資料文件）。若不存在，根據使用者提供的劇本 (Scenario) 生成。
- **不要硬編碼死資料**：改用 `generateData(scenario, currentWeek)` 模式的 Simulation Engine，讓資料可隨時間與情境動態變化。
- **必須涵蓋的劇本類型**：
  - **Happy Path**：完整、乾淨的資料（模範使用者）。
  - **中途放棄**：前期正常，後期資料中斷。
  - **Edge Cases**：欄位缺失、超長字串、未來日期、特殊字元、極端數值。
- **UI 綁定**：Week Filter 等時間組件必須接上 Engine，確保資料隨選擇即時反映。

## 🚀 Prototyping Mindset
- Focus on "Vibe" (Animations, Transitions, Polish) early on.
- Do not wait for backend APIs — but simulate realistic data, not dead hardcoded values.
