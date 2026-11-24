# HackLink: project context

Tool-agnostic context for any coding agent working in this repo. Claude-specific working rules are in `CLAUDE.md`.

## Product
HackLink is a social network for the hackathon community (developers, designers, students, Guilds, organizers). Facebook-style social feed plus LinkedIn-style profiles and achievements. Tagline: **Connect. Compete. Collaborate.**

MVP: accounts + onboarding, feed (posts, comments, likes), connections, Guilds (public/private, roles), hackathon events (create, register, review, results), in-app notifications, optional approximate location.
Out of scope for now: recruitment posts, advanced portfolios, real-time chat, ranking, recommendations.

## Scope decisions (confirmed by the owner)
- **Iloilo only for now**, global later. Signup requires picking an Iloilo area (self-declared, not verified). People outside Iloilo go on a waitlist.
- Allowed regions live in one list: `src/config/regions.ts`. Going global = edit config, never hardcode "Iloilo" in logic.
- Location is an **area filter** (City district / province town), not a radius slider. No browser geolocation or nearby notifications yet. Event lat/lng stays optional.
- Defaults: timezone `Asia/Manila`, currency `PHP`. Online events allowed (flagged "Online").
- **Pending event applications count toward capacity.** Organizers can reject to free a slot. Apply this rule identically in backend and UI.
- **Free-tier stack first** (budget is near zero). Do not add paid services.

## Stack
Next.js 16 (App Router) + TypeScript, Tailwind 3, lucide-react icons. Planned: Prisma + Postgres (Neon), Auth.js (email + password), Zod validation, Vitest, Cloudflare R2 (images), Resend (password-reset email), Vercel hosting.
Do not add a dependency without saying why.

## Commands
```
npm install
npm run dev      # http://localhost:3000
npm run build
npm audit --omit=dev   # keep at 0 vulnerabilities
```

## Structure
- `src/app/(app)/*`: signed-in pages inside the shell (home, explore, guilds, hackathons, notifications)
- `src/components/`: `Shell` (sidebar + mobile tab bar), `EmptyState`; later `ui/`, `feed/`, `guild/`, `event/`
- `src/config/regions.ts`: allowed regions
- Planned `src/server/`: auth, permissions, posts, connections, guilds, events, registrations, notifications, location. Business logic lives here, never in components.

## Design
Light mode default. Tokens (in `tailwind.config.ts`): primary `#2563EB`, primary dark `#1D4ED8`, violet `#7C3AED`, cyan `#06B6D4`, bg `#F8FAFC`, surface `#FFFFFF`, ink `#101828`, muted `#64748B`, line `#E2E8F0`, night `#101828`.
Fonts: Inter (UI), Space Grotesk (headings), JetBrains Mono (sparingly, technical labels). Not a Facebook clone and not a generic admin template.
Every screen needs loading, empty, success and error states. Keep focus states, labels, semantic HTML and contrast.

## Data model (planned)
User, UserLocationPreference, Connection, Post, Comment, PostLike, Guild, GuildMembership (owner/admin/member), GuildInvitation, HackathonEvent, EventRegistration, EventResult, Notification.
Roles live on `GuildMembership` and per-event organizer assignment, not as one global role on `User`. Platform Admin is a flag on `User`. Use foreign keys, indexes, timestamps and uniqueness constraints (e.g. one registration per user per event).

## Business rules (non-negotiable)
1. Enforce authorization on the server, not only by hiding UI.
2. No duplicate event registrations.
3. No overbooking, even with concurrent requests: use a transaction with a row lock or a conditional update.
4. Reject registration after the deadline, if the event is closed/cancelled, or if capacity is reached.
5. Only the host Guild's admins/owner or assigned event organizers may edit events, review registrations or publish results.
6. A Guild can never be left without an owner.
7. Private Guild data must not leak to non-members.
8. Validate type and size of uploads. Sanitize user content before rendering.
9. Public profiles show approximate area only, never exact coordinates or addresses.
10. Never commit secrets. Use `.env.local` (see `.env.example`).

## Roadmap
- [x] 1.1 Scaffold, design tokens, app shell (build passes, audit clean)
- [ ] 1.2 Register / login / logout
- [ ] 1.3 Onboarding + profile (Iloilo area gate, waitlist)
- [ ] 1.4 Permission helpers + first auth tests
- [ ] Phase 2: feed, connections, notifications
- [ ] Phase 3: Guilds
- [ ] Phase 4: hackathons (registration + capacity, results)
- [ ] Phase 5: QA, seed data (marked as sample), docs
