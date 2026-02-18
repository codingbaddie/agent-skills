# [功能名稱] 功能規格書 (Functional Specification)

> **適用對象**：Frontend, Backend, QA
> **目的**：定義「邏輯」、「狀態」與「驗收標準」，而非實作細節。

## 1. 背景與目標 (Context & Goals)
### 為什麼要做這個？
[簡述商業價值，例如：統一 HIS 與 Pro2 的數據定義]

### 成功指標 (Success Metrics)
*   [指標 1]
*   [指標 2]

---

## 2. 功能/邏輯對照表 (Function/Logic Map)
> **定義每個欄位或元件的邏輯來源。**
> (如有 UI/Figma 請附上截圖或連結；若無，請描述該欄位名稱)

| 欄位/元件 (Field/Component) | 邏輯定義 (Logic Definition) | 文案與 Tooltip (Copy) | 排除/例外規則 (Exclusions) |
| :--- | :--- | :--- | :--- |
| **[範例：活躍人數]** | `(Underperforming + On Track) / Total Active` | **Tooltip**: 活躍會員定義為... | 排除狀態為 `Loss of Contact` 的會員 |
| **[欄位 B]** | [公式或邏輯] | [顯示文字] | [排除規則] |

---

## 3. 狀態定義 (State Definitions)
> **定義系統的各種狀態，確保沒有模糊地帶。**

### 3.1 核心狀態 (Core States)
*   **[狀態 A，例如：Underperforming]**：
    *   **定義**：當 [條件 X] 成立 且 [條件 Y] 不成立。
    *   **UI 表現**：顯示紅燈。
*   **[狀態 B，例如：No Data]**：
    *   **定義**：當 [時間範圍內] 完全沒有數據輸入。
    *   **UI 表現**：顯示灰色 `-` 符號 (不是 `0`)。

### 3.2 資料優先權 (Data Priority)
> 當多個數據來源衝突時，誰是 Source of Truth？
1.  優先讀取 [來源 A]
2.  若無，則讀取 [來源 B]
3.  若皆無，則視為 [No Data]

---

## 4. 邊界案例與防呆 (Edge Cases & Error Handling)
> **工程師最需要知道的「如果...怎麼辦？」**

| 情境 (Scenario) | 預期行為 (Expected Behavior) | 錯誤訊息 (Error Message) |
| :--- | :--- | :--- |
| **完全無數據 (Cold Start)** | 顯示引導畫面 (Empty State)，包含 `[Action Button]` | N/A |
| **數據計算中 (Loading)** | 顯示 Skeleton Screen (骨架屏) | N/A |
| **部分數據遺失** | 顯示有的部分，缺漏處標示 `N/A` | N/A |
| **斷網/API 錯誤** | 顯示上次快取數據 (如有)，並顯示 Retry Toast | "網路連線異常，請重試" |
| **跨週/跨月邊界 (Carry Over)** | 若本週無數據，自動帶入上週數據 (Carry Over 邏輯) | 顯示 "Last updated: [Date]" |

---

## 5. 驗收標準 (QA Verification Criteria)
> **QA 驗收時必須通過的測試案例。**

### ✅ 必須通過 (Must Pass)
1.  [ ] **驗證公式**：輸入 A=10, B=20，確認 UI 顯示為 30%。
2.  [ ] **驗證排他性**：確認一個會員不會同時屬於 [狀態 A] 和 [狀態 B]。
3.  [ ] **驗證 Tooltip**：Hover 時顯示正確文案，且無錯字。
4.  [ ] **驗證 Empty State**：建立一個全新帳號，確認看到的是引導畫面而非 `NaN` 或空白。

---

## 6. 技術附註 (Technical Check - Optional)
> 僅在此紀錄「會影響邏輯」的技術限制，非實作細節。
*   資料頻率：此數據為每日更新 (T-1)，非即時。
*   權限控管：只有 `Role: Admin` 可見此區塊。
