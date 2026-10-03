# Agent Skills by codingbaddie

> 給 Claude 用的 PM skill。從真實工作裡做出來，靠真實使用證據迭代。

[English](./README.md) · [我怎麼管理這些 skill](./METHODOLOGY.md) · [AI PM Survival Guide](https://github.com/codingbaddie/ai-pm-survival-guide)

我是 Rachel，產品經理。這些是我每天跟 Claude 一起用的 skill。其中 `brd-writer` 已經上架到公司內部的 plugin marketplace，業務單位在找 PM 討論需求之前，會先用它把需求寫清楚。

| Skill | 誰用 | 做什麼 | 迭代 |
|:---|:---|:---|:---|
| [**brd-writer**](./brd-writer) | 業務 / 專業服務單位 | 用訪談的方式追問，把「我們需要一個報表」變成軟體 PM 能拿來做決策的 BRD，最後再「憑證據」複查自己的產出 | 7 輪，2026-08 |
| [**brd-reviewer**](./brd-reviewer) | PM | 審收到的 BRD，挑出缺口，產出可以直接發給需求方的補件問題清單；多份 BRD 一起給時，抓出撞到同一批人、同一份資料、同一段客戶旅程的地方 | 7 輪，2026-08 |
| [**rachel-pm-skill**](./rachel-pm-skill) | PM | 資深 PM 顧問模式：每個建議附 trade-off、先對齊再動手、拆 story、決策紀錄、規格範本 | 2026-02 起 |
| [**manual-writer**](./manual-writer) | PM / 文件負責人 | 用 Claude in Chrome 實際操作 PROD、截真實畫面，Markdown 當 source of truth，再匯出 Word | 2026-06 起 |

## 安裝

### Claude Code（個人）

```bash
claude plugin marketplace add codingbaddie/agent-skills
claude plugin install brd-writer@codingbaddie-skills
claude plugin install brd-reviewer@codingbaddie-skills
```

需要哪個裝哪個，另外兩個是 `rachel-pm-skill` 和 `manual-writer`。裝完執行 `/reload-plugins` 或重開 Claude Code。

### Claude.ai / Claude 桌面版（個人）

到 [Releases](https://github.com/codingbaddie/agent-skills/releases) 下載 skill 的 `.zip`，在 Claude 的 **Settings → Capabilities → Skills** 上傳。需求方大多是用網頁版 Claude，不是 Claude Code，走這條就對了。

### 公司的 plugin marketplace（團隊）

如果你們公司已經有內部的 Claude Code plugin marketplace，可以把兩個 BRD skill 當成一個 plugin 加進去。做法見 **[for-teams/](./for-teams)**，有兩種：直接引用這個 repo（自動拿到更新），或複製一份進你們的 repo（每次改動都由你們把關）。

## 為什麼這樣設計

**一個需求，刻意拆成兩個 skill。** brd-writer 一開始也塞了「PM 怎麼審 BRD」。但使用者不同：需求方要引導、要白話，PM 要一眼看到缺什麼。所以拆成兩個，而且刻意不共用 checklist。brd-writer 是技巧導向，教需求方怎麼問才問得出答案；brd-reviewer 是症狀導向，看文件長什麼樣代表當初沒問到。

**每一輪都從真實證據開始。** 一份需求方真的用 skill 寫出來的 BRD、我自己的 PM 批註，或是上一輪沒修好的地方。每個缺口先分類再修：是需求方本來該補、只是沒被問到？那就加一個追問技巧。是 PM 自己該判斷的？那就不要變成需求方的問題。

**踩坑學到、已經寫進 skill 的事：**
- **自我複查要憑證據，不能憑記憶。** 問「我有沒有問到 X」它永遠說有；問「把第 1 節每個動詞列出來，看後面有沒有具體動作」它騙不了。
- **新對話就是免費的第三方審查。** 網頁版沒有 subagent，所以 skill 會直接給需求方一段可以貼進新對話的指令。
- **「誰偵測」跟「誰執行」要分開寫。** 人工偵測常常正是需求要消滅的痛點。
- **每個數字標來源**：實測、估計、待查。
- **同一個職稱，可能是完全不同的人。** 兩份 BRD 都寫「顧問」，人數卻差一個數量級。現在每個角色都會追問歸屬和人數。
- **還沒發生的問題，先不要蓋基礎建設。** 跨 BRD 的需求登記簿已經設計好，連同「什麼時候該做」寫在 `brd-reviewer/README.md`。

完整故事在[《把 PM 的工作流程做成 Skill》](https://github.com/codingbaddie/ai-pm-survival-guide/blob/main/articles/Skills_as_Product_ZH.md)。

## 參與貢獻

歡迎開 issue 或 PR，最歡迎的是**真實使用證據**：skill 產出的 BRD、哪裡漏了、好的答案應該長什麼樣。到目前為止的每一輪都是這樣做出來的。

## License

[MIT](./LICENSE)
