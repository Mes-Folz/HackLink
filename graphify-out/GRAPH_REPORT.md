# Graph Report - HackLink  (2026-11-25)

## Corpus Check
- cluster-only mode — file stats not available

## Summary
- 126 nodes · 321 edges · 14 communities (10 shown, 4 thin omitted)
- Extraction: 100% EXTRACTED · 0% INFERRED · 0% AMBIGUOUS
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `dfcc9357`
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
- Community 8
- Community 9
- Community 10
- Community 11
- Community 12
- Community 13

## God Nodes (most connected - your core abstractions)
1. `Avatar()` - 12 edges
2. `PageHeading()` - 11 edges
3. `SAMPLE_EVENTS` - 8 edges
4. `Shell()` - 7 edges
5. `EventCard()` - 7 edges
6. `ALLOWED_REGIONS` - 7 edges
7. `SAMPLE_GUILDS` - 7 edges
8. `PostCard()` - 6 edges
9. `MockAuthForm()` - 6 edges
10. `GuildCard()` - 6 edges

## Surprising Connections (you probably didn't know these)
- `IndexPage()` --calls--> `Avatar()`  [EXTRACTED]
  app/page.tsx → components/Avatar.tsx
- `GuildDetailPage()` --calls--> `EventCard()`  [EXTRACTED]
  app/(app)/guilds/[slug]/page.tsx → components/EventCard.tsx
- `HomePage()` --calls--> `FeedPreview()`  [EXTRACTED]
  app/(app)/home/page.tsx → components/FeedPreview.tsx
- `ProfilePage()` --calls--> `PostCard()`  [EXTRACTED]
  app/(app)/profile/page.tsx → components/PostCard.tsx
- `LoginPage()` --calls--> `MockAuthForm()`  [EXTRACTED]
  app/(auth)/login/page.tsx → components/MockAuthForm.tsx

## Import Cycles
- None detected.

## Communities (14 total, 4 thin omitted)

### Community 0 - "Community 0"
Cohesion: 0.15
Nodes (12): GuildDetailPage(), HomePage(), FeedFilter, FeedPreview(), FeedSort, FILTERS, GuildMembershipPreviewButton(), LikeButton() (+4 more)

### Community 1 - "Community 1"
Cohesion: 0.15
Nodes (7): LoginPage(), OnboardingPage(), RegisterPage(), metadata, MockAuthForm(), MockAuthFormProps, OnboardingPreviewForm()

### Community 2 - "Community 2"
Cohesion: 0.21
Nodes (11): AppLayout(), IndexPage(), regionLabel, CommunityRail(), PreviewNotice(), NAV, NavigationLinks(), ProfileAvatar() (+3 more)

### Community 3 - "Community 3"
Cohesion: 0.28
Nodes (5): ManageEventPage(), Application, EventReviewPreview(), INITIAL_APPLICATIONS, INITIAL_PENDING_IDS

### Community 4 - "Community 4"
Cohesion: 0.36
Nodes (5): approximateArea, ProfilePage(), profilePosts, EmptyState(), PreviewSignOutButton()

### Community 5 - "Community 5"
Cohesion: 0.43
Nodes (5): ExplorePage(), NotificationsPage(), SAMPLE_ACTIVITY, Avatar(), PageHeading()

### Community 6 - "Community 6"
Cohesion: 0.52
Nodes (4): HackathonsPage(), EventCard(), SAMPLE_EVENTS, SampleEvent

### Community 7 - "Community 7"
Cohesion: 0.60
Nodes (3): ConnectionsPage(), ConnectionPreviewButton(), SAMPLE_MEMBERS

### Community 9 - "Community 9"
Cohesion: 0.47
Nodes (3): regionLabel, WaitlistPage(), WaitlistPreviewForm()

### Community 11 - "Community 11"
Cohesion: 0.60
Nodes (3): GuildsPage(), GuildCard(), SampleGuild

## Knowledge Gaps
- **4 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `Avatar()` connect `Community 5` to `Community 0`, `Community 2`, `Community 3`, `Community 4`, `Community 7`, `Community 11`, `Community 13`?**
  _High betweenness centrality (0.036) - this node is a cross-community bridge._
- **Should `Community 1` be split into smaller, more focused modules?**
  _Cohesion score 0.14736842105263157 - nodes in this community are weakly interconnected._
- **Why does `PageHeading()` connect `Community 5` to `Community 3`, `Community 4`, `Community 6`, `Community 7`, `Community 8`, `Community 10`, `Community 11`, `Community 12`?**
  _High betweenness centrality (0.029) - this node is a cross-community bridge._
- **Why does `EventReviewPreview()` connect `Community 3` to `Community 5`?**
  _High betweenness centrality (0.019) - this node is a cross-community bridge._