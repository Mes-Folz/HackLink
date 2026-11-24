# Graph Report - HackLink  (2026-11-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 56 nodes · 128 edges · 7 communities (5 shown, 2 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `8c049b7c`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- Community 0
- Community 1
- Community 2
- Community 3
- Community 4
- Community 5
- Community 6

## God Nodes (most connected - your core abstractions)
1. `Avatar()` - 9 edges
2. `PageHeading()` - 6 edges
3. `GuildCard()` - 6 edges
4. `PostCard()` - 5 edges
5. `Shell()` - 5 edges
6. `ExplorePage()` - 5 edges
7. `EventCard()` - 5 edges
8. `SAMPLE_EVENTS` - 4 edges
9. `HomePage()` - 3 edges
10. `LikeButton()` - 3 edges

## Surprising Connections (you probably didn't know these)
- `HomePage()` --calls--> `PageHeading()`  [EXTRACTED]
  app/(app)/home/page.tsx → components/PageHeading.tsx
- `AppLayout()` --calls--> `Shell()`  [EXTRACTED]
  app/(app)/layout.tsx → components/Shell.tsx
- `HackathonsPage()` --calls--> `PageHeading()`  [EXTRACTED]
  app/(app)/hackathons/page.tsx → components/PageHeading.tsx
- `ExplorePage()` --calls--> `EventCard()`  [EXTRACTED]
  app/(app)/explore/page.tsx → components/EventCard.tsx
- `HomePage()` --calls--> `PostCard()`  [EXTRACTED]
  app/(app)/home/page.tsx → components/PostCard.tsx

## Import Cycles
- None detected.

## Communities (7 total, 2 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.26
Nodes (5): HomePage(), STARTING_POINTS, LikeButton(), PostCard(), SAMPLE_POSTS

### Community 1 - "Community 1"
Cohesion: 0.35
Nodes (6): AppLayout(), CommunityRail(), PreviewNotice(), NAV, Shell(), ALLOWED_REGIONS

### Community 2 - "Community 2"
Cohesion: 0.36
Nodes (7): ExplorePage(), GuildsPage(), NotificationsPage(), SAMPLE_ACTIVITY, Avatar(), GuildCard(), PageHeading()

### Community 3 - "Community 3"
Cohesion: 0.36
Nodes (5): AvatarTone, TONE_CLASSES, SampleEvent, SampleGuild, SamplePost

### Community 5 - "Community 5"
Cohesion: 0.50
Nodes (3): SAMPLE_EVENTS, SAMPLE_GUILDS, SAMPLE_MEMBERS

## Knowledge Gaps
- **2 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Avatar()` connect `Community 2` to `Community 0`, `Community 3`, `Community 5`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Why does `PageHeading()` connect `Community 2` to `Community 0`, `Community 6`?**
  _High betweenness centrality (0.016) - this node is a cross-community bridge._