# Use the BRD skills in your company's plugin marketplace

[中文說明在下方](#中文)

This is for teams that already run an internal Claude Code plugin marketplace (a repo with `.claude-plugin/marketplace.json` that everyone adds with `claude plugin marketplace add <org>/<repo>`). It packages `brd-writer` + `brd-reviewer` as one plugin, `brd-toolkit`. You can also include only `brd-writer` if PMs in your company review BRDs their own way.

There are two ways to do it. Pick one.

## Option A: Reference this repo (recommended)

Add this entry to the `plugins` array in your `marketplace.json`. Nothing gets copied into your repo.

```json
{
  "name": "brd-toolkit",
  "source": { "source": "url", "url": "https://github.com/codingbaddie/agent-skills.git" },
  "skills": ["./brd-writer", "./brd-reviewer"],
  "description": "BRD writer (for business teams) + BRD reviewer (for PMs), by codingbaddie",
  "category": "productivity"
}
```

Then run `claude plugin validate .` and merge. Colleagues install it with:

```bash
claude plugin install brd-toolkit@<your-marketplace-name>
```

- **Pros**: You get every improvement without doing anything. Nothing to keep in sync.
- **Cons**: Changes reach your colleagues without your review. Pin a version with `"ref": "<tag-or-commit>"` inside `source` if you want to review upgrades first.
- Use the HTTPS `url` source shown above. The `github` source type clones over SSH, which fails for anyone without a GitHub SSH key.

## Option B: Vendor a copy

Use this if your company needs to review every change, or wants to adapt the skills (for example, to add a dependency on your shared conventions plugin).

```bash
# from your marketplace repo root
mkdir -p plugins/brd-toolkit/skills
cp -R /path/to/agent-skills/brd-writer   plugins/brd-toolkit/skills/
cp -R /path/to/agent-skills/brd-reviewer plugins/brd-toolkit/skills/
mkdir -p plugins/brd-toolkit/.claude-plugin
cp /path/to/agent-skills/for-teams/template/.claude-plugin/plugin.json plugins/brd-toolkit/.claude-plugin/
```

Add the entry to `marketplace.json`:

```json
{
  "name": "brd-toolkit",
  "source": "./plugins/brd-toolkit",
  "description": "BRD writer (for business teams) + BRD reviewer (for PMs)",
  "category": "productivity"
}
```

Then `claude plugin validate .`. If your marketplace has a shared conventions plugin (PII rules and so on), add it under `dependencies` in `plugin.json`.

- **Pros**: Full control. You can edit the skills for your company's terms and processes.
- **Cons**: Updates from this repo don't arrive on their own. Re-copy when you want them, and keep a note of which commit you copied from.

## What your colleagues should know

- `brd-writer` is for the people **writing** requirements: business, operations, professional services. Most of them use Claude in the browser, not Claude Code. Give them the `.zip` from [Releases](https://github.com/codingbaddie/agent-skills/releases) to upload under **Settings → Capabilities → Skills**, alongside the plugin for Claude Code users.
- `brd-reviewer` is for the **PM** who receives the BRD.
- Both skills are written in Traditional Chinese.

---

## 中文

給已經有內部 Claude Code plugin marketplace 的公司用（一個放著 `.claude-plugin/marketplace.json` 的 repo，大家用 `claude plugin marketplace add <org>/<repo>` 加入）。這裡把 `brd-writer` 和 `brd-reviewer` 包成一個 plugin：`brd-toolkit`。如果你們的 PM 審 BRD 有自己的做法，也可以只放 `brd-writer`。

兩種做法，選一種就好。

### 做法 A：直接引用這個 repo（建議）

把上方 **Option A** 的 JSON 加進你們 `marketplace.json` 的 `plugins` 陣列，什麼都不用複製。跑過 `claude plugin validate .` 之後 merge，同事就能用 `claude plugin install brd-toolkit@<你們的 marketplace 名稱>` 安裝。

- **好處**：我之後的每次改版你們都會自動拿到，不用維護同步。
- **代價**：改動會直接到同事手上，你們沒有先審。想先審再升級的話，在 `source` 裡加 `"ref": "<tag 或 commit>"` 鎖住版本。
- 請用上面的 HTTPS `url` 寫法。`github` 寫法會用 SSH clone，沒有設定 GitHub SSH 金鑰的人會裝不起來。

### 做法 B：複製一份進你們的 repo

適合每次改動都要審、或想依公司用語和流程改寫的團隊。照上方 **Option B** 的指令複製兩個資料夾和 [`template/.claude-plugin/plugin.json`](./template/.claude-plugin/plugin.json)，再把 entry 加進 `marketplace.json`。如果你們有共用規範的 plugin（例如個資規則），在 `plugin.json` 的 `dependencies` 加上它。

- **好處**：完全由你們控制，可以改成公司自己的用語。
- **代價**：這裡的更新不會自動過去，要的時候重新複製，並記下是從哪個 commit 複製的。

### 要讓同事知道的事

- `brd-writer` 是給**寫需求的人**：業務、營運、專業服務單位。他們多半用網頁版 Claude，不是 Claude Code。除了 plugin 之外，也把 [Releases](https://github.com/codingbaddie/agent-skills/releases) 的 `.zip` 給他們，在 **Settings → Capabilities → Skills** 上傳。
- `brd-reviewer` 是給收到 BRD 的 **PM**。
