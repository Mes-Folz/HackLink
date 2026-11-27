# Graph Report - HackLink  (2026-11-27)

## Corpus Check
- 110 files · ~176,006 words
- Verdict: corpus is large enough that graph structure adds value.
- Unclassified: 43 file(s) not represented in the graph (top: .csv 37, (none) 2, .example 1)
- WARNING: 43 of 162 files seen (27%) have no supported extractor and are missing from this graph entirely. It may look complete while representing only part of the codebase.

## Summary
- 909 nodes · 2219 edges · 56 communities (28 shown, 28 thin omitted)
- Extraction: 98% EXTRACTED · 2% INFERRED · 0% AMBIGUOUS · INFERRED: 47 edges (avg confidence: 0.87)
- Token cost: 0 input · 0 output

## Graph Freshness
- Built from commit: `640e7e5f`
- Run `git rev-parse HEAD` and compare to check if the graph is stale.
- Run `graphify update .` after code changes (no API cost).

## Community Hubs (Navigation)
- getPrisma
- validate_data.py
- DesignSystemGenerator
- search_stack
- generate_design_system
- core.py
- design_system.py
- package.json
- preview.py
- BM25
- test_design_system_mode.py
- TestThresholdGate
- compilerOptions
- test_design_system_preview.py
- CatalogRefreshTest
- detect_domain
- search
- test_data_contracts.py
- auth-options.ts
- _get_bm25
- dependencies
- _TagCollector
- .generate
- _search_csv_detailed
- _normalize
- parse_decision_rules
- app/page.tsx
- TestNativeDesktopStackFreshness
- TestStyleTaxonomy
- scripts
- test_core.py
- TestFormErrorHandling
- RtlFilterTest
- test_skill_script_paths.py
- ArabicSynonymsAndRtlPreviewTest
- _row_identities
- CatalogSummaryLineEndingsTest
- TokenCliTest
- TestMapGuidance
- TestMetricMath
- TestTextLayoutDataContracts
- TestStackFlagWithDesignSystem
- RtlCliTest
- _flatten_tokens
- dotenv
- TestImeGuidance
- tailwindcss
- app/layout.tsx
- _suggest_terms
- ._find_reasoning_rule
- TestFixtureValidation
- TestDiagnosticsContracts
- TestTextLayoutRetrieval

## God Nodes (most connected - your core abstractions)
1. `search()` - 64 edges
2. `getPrisma()` - 60 edges
3. `requireUserId()` - 49 edges
4. `DesignSystemGenerator` - 46 edges
5. `search_stack()` - 36 edges
6. `next` - 34 edges
7. `generate_design_system()` - 33 edges
8. `format_preview_html()` - 26 edges
9. `lucide-react` - 24 edges
10. `PageHeading()` - 24 edges

## Surprising Connections (you probably didn't know these)
- `TestBm25CoreBehavior` --uses--> `BM25`  [INFERRED]
  .github/skills/ui-ux-pro-max/scripts/tests/test_core.py → .github/skills/ui-ux-pro-max/scripts/core.py
- `TestReasoningMatch` --uses--> `DesignSystemGenerator`  [INFERRED]
  .github/skills/ui-ux-pro-max/scripts/tests/test_core.py → .github/skills/ui-ux-pro-max/scripts/design_system.py
- `TestReasoningContract` --uses--> `DesignSystemGenerator`  [INFERRED]
  .github/skills/ui-ux-pro-max/scripts/tests/test_data_contracts.py → .github/skills/ui-ux-pro-max/scripts/design_system.py
- `TestLightResultOutputCoherence` --uses--> `DesignSystemGenerator`  [INFERRED]
  .github/skills/ui-ux-pro-max/scripts/tests/test_design_system_mode.py → .github/skills/ui-ux-pro-max/scripts/design_system.py
- `TestMapProductTypes` --uses--> `DesignSystemGenerator`  [INFERRED]
  .github/skills/ui-ux-pro-max/scripts/tests/test_map_product_types.py → .github/skills/ui-ux-pro-max/scripts/design_system.py

## Import Cycles
- None detected.

## Communities (56 total, 28 thin omitted)

### Community 0 - "getPrisma"
Cohesion: 0.06
Nodes (91): main(), lucide-react, next, react, ConnectionsPage(), ExplorePage(), CreateGuildPage(), GuildsPage() (+83 more)

