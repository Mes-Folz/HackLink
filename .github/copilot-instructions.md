## Graphify

Before responding to every new prompt in this HackLink workspace, make a small local Graphify
lookup, even when the request does not appear code-related:

```text
graphify query "<concise interpretation of the prompt>" --budget 800 --depth 1
```

Use the result only when relevant; do not force unrelated graph details into the answer. For code
relationships, `graphify path "<A>" "<B>"` can be more focused; for a single concept, use
`graphify explain "<concept>"`.

The current graph covers `src/` only, so it cannot answer questions about workspace instructions,
other files, or general topics. Inspect the appropriate source directly when needed, especially
when modifying or debugging code. If the graph is missing or stale after source changes, run
`graphify update .` before relying on it. If Graphify is unavailable, state that and continue
without pretending a lookup succeeded.

Graphify lookups are local and may reduce source context for code questions, but they do not
guarantee lower token usage for every prompt; simple or unrelated requests may incur lookup overhead.

## UI/UX Pro Max

For every prompt that designs, builds, changes, reviews, or fixes a user-facing interface, read and
apply `.github/skills/ui-ux-pro-max/SKILL.md` before responding or editing. This applies
automatically; the user does not need to name the skill. Follow its search workflow when design
guidance is needed, and keep HackLink's dark black/red design direction and product decisions. Skip the
skill for purely backend, infrastructure, or other non-visual tasks, as described in its "When to
Apply" section.

## Ponytail

For every software engineering task in this workspace, read and apply
`.github/skills/ponytail/SKILL.md` by default; the user does not need to activate it. Use its
default `full` mode unless the user asks otherwise. Keep the smallest complete change, but never
use minimalism to skip HackLink's required security, validation, accessibility, error handling,
tests, or project-specific rules. End coding-task replies with what was not checked and any
material risk.
