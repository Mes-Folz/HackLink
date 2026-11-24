# Graph Report - HackLink  (2026-11-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 120 nodes · 303 edges · 8 communities (7 shown, 1 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `b93f9d16`
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
- Community 7

## God Nodes (most connected - your core abstractions)
1. `PageHeading()` - 12 edges
2. `Avatar()` - 11 edges
3. `SAMPLE_EVENTS` - 8 edges
4. `EventCard()` - 7 edges
5. `ALLOWED_REGIONS` - 7 edges
6. `ExplorePage()` - 6 edges
7. `GuildCard()` - 6 edges
8. `MockAuthForm()` - 6 edges
9. `PostCard()` - 6 edges
10. `ProfilePage()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `IndexPage()` --calls--> `Avatar()`  [EXTRACTED]
  app/page.tsx → components/Avatar.tsx
- `ExplorePage()` --calls--> `Avatar()`  [EXTRACTED]
  app/(app)/explore/page.tsx → components/Avatar.tsx
- `ExplorePage()` --calls--> `ConnectionPreviewButton()`  [EXTRACTED]
  app/(app)/explore/page.tsx → components/ConnectionPreviewButton.tsx
- `ExplorePage()` --calls--> `PageHeading()`  [EXTRACTED]
  app/(app)/explore/page.tsx → components/PageHeading.tsx
- `GuildsPage()` --calls--> `PageHeading()`  [EXTRACTED]
  app/(app)/guilds/page.tsx → components/PageHeading.tsx

## Import Cycles
- None detected.

## Communities (8 total, 1 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.16
Nodes (15): ExplorePage(), GuildsPage(), HackathonsPage(), ManageEventPage(), EventCard(), Application, EventReviewPreview(), INITIAL_APPLICATIONS (+7 more)

### Community 1 - "Community 1"
Cohesion: 0.14
Nodes (7): LoginPage(), OnboardingPage(), RegisterPage(), metadata, MockAuthForm(), MockAuthFormProps, OnboardingPreviewForm()

### Community 2 - "Community 2"
Cohesion: 0.16
Nodes (13): NotificationsPage(), SAMPLE_ACTIVITY, approximateArea, ProfilePage(), profilePosts, Avatar(), AvatarTone, TONE_CLASSES (+5 more)

### Community 3 - "Community 3"
Cohesion: 0.19
Nodes (9): AppLayout(), regionLabel, WaitlistPage(), CommunityRail(), PreviewNotice(), NAV, Shell(), WaitlistPreviewForm() (+1 more)

### Community 4 - "Community 4"
Cohesion: 0.26
Nodes (5): CreateGuildPage(), CreateHackathonPage(), EventCreatePreviewForm(), GuildCreatePreviewForm(), PageHeading()

### Community 5 - "Community 5"
Cohesion: 0.33
Nodes (4): ConnectionsPage(), EventDetailPage(), ConnectionPreviewButton(), EventApplicationPreviewButton()

### Community 6 - "Community 6"
Cohesion: 0.24
Nodes (6): HomePage(), STARTING_POINTS, IndexPage(), regionLabel, PostComposerPreview(), SAMPLE_POSTS

## Knowledge Gaps
- **1 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `PageHeading()` connect `Community 4` to `Community 0`, `Community 2`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.040) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14285714285714285 - nodes in this community are weakly interconnected._
- **Why does `Avatar()` connect `Community 2` to `Community 0`, `Community 5`, `Community 6`?**
  _High betweenness centrality (0.025) - this node is a cross-community bridge._
- **Why does `EventReviewPreview()` connect `Community 0` to `Community 2`?**
  _High betweenness centrality (0.020) - this node is a cross-community bridge._