### Community 1 - "validate_data.py"
Cohesion: 0.06
Nodes (43): read_rows(), TestAccessibilityGuidance, TestChartsTypographyAndIcons, TestCurrentReactGuidance, TestSemanticColors, TestGeneratedCatalogContract, _catalog_date(), _check_app_interface_contract() (+35 more)

### Community 3 - "search_stack"
Cohesion: 0.14
Nodes (6): _exact_stack_identifier(), _project_row(), search_stack(), _valid_max_results(), _rows(), TestWebStackFreshness

### Community 4 - "generate_design_system"
Cohesion: 0.13
Nodes (7): format_tokens_css(), _root_block(), DarkModeTokenTest, GenerateTokensRoundTripTest, _node_available(), _parse_css_vars(), TokenExportTest

### Community 6 - "design_system.py"
Cohesion: 0.10
Nodes (10): build_design_tokens(), _css_font_family(), _detect_page_type(), format_page_override_md(), format_tokens_dtcg(), _generate_intelligent_overrides(), persist_design_system(), resolve_preview_locale() (+2 more)

### Community 7 - "package.json"
Cohesion: 0.12
Nodes (22): devDependencies, autoprefixer@10.4.20, postcss@8.5.33, tsx@^4.23.15, @types/node@20.19.0, @types/react@19.2.2, @types/react-dom@19.2.2, typescript@5.6.3 (+14 more)

### Community 8 - "preview.py"
Cohesion: 0.10
Nodes (17): _button_outline_text_color(), _contrast_ratio(), _derive_dark_palette(), format_master_md(), safe_slug(), _attr(), _css_color(), _css_font() (+9 more)

### Community 9 - "BM25"
Cohesion: 0.18
Nodes (3): BM25, _suggest_identities(), TestTokenizer

### Community 10 - "test_design_system_mode.py"
Cohesion: 0.05
Nodes (20): ansi_ljust(), _filter_anti_patterns_for_mode(), format_ascii_box(), add_wrapped(), wrap_text(), format_markdown(), hex_to_ansi(), _mode_support_labels() (+12 more)

### Community 12 - "compilerOptions"
Cohesion: 0.11
Nodes (18): compilerOptions, allowJs, esModuleInterop, incremental, isolatedModules, jsx, lib, module (+10 more)

### Community 13 - "test_design_system_preview.py"
Cohesion: 0.10
Nodes (8): generate_design_system(), TestPersistence, _run_search(), TestPreviewCli, TestPreviewDarkMode, TestPreviewEscaping, TestPreviewNoScriptInjectionInCss, PersistTokenTest

### Community 16 - "search"
Cohesion: 0.15
Nodes (5): _normalize_rtl_level(), _rtl_row_filter(), search(), _style_search_destination(), TestSearchDomains

### Community 17 - "test_data_contracts.py"
Cohesion: 0.16
Nodes (5): read_rows(), split_values(), style_identities(), TestLandingAndStackContract, TestStyleIdentityContract

### Community 18 - "auth-options.ts"
Cohesion: 0.11
Nodes (21): bcryptjs@3.0.3, bcryptjs, next-auth, handler, LoginPage(), RegisterPage(), regionLabel, WaitlistPage() (+13 more)

### Community 19 - "_get_bm25"
Cohesion: 0.19
Nodes (7): _domain_keywords(), _file_signature(), _get_bm25(), _load_csv(), _load_csv_snapshot(), _load_product_keywords(), _load_rows_or_empty()

### Community 20 - "dependencies"
Cohesion: 0.11
Nodes (17): dependencies, lucide-react@0.468.0, @neon/config@^1.14.8, @neon/env@^2.1.11, next@16.4.6, next-auth@4.24.15, @prisma/adapter-neon@7.10.1, @prisma/client@7.10.1 (+9 more)

### Community 21 - "_TagCollector"
Cohesion: 0.17
Nodes (3): _parse(), _TagCollector, TestPreviewStructure

### Community 23 - "_search_csv_detailed"
Cohesion: 0.20
Nodes (5): _contains_phrase(), _rewrite_query_for_domain(), _search_csv(), _search_csv_detailed(), TestBm25CoreBehavior

### Community 24 - "_normalize"
Cohesion: 0.20
Nodes (5): _exact_match_diagnostic(), _legacy_successor_guidance(), _normalize(), _stack_query_requests_legacy(), _stack_row_filter()

### Community 25 - "parse_decision_rules"
Cohesion: 0.19
Nodes (5): apply_decision_rules(), _object_without_duplicates(), parse_decision_rules(), _validate_action(), _check_reasoning_contract()

### Community 26 - "app/page.tsx"
Cohesion: 0.21
Nodes (10): IndexPage(), regionLabel, AvatarTone, SAMPLE_EVENTS, SAMPLE_GUILDS, SAMPLE_MEMBERS, SAMPLE_POSTS, SampleEvent (+2 more)

### Community 29 - "scripts"
Cohesion: 0.18
Nodes (11): scripts, build, db:deploy, db:migrate, db:seed, dev, lint, prebuild (+3 more)

### Community 32 - "RtlFilterTest"
Cohesion: 0.17
Nodes (3): read_rows(), RtlDataContractTest, RtlFilterTest

### Community 33 - "test_skill_script_paths.py"
Cohesion: 0.38
Nodes (3): resolve(), shipped_invocations(), SkillScriptPathsTest

### Community 35 - "_row_identities"
Cohesion: 0.33
Nodes (3): _exact_row_identity(), _row_identities(), _style_identity()

### Community 44 - "dotenv"
Cohesion: 0.40
Nodes (4): dotenv@16.6.1, prisma@7.10.1, dotenv, prisma

### Community 46 - "tailwindcss"
Cohesion: 0.50
Nodes (3): tailwindcss@3.4.15, tailwindcss, config

### Community 48 - "_suggest_terms"
Cohesion: 0.50
Nodes (3): _passes_threshold(), _query_coverage(), _suggest_terms()

## Knowledge Gaps
- **28 thin communities (<3 nodes) omitted from report** — run `graphify query` to explore isolated nodes.

## Suggested Questions
_Questions this graph is uniquely positioned to answer:_

- **Why does `search()` connect `search` to `validate_data.py`, `search_stack`, `core.py`, `design_system.py`, `BM25`, `detect_domain`, `_get_bm25`, `.generate`, `_search_csv_detailed`, `_normalize`, `TestStyleTaxonomy`, `test_core.py`, `TestFormErrorHandling`, `RtlFilterTest`, `ArabicSynonymsAndRtlPreviewTest`, `_row_identities`, `TestMapGuidance`, `TestImeGuidance`, `_suggest_terms`, `._find_reasoning_rule`, `._multi_domain_search`, `TestDiagnosticsContracts`, `TestTextLayoutRetrieval`?**
  _High betweenness centrality (0.071) - this node is a cross-community bridge._
- **Are the 6 inferred relationships involving `DesignSystemGenerator` (e.g. with `TestReasoningMatch` and `TestReasoningContract`) actually correct?**
  _`DesignSystemGenerator` has 6 INFERRED edges - model-reasoned connections that need verification._
- **Should `getPrisma` be split into smaller, more focused modules?**
  _Cohesion score 0.058857808857808856 - nodes in this community are weakly interconnected._
- **Why does `DesignSystemGenerator` connect `DesignSystemGenerator` to `ArabicSynonymsAndRtlPreviewTest`, `core.py`, `design_system.py`, `test_design_system_mode.py`, `test_design_system_preview.py`, `._find_reasoning_rule`, `._multi_domain_search`, `test_data_contracts.py`, `.generate`, `test_core.py`?**
  _High betweenness centrality (0.052) - this node is a cross-community bridge._
- **Should `validate_data.py` be split into smaller, more focused modules?**
  _Cohesion score 0.06116700201207243 - nodes in this community are weakly interconnected._
- **Why does `generate_design_system()` connect `test_design_system_preview.py` to `DesignSystemGenerator`, `generate_design_system`, `design_system.py`, `preview.py`, `test_design_system_mode.py`, `_TagCollector`, `.generate`, `test_core.py`?**
  _High betweenness centrality (0.030) - this node is a cross-community bridge._
- **Should `search_stack` be split into smaller, more focused modules?**
  _Cohesion score 0.13852813852813853 - nodes in this community are weakly interconnected._