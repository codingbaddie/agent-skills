# Agent Skills by codingbaddie

> PM skills for Claude, built from real work and iterated from real usage evidence.

[中文版](./README_ZH.md) · [How I manage these skills](./METHODOLOGY.md) · [AI PM Survival Guide](https://github.com/codingbaddie/ai-pm-survival-guide)

I'm Rachel, a product manager. These are the skills I use every day with Claude. One of them, `brd-writer`, is in my company's internal plugin marketplace, where business teams use it to write requirements before they talk to a PM.

| Skill | For | What it does | Iterations |
|:---|:---|:---|:---|
| [**brd-writer**](./brd-writer) | Business / professional-services teams | Interviews the requester and turns "we need a report" into a BRD a software PM can make decisions on. Then checks its own output against evidence, not memory. | 7 rounds, Aug 2026 |
| [**brd-reviewer**](./brd-reviewer) | PMs | Reviews a received BRD, finds the gaps, and produces a follow-up question list ready to send. Given several BRDs, it flags where they collide: same people, same data, same customer journey. | 7 rounds, Aug 2026 |
| [**rachel-pm-skill**](./rachel-pm-skill) | PMs | A senior-PM consultant mode: trade-offs with every recommendation, align before acting, story splitting, decision logs, spec templates. | Since Feb 2026 |
| [**manual-writer**](./manual-writer) | PMs / docs owners | Walks through production with Claude in Chrome, captures real screenshots, keeps Markdown as the source of truth, exports Word. | Since Jun 2026 |

All skill instructions are written in Traditional Chinese.

## Install

### Claude Code (individuals)

```bash
claude plugin marketplace add codingbaddie/agent-skills
claude plugin install brd-writer@codingbaddie-skills
claude plugin install brd-reviewer@codingbaddie-skills
```

Install only the ones you need. The other two are `rachel-pm-skill` and `manual-writer`. Run `/reload-plugins` or restart Claude Code afterward.

### Claude.ai / Claude Desktop (individuals)

Download a skill's `.zip` from [Releases](https://github.com/codingbaddie/agent-skills/releases), then upload it in Claude under **Settings → Capabilities → Skills**. This is the path for requesters who use Claude in the browser rather than Claude Code.

### Your company's plugin marketplace (teams)

If your company already runs an internal Claude Code plugin marketplace, add the BRD skills as one plugin that tracks this repo. See **[for-teams/](./for-teams)** for both options: reference this repo (you get updates automatically) or vendor a copy (you control every change).

## Why these are built the way they are

**Two skills for one requirement, on purpose.** `brd-writer` started as one skill that also contained "how a PM reviews a BRD." The users are different: requesters need guidance in plain language, PMs need gaps at a glance. So it became two skills with deliberately different checklists. `brd-writer`'s is technique-oriented: how to ask so you get an answer. `brd-reviewer`'s is symptom-oriented: what a document looks like when something wasn't asked.

**Every round starts from real evidence.** A BRD a requester actually wrote with the skill, my PM comments on it, or a fix that didn't hold. Each gap is classified before it's fixed. Was it something the requester should have supplied? Then add an elicitation technique. Was it the PM's own judgment call? Then keep it out of the requester's questions entirely.

**Some things I learned the hard way, now built in:**
- **Self-review must rely on evidence, not memory.** "Did I ask about X?" always gets a yes. "List every verb in section 1; is each followed by a concrete action?" can't be fooled.
- **A new conversation is a free third-party review.** Requesters on the web app have no subagents, so the skill hands them a ready-to-paste prompt for a fresh conversation.
- **Separate "who detects" from "who acts."** Human detection is often exactly the pain a requirement exists to remove.
- **Tag every number** as measured, estimated, or to verify.
- **Same title, different people.** Two BRDs said "consultants" and meant teams an order of magnitude apart in size. The skill now asks for scope and headcount for every role.
- **Don't build infrastructure for a problem that hasn't happened.** A cross-BRD registry is designed and documented in `brd-reviewer/README.md`, with the condition that should trigger building it.

The full story is in [Turning PM Workflows into Skills](https://github.com/codingbaddie/ai-pm-survival-guide/blob/main/articles/Skills_as_Product_EN.md).

## Contributing

Issues and PRs are welcome, especially **real usage evidence**: a BRD the skill produced, where it missed, and what a good answer would have looked like. That's what every round so far has been built on.

## License

[MIT](./LICENSE)
