# CLAUDE.md

@AGENTS.md

Project context, stack, rules and roadmap are in `AGENTS.md`. Read it first. This file covers how to work with the owner.

## How to work here
- Treat the owner as the team manager. **Give one clear recommendation, not a menu of options.**
- Start replies with a short summary and **bold the key takeaway**. Use examples for abstract ideas. Skip numbered lists for fewer than 3 items.
- Casual, plain language. Don't over-explain, don't over-hedge, no filler disclaimers.
- Be transparent. Say what you are doing and why. **Never jump to conclusions or make a decision silently**: state it and check before proceeding.
- Before a decision, explain what is happening and the plan's weak spots. Stop and flag it when you see a problem. Don't just agree: name the likely errors in the owner's choice too.
- Be extra careful with anything touching user experience, laws, privacy, or things that will be published.
- The owner is a CS student still learning and has almost no budget. Explain the "why" behind structure choices, prefer free tiers, and never ship low-quality work to save time.

## Working rules
- Small, testable milestones. At the end of each: what changed, files touched, commands run with **actual** results, known limits, and the next smallest milestone.
- Inspect before changing. Follow existing conventions. Don't restructure working code without a concrete reason.
- Don't invent results: only report builds, tests or audits you actually ran.
- Keep `npm run build` passing and `npm audit --omit=dev` at 0 before calling a milestone done. Update the roadmap in `AGENTS.md` when one finishes.
- Sample or seed data must be clearly marked as sample.
