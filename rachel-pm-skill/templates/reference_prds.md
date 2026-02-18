# PRD 參考範本

你不需要從頭開始。選擇最符合目前任務的範本，然後複製貼上到 `_context/PRD.md` 中。

---

## 選項 A: 功能規格書 (Functional Spec) - **推薦使用**
**適用於**：需要交付給工程師實作的具體功能。強調邏輯、狀態與驗收標準。
請直接使用範本：`templates/functional_spec_template.md`

---

## 選項 B: 標準 PRD (Standard PRD)
**適用於**：核心功能、複雜邏輯、涉及多個利害關係人。

```markdown
# [功能名稱] PRD

**狀態**: [草稿 | 審查中 | 已核准]
**擁有者**: [Your Name]
**設計**: [Link]
**Epic**: [Link to Jira/Linear]

## 1. 執行摘要 (Executive Summary)
*一句話解釋這是什麼，以及為什麼現在要做。*
> 我們要建立 [X]，因為 [Y]，這將解鎖 [Z]。

## 2. 問題陳述 (Problem Statement)
**目前狀況**：
使用者目前必須 [描述痛苦的工作流]。

**影響**：
這導致 [時間浪費/數據遺失/挫折]。

**證據**：
*   "[使用者語錄]"
*   [數據/指標] (例如：50% 的使用者在這裡流失)

## 3. 目標與成功指標 (Goals & Success Metrics)
*   **主要指標**: [例如：功能採用率 > 20%]
*   **次要指標**: [例如：完成時間減少 50%]
*   **反指標 (Guardrails)**: [例如：不要增加頁面載入時間]

## 4. User Stories (由 SPIDR/INVEST 精煉)
| ID | 用戶角色 (As a...) | 想要 (I want to...) | 以便 (So that...) |驗收標準 (AC) |
|----|---|---|---|---|
| 1 | 營養師 | 篩選病患名單 | 快速找到高風險病患 | 1. 支援依風險等級篩選 <br> 2. 篩選後數據即時更新 |
| 2 | | | | |

## 5. 功能需求 (Functional Requirements)
### 5.1 [子功能 A]
*   [邏輯細節]
*   [邊緣案例處理]

### 5.2 [子功能 B]
*   ...

## 6. 技術考量 (Technical Specs)
*   **API 變更**: [例如：新增 `GET /patients?risk=high`]
*   **資料庫**: [例如：新增 `risk_level` 欄位]
*   **安全性**: [例如：只有 Admin 可見]

## 7. 發布策略 (Go-to-Market)
*   [ ] 內部 QA
*   [ ] Beta 測試 (5 個診所)
*   [ ] 全面發布
```

---

## 選項 B: 一頁式 PRD (One-Pager)
**適用於**：小型功能、優化、UI 調整。

```markdown
# [功能名稱] One-Pager

## 為什麼做這個？ (Why)
[簡短解釋問題與價值]

## 做什麼？ (What)
**核心邏輯**:
1.  使用者點擊 [A]。
2.  系統驗證 [B]。
3.  顯示 [C]。

**範圍 (Scope)**:
*   **In**: [包含什麼]
*   **Out**: [不包含什麼]

## 畫面草圖 (Wireframe/Mockup)
[描述或連結]

## 驗收標準 (Acceptance Criteria)
1.  [AC 1]
2.  [AC 2]
```

---

## 選項 C: Agile Epic
**適用於**：規劃一個衝刺 (Sprint) 或一組相關的故事。

```markdown
# Epic: [Epic 名稱]

## 願景 (Vision)
[這個 Epic 完成後，世界會變成怎樣？]

## 包含的故事 (Stories in Scope)
*   **Must Have**:
    *   [Story 1]
    *   [Story 2]
*   **Should Have**:
    *   [Story 3]
*   **Could Have**:
    *   [Story 4]

## 關鍵依賴 (Dependencies)
*   [需要後端先完成 API X]
*   [需要設計師提供 Icon]

## 測試計畫 (QA Plan)
*   [測試場景 A]
*   [測試場景 B]
```

---

## 選項 D: 功能簡報 (Feature Brief)
**適用於**：早期探索，尚未確定解法。

```markdown
# 功能探索: [主題]

## 背景 (Context)
我們觀察到 [現象]。

## 機會 (Opportunity)
如果我們能 [假設]，我們可能會 [結果]。

## 潛在解法 (Potential Solutions)
1.  **方案 A**: [描述] (優點/缺點)
2.  **方案 B**: [描述] (優點/缺點)

## 下一步 (Next Steps)
*   [ ] 進行 3 個使用者訪談
*   [ ] 建立快速原型 (Spike)
```
