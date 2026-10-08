---
name: Sigtake
description: Alert management and monitoring for small ops teams, shown as one strip per incident on a clean white SaaS site.
colors:
  page: "#ffffff"
  panel: "#f5f7f9"
  well: "#f3f6f8"
  line: "#e3e8ed"
  line-soft: "#edf1f4"
  line-strong: "#d5dde5"
  ink: "#0a0d12"
  ink-2: "#2b3a4d"
  muted: "#56677d"
  faint: "#5b6a7e"
  teal: "#2dd4bf"
  teal-hover: "#22c7b2"
  teal-deep: "#0b7d70"
  teal-ink: "#062a26"
  teal-night: "#04221f"
  stage: "#e2f6f4"
  stage-line: "#b6e4de"
  wire: "#8fd9cf"
  app: "#0f1115"
  app-2: "#151a22"
  app-row: "#10141b"
  app-ink: "#f4f6f8"
  app-text: "#b9c4d0"
  app-muted: "#6b7280"
  routed: "#44d4bf"
  critical: "#f67171"
  warning: "#fbbf24"
  resolved: "#42d399"
  resolved-tab: "#4b5563"
typography:
  display:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(44px, 5.75vw, 92px)"
    fontWeight: 700
    lineHeight: 0.985
    letterSpacing: "-0.04em"
  display-heavy:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(42px, 5.5vw, 85px)"
    fontWeight: 800
    lineHeight: 0.95
    letterSpacing: "-0.045em"
  page-title:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(38px, 4.4vw, 64px)"
    fontWeight: 700
    lineHeight: 1
    letterSpacing: "-0.04em"
  reading-title:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(34px, 4.2vw, 52px)"
    fontWeight: 700
    lineHeight: 1.04
    letterSpacing: "-0.035em"
  headline:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(30px, 2.65vw, 44px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
  reading-headline:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(25px, 2.6vw, 32px)"
    fontWeight: 700
    lineHeight: 1.15
    letterSpacing: "-0.025em"
  title:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "20px"
    fontWeight: 700
    lineHeight: 1.2
    letterSpacing: "-0.01em"
  lede:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "clamp(16px, 1.15vw, 18px)"
    fontWeight: 400
    lineHeight: 1.6
  reading-body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "17px"
    fontWeight: 400
    lineHeight: 1.72
  body:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "16px"
    fontWeight: 400
    lineHeight: 1.55
  label:
    fontFamily: "Inter, system-ui, sans-serif"
    fontSize: "11px"
    fontWeight: 600
    lineHeight: 1
    letterSpacing: "0.06em"
  mono:
    fontFamily: "JetBrains Mono, ui-monospace, monospace"
    fontSize: "13.5px"
    fontWeight: 400
    lineHeight: 1.45
    fontFeature: "tnum"
rounded:
  strip: "4px"
  chip: "6px"
  sm: "8px"
  md: "12px"
  card: "14px"
  lg: "16px"
  card-lg: "18px"
  xl: "20px"
  panel: "24px"
  pill: "999px"
spacing:
  s1: "4px"
  s2: "8px"
  s3: "12px"
  s4: "16px"
  s5: "24px"
  s6: "32px"
  s7: "48px"
  s8: "64px"
  page-inset: "14px"
  gutter: "clamp(16px, 3.26vw, 50px)"
  grid-gap: "28px"
  section-top: "112px"
  section-top-mobile: "80px"
  panel-bottom: "72px"
  measure: "68ch"
  legal-measure: "760px"
components:
  button-primary:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.pill}"
    typography: "{typography.body}"
    height: "52px"
    padding: "0 26px"
  button-primary-hover:
    backgroundColor: "{colors.teal-hover}"
  button-dark:
    backgroundColor: "{colors.teal-night}"
    textColor: "{colors.page}"
    rounded: "{rounded.pill}"
    height: "52px"
    padding: "0 24px"
  link-arrow:
    textColor: "{colors.ink-2}"
  link-inline:
    textColor: "{colors.teal-deep}"
  panel:
    backgroundColor: "{colors.panel}"
    rounded: "{rounded.panel}"
  stage:
    backgroundColor: "{colors.stage}"
    rounded: "{rounded.panel}"
  band:
    backgroundColor: "{colors.teal}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.panel}"
  card:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.card}"
    padding: "16px 18px"
  app-window:
    backgroundColor: "{colors.app}"
    textColor: "{colors.app-ink}"
    rounded: "{rounded.card}"
  strip:
    backgroundColor: "{colors.app-row}"
    textColor: "{colors.app-text}"
    typography: "{typography.mono}"
    rounded: "{rounded.strip}"
  team-header:
    backgroundColor: "{colors.app-2}"
    textColor: "{colors.app-ink}"
    rounded: "{rounded.chip}"
  severity-chip:
    typography: "{typography.mono}"
    rounded: "{rounded.chip}"
    height: "22px"
    padding: "0 8px"
  tag:
    backgroundColor: "#e8edf2"
    textColor: "#4b5b6e"
    typography: "{typography.label}"
    rounded: "{rounded.pill}"
    height: "22px"
    padding: "0 9px"
  tab-active:
    textColor: "{colors.ink}"
  nav:
    backgroundColor: "rgba(255, 255, 255, 0.92)"
    textColor: "{colors.ink-2}"
    height: "clamp(64px, 5.469vw, 84px)"
  nav-link-current:
    textColor: "{colors.ink}"
  footer:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink-2}"
    rounded: "{rounded.panel}"
    padding: "56px clamp(20px, 4vw, 56px) 28px"
  page-head:
    textColor: "{colors.ink}"
    typography: "{typography.page-title}"
    width: "1180px"
  reading-prose:
    textColor: "{colors.ink-2}"
    typography: "{typography.reading-body}"
    width: "{spacing.measure}"
  toc-link-active:
    textColor: "{colors.ink}"
  code-window:
    backgroundColor: "{colors.app}"
    textColor: "#d6dde5"
    typography: "{typography.mono}"
    rounded: "{rounded.md}"
    padding: "48px 24px 24px"
  figure-window:
    backgroundColor: "{colors.app}"
    textColor: "{colors.app-text}"
    rounded: "{rounded.card-lg}"
    padding: "24px"
  table-head:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.ink}"
    padding: "12px 16px"
  callout:
    backgroundColor: "{colors.stage}"
    textColor: "#1f3b39"
    rounded: "{rounded.md}"
    padding: "16px 24px"
  callout-warn:
    backgroundColor: "#fdf5e1"
    textColor: "#4a3b12"
    rounded: "{rounded.md}"
    padding: "16px 24px"
  reading-tag:
    backgroundColor: "{colors.panel}"
    textColor: "{colors.muted}"
    rounded: "{rounded.pill}"
    padding: "4px 9px"
  guide-card:
    backgroundColor: "{colors.page}"
    rounded: "{rounded.card-lg}"
    padding: "24px"
  cta-stage:
    backgroundColor: "{colors.stage}"
    rounded: "{rounded.panel}"
    padding: "32px"
  help-row:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    rounded: "{rounded.md}"
    padding: "20px 24px 20px 34px"
  status-pill:
    backgroundColor: "{colors.stage}"
    textColor: "{colors.teal-ink}"
    rounded: "{rounded.pill}"
    padding: "7px 14px"
  bill-window:
    backgroundColor: "{colors.app}"
    textColor: "{colors.app-ink}"
    rounded: "{rounded.card}"
  bill-row:
    backgroundColor: "{colors.app-row}"
    textColor: "{colors.app-text}"
    typography: "{typography.mono}"
    rounded: "{rounded.strip}"
  promise:
    textColor: "{colors.ink}"
    typography: "{typography.title}"
  faq-item:
    textColor: "{colors.ink}"
    padding: "20px 40px 20px 0"
  legal:
    textColor: "{colors.ink-2}"
    width: "{spacing.legal-measure}"
  strip-404:
    backgroundColor: "{colors.app}"
    textColor: "{colors.app-text}"
    typography: "{typography.mono}"
    height: "52px"
  og-card:
    backgroundColor: "{colors.page}"
    textColor: "{colors.ink}"
    width: "1200px"
    height: "630px"
---

# Design System: Sigtake

## Overview

**Creative North Star: "The Strip Board"**

Every alert is one strip. Repeats do not stack up as new lines; they raise a counter on the strip that already exists, and the strip lands under its team with its channel. The whole site (home, pricing, Academy, help, legal, 404 and the OG cards) is a clean, professional SaaS page wrapped around that idea: a white ground, soft grey rounded panels inset from the viewport edge, pill buttons, generous air, and near-black grotesque headlines with tight tracking. The product itself appears as dark windows set on the light page, drawn in the app's real tokens, so what a visitor sees on the page is what they will see after signing up.

The strip is the site's one reusable device and it travels: on the home it is the alert board, on pricing every line of the bill is a $0.00 strip, on help every topic is a white strip with a teal end tab, on the 404 the missing path is a dark GET strip, and on every OG card the stage holds a window of strips. Reading pages (Academy guides, Terms, Privacy) drop the stage and become a quiet measured column; their only dark surfaces are the code blocks and diagrams, which are product windows too.

Brand teal is the signature and is used in parts, never everywhere: the primary pill, the soft-teal stage, the full-teal setup band, active nav and tab underlines, the contents marker, end tabs, and the logo. Severity colour lives only inside the product windows and means exactly one thing each. The world refuses the dark-canvas, glowing dev-tool page, stock-photo proof, and decorative metal or hardware texture. Proof is real product mechanics.

Density is relaxed on the page and dense inside the windows: sections breathe (112px tops, 24px-radius panels) while strips are compact monospaced rows, because that contrast is the product story.

**Key Characteristics:**
- White page, inset grey panels (24px radius, 14px from the viewport edge), grey footer panel.
- Teal in parts: pill, stage, band, current-page underline, contents marker, end tabs, logo.
- Dark product windows in the app's own tokens: strip board, bill, code, diagrams, 404 strip, OG window.
- The strip as the site-wide device: colour end tab, mono columns separated by pipes, value at the right.
- Figtree 700 headlines with negative tracking (800 on pricing and OG cards); Inter for UI and body; JetBrains Mono for data and code.
- Reading pages on a 68ch measure (760px for legal) with a sticky contents column from 1024px.
- One authored motion moment per page at most (home hero board, pricing bill rows); everything else is quiet hover feedback.

## Colors

A white, cool-grey page with one brand teal used in parts, and a separate dark product palette whose severity colours never leave the product windows.

### Primary
- **Sigtake Teal** (teal): the logo colour and the only brand accent. Fills the primary pill, the setup band, the pipeline core, source dots, end tabs on light help rows, the current-page nav underline, the contents marker and tab underlines. Always a fill or a stroke, never text on white.
- **Pressed Teal** (teal-hover): the primary pill's hover fill.
- **Deep Teal** (teal-deep): the legible teal for text and marks on light grounds: focus outline, inline links in prose (underlined at 35% of the colour, solid on hover), help-row actions and icons, check marks, the current-page link in the collapsed mobile nav.
- **Teal Ink** (teal-ink): text on teal fills and on the stage (pill label, callout titles, status pill).
- **Teal Night** (teal-night): headings and step numerals on the teal band, and the dark pill that sits on teal.
- **Soft Teal Stage** (stage): the rounded ground that says "this is the product": hero scene, feature screenshots, 404 strip, OG card visual, plus the Academy callouts and closing CTA box.
- **Stage Line / Wire** (stage-line, wire): hairlines and source wires on the stage and in the pipeline diagram; stage-line is also the hover outline on guide cards.

### Neutral
- **Paper White** (page): page ground, cards, help rows, the OG card ground.
- **Panel Grey** (panel): inset section panels, the footer, the pricing bill's stage, table heads, the mobile contents box, reading tags.
- **Well** (well): inline code chips in prose.
- **Hairline** (line): borders, tab rule, inset card outlines, legal meta rule, byline rule.
- **Soft Hairline** (line-soft): row separators inside tables.
- **Strong Hairline** (line-strong): FAQ row rules and section rules drawn on grey panels.
- **Ink** (ink): headlines and strong text.
- **Slate Ink** (ink-2): nav links, reading body, legal body, secondary links.
- **Muted Slate** (muted): ledes and body paragraphs on light grounds.
- **Faint Slate** (faint): notes, timestamps, breadcrumbs, list markers, inactive tabs, footer column labels.

### Product (dark windows only)
- **App Night** (app): ground for every product window: strip board, bill, screenshots, SDK code card, Academy code and figures, 404 strip, OG window.
- **App Header** (app-2) and **App Row** (app-row): team header bands and strip grounds; outlines are an inset 1px rgba(255,255,255,.07).
- **App Ink / App Text / App Muted** (app-ink, app-text, app-muted): window title, strip text, secondary text. Code blocks run slightly brighter (#d6dde5) for long reading.
- **Routed Teal** (routed): the app's teal: routed strip tabs, both end tabs of a bill row, the language label on code blocks, the active code tab underline on dark.
- **Critical Red** (critical): firing/critical only: the strip tab, the ×N count on a critical strip, the CRITICAL chip.
- **Acknowledged Amber** (warning): acknowledged strip tab; also the Slack message rule in the notification card.
- **Resolved Green** (resolved): RESOLVED chip, 201 response chip, the close-section strip tab.
- **Resolved Grey** (resolved-tab): the end tab of a resolved strip and of the 404 GET strip (nothing is firing; the link is simply gone).

The Academy warning callout uses its own pale editorial caution (wash #fdf5e1, text #4a3b12, title #8a5a00), deliberately distinct from Acknowledged Amber so it never reads as an alert state.

### Named Rules
**The Teal In Parts Rule.** Teal appears as discrete filled parts (pill, stage, band, end tab, underline, marker), never as a wash over the whole page and never as text on white; when teal must be read as text on light, use Deep Teal.

**The Severity Stays Inside Rule.** Critical red, amber and green belong to the product windows and to the strips that mirror them. Red means firing/critical and nothing else; it is never used for page decoration, marketing emphasis or editorial warnings.

**The Two Palettes Rule.** The light page and the dark app never mix tokens: page surfaces use page/panel/stage, product surfaces use the app-* family.

## Typography

**Display Font:** Figtree (with Inter, system-ui)
**Body Font:** Inter (with system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A compact geometric-humanist grotesque set heavy and tight for headlines, over a neutral UI sans; the mono carries everything that is data, so the page reads like a product rather than a brochure. All three are self-hosted variable woff2 files in `public/fonts/`, declared once in the shared stylesheet and again (block display) in the OG template.

### Hierarchy
- **Display** (700, clamp(44px, 5.75vw, 92px), 0.985, -0.04em): the home hero headline only.
- **Display Heavy** (800, clamp(42px, 5.5vw, 85px), 0.95, -0.045em): the pricing hero headline; pricing's promise and closing headings use the same 800 weight at clamp(34px, 3.9–4vw, 60px), and OG card headlines are 800 at 62–66px.
- **Page Title** (700, clamp(38px, 4.4vw, 64px), 1, -0.04em, balanced): the shared page header (help, Academy index).
- **Reading Title** (700, clamp(34px, 4.2vw, 52px), 1.04, -0.035em): Academy guide titles; legal titles run clamp(36px, 4.2vw, 52px). The 404 headline is 700 at clamp(36px, 4.6vw, 64px).
- **Headline** (700, clamp(30px, 2.65vw, 44px), 1.08, -0.03em, balanced): section headings. Closing headings scale up to clamp(34px, 4vw, 60px).
- **Reading Headline** (700, clamp(25px, 2.6vw, 32px), 1.15, -0.025em): Academy h2; h3 is clamp(19px, 1.8vw, 22px) at -0.01em; legal h2 is clamp(20px, 1.7vw, 23px) at -0.015em.
- **Title** (700, 18–22px, 1.2–1.3, -0.01em, Figtree): card titles, help topics (18px), promises (21px), pricing columns (19px), Academy section labels (22px).
- **Lede** (400, clamp(16px, 1.15vw, 18px), 1.6, max 60–62ch): section intros in Muted Slate; Academy ledes run 19px.
- **Reading Body** (400, 17px, 1.72): Academy prose in Slate Ink; legal body runs 16.5px at the same leading.
- **Body** (400, 16px, 1.55): default; list copy runs 15–15.5px.
- **Label** (600, 11px, 0.06em, uppercase): small status tags on figure captions; footer column labels use 13px at 0.04em uppercase.
- **Mono** (400, 11.5–14px, tabular figures): strip and bill columns, code (13.5px/1.7), severity chips (600, 11px, 0.04em), counters (700), step numerals.

### Named Rules
**The Data Is Mono Rule.** Anything a system emitted (source, title in a strip, prices on the bill, timestamps, counts, code, HTTP status, request paths) is set in JetBrains Mono with tabular figures; human prose never is.

**The Tight Headline Rule.** Figtree headlines always carry negative tracking (-0.01em on small titles up to -0.045em on the heaviest) and weight 700, or 800 on pricing and OG cards; body Inter stays at normal tracking.

**The Measure Rule.** Long-form reading never runs wider than 68ch (guides) or 760px (legal), at 1.72 leading.

## Layout

A full-bleed white page with section panels inset 14px from the viewport edge (8px below 1000px), each a 24px-radius Panel Grey block; the footer is the same panel, inset on three sides. Horizontal padding uses one fluid gutter (clamp(16px, 3.26vw, 50px)). Sections open with 112px of top space (80px under 760px) and panels close with 72px (48px mobile). Centred section heads cap at 860px; content grids cap at 1080–1320px; ledes at 60–62ch.

**Landing pages** (home, pricing) open on an asymmetric two-column hero: copy left, a stage right (home 624fr / 804fr, pricing 600fr / 812fr). The stage is a container-query scene scaled by a single unit (100cqw over its design width) so the composition holds its proportions at every desktop width; below 760px it reflows into a static stacked list (columns drop, details hide).

**Utility pages** (help, Academy index) open on the shared page header: breadcrumbs, page title and lede, max 1180px, left-aligned or centred.

**Reading pages** (Academy guides) sit in a 1180px wrapper. From 1024px the article is a two-column grid: a 210px sticky contents column (112px from the top) and a 68ch body, 64px apart; below that the contents collapse into a grey 12px box under the byline. Spacing inside the reading column follows a 4px-based scale (s1–s8: 4 to 64px). Code blocks go full-bleed and square under 640px; tables scroll horizontally with a 560px minimum. Legal pages are a single 760px column with a meta line ruled off under the title.

Repeated grids: three-column statement sets (timeline, promises, pricing columns) at 28–40px gaps; 5fr/7fr copy-visual splits; two-column FAQ grid; auto-fill guide cards (min 280px). Breakpoints: 1240px (nav tightens), 1100px (nav collapses to toggle), 1024px (contents column), 1000px (heroes stack, panel inset 8px), 960px (feature/band/pipeline stack), 760px (mobile), 640px (reading mobile), 420px.

**OG cards** are a fixed 1200 by 630 canvas: logo top left, headline and sub vertically centred in the left column, a 24px soft-teal stage on the right (560px, 520px for route, 440px for plain) holding one dark window.

## Elevation & Depth

Mostly flat and tonal: depth on the page comes from Panel Grey and Soft Teal grounds against white, and from 1px inset hairlines. Real shadows are reserved for dark product windows (a soft, long ambient drop that makes them sit on the stage) and the teal pill (a small tinted lift). White cards carry an inset hairline at rest and gain a soft drop only on hover.

### Shadow Vocabulary
- **Window drop** (`box-shadow: 0 2px 6px rgba(9, 30, 36, .12), 0 30px 60px -28px rgba(9, 40, 44, .45)`): app windows and screenshots on a stage. Reading-page code and figures use a lighter cut (`0 2px 6px rgba(9, 30, 36, .08), 0 24px 48px -30px rgba(9, 40, 44, .45)`).
- **Pill lift** (`box-shadow: 0 1px 2px rgba(6, 42, 38, .12), 0 4px 14px -6px rgba(6, 42, 38, .3)`): primary pill at rest; deepens on hover with a 1px rise.
- **Contact** (`box-shadow: 0 1px 2px rgba(15, 50, 60, .06)`): white chips and cards on the stage.
- **Card hover** (`box-shadow: inset 0 0 0 1px #b6e4de, 0 18px 36px -24px rgba(15, 50, 60, .35)`): guide cards and help rows on hover (help uses #9fdcd3 and a 14px 30px -22px drop), with a 2px rise on guide cards.
- **Price card** (`box-shadow: 0 1px 2px rgba(15, 30, 50, .05), 0 20px 40px -28px rgba(15, 30, 50, .25), inset 0 0 0 1px var(--line)`): the single lifted card on the home's grey panel.
- **Inset hairline** (`box-shadow: inset 0 0 0 1px var(--line)`): outlined cards, help rows, tables, the pricing Business row, instead of borders.

### Named Rules
**The Only Windows Float Rule.** Long ambient shadows belong to dark product windows; page cards stay flat with an inset hairline and only lift on hover. A window may also sit flat (the pricing bill on its grey stage). Nothing glows at rest; the hero's single fading ring pulse is motion, not elevation.

## Shapes

Soft, generous rounding on page structures and tight rounding inside the product: panels, stages, band, footer and the Academy CTA box at 24px; cards 14–20px (guide cards and figures 18px); code blocks, tables, callouts, help rows and screenshots 12px; inside windows, team headers 6px and strips 4px. Every action, source chip, status pill and tag is a full pill (999px). Strips are clipped rectangles whose end edge is a solid 6–8px colour tab rounded only on the outer corners; a bill row carries a tab at both ends. Step numerals sit on 34px ink discs. Diagrams use 1.5px teal hairlines with rounded elbows and dashed connectors. Icons are 24px line icons (2px stroke, round caps and joins) from one sprite, sized to 1em of their text.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** Sigtake Teal fill with Teal Ink label, Inter 600, slight negative tracking; 52px tall in content, 46px in the Academy CTA, 48px in the nav, 52–64px in heroes.
- **Hover / Focus:** fill shifts to Pressed Teal, rises 1px with a deeper tinted shadow (180ms, ease-out curve); focus is a 2px Deep Teal outline at 3px offset.
- **Dark pill:** Teal Night fill with white label, used only on the teal band where a teal pill would vanish.
- **Arrow link:** Slate Ink text with a trailing arrow icon that nudges 3px right on hover; the secondary action beside every primary pill.
- **Inline link:** Deep Teal, underlined at 35% opacity with a 3px offset, the underline going solid on hover; used in all prose, legal, FAQ footnotes and help.

### Chips and Tags
- **Source chips:** white pills on the stage with a teal dot and Inter 600 uppercase source names.
- **Channel chips:** white 10–12px-radius tiles naming Slack, Email or Teams.
- **Severity chips:** 6px-radius mono capitals on a 14% tint of their severity colour (CRITICAL, RESOLVED).
- **Tags:** small grey uppercase pills on figure captions; a teal-tinted variant appears only on dark.
- **Reading tags:** Panel Grey pills in Muted Slate, Inter 500 12px, sentence case; topic tags on guide cards.
- **Status pill:** a Soft Teal pill with a teal dot and Teal Ink 600 text (the help reply-time promise).

### Cards / Containers
- **Stage cards:** Paper White, 14px, contact shadow.
- **Guide cards:** Paper White, 18px, inset hairline, 24px padding; Figtree title, Muted Slate summary, reading tags pinned to the bottom; the whole card is the link.
- **Panels:** Panel Grey, 24px, inset 14px.

### Navigation
Sticky, 92% white with a saturated 10px blur, gaining a hairline when scrolled. Logo lockup left, centred Inter 450 links in Slate Ink (darken to Ink on hover), Log in plus the teal pill right. The current page's link is Ink 600 with a 2px teal underline (2px radius) just below the text. Below 1100px links collapse into a toggle-opened white sheet with hairline-separated rows (Escape closes it and returns focus); there the current link drops the underline and turns Deep Teal. The collapsed state is set before first paint.

### Footer
A Panel Grey 24px panel inset from the viewport: brand column with logo and one line, three link columns under 13px uppercase Faint Slate labels, and a hairline base row with copyright and social links. Two columns on mobile.

### Page Header
Breadcrumbs in Faint Slate (13.5px, light slash separators), a Page Title headline and a lede capped at 62ch. Left-aligned by default, centred on help.

### Tabs
Text tabs in Inter 600 over a hairline rule; inactive in Faint Slate, active in Ink with a 2px teal underline. On dark (code card) the underline switches to Routed Teal.

### Strip Board (signature)
The product's alert list rendered as a board of strips inside a dark App Night window. Each strip is a compact App Row bar with a solid colour end tab on the left: Routed Teal for routed, Critical Red for firing/critical, Amber for acknowledged, Resolved Grey once resolved. Columns are monospaced and separated by thin pipes (source | title | status). Repeats fold into one taller strip carrying a red ×N count and tally marks in groups of five. Strips sit under team header bands. Clicking a strip advances it (firing to acknowledged to resolved); resolving dims it to 55%.

**Motion (home hero only):** strips slide in from 28px left (460ms, cubic-bezier(.16, 1, .3, 1), 140ms stagger); the duplicates fold into the merged strip (520ms, 110ms stagger) while the count climbs ×1 to ×25 (1.7s) and the tally draws (1.5s); the Slack chip gives one teal ring pulse. With reduced motion the board renders directly in its final state.

### The Bill (pricing)
A flat App Night window (14px, no drop) on a Panel Grey 24px stage: an Inter 700 title with a regular-weight qualifier, then five strip rows, each with a Routed Teal tab at both ends, mono item | detail columns and a white $0.00 price at the right, then a light top rule and a total line (Inter 700 label, Figtree 800 46px figure). Under it, a white hairline-outlined row holds the Business plan: a teal-tinted icon disc, two lines of text, and a Deep Teal underlined arrow link. Rows slide in from 24px left (500ms, 120ms stagger) and the total rises after, only when motion is allowed. Below 760px the detail column and pipes drop.

### Promise Set
Three statements in a row (one column on mobile), each under a 2px Ink top rule: Figtree 700 21px title and a Muted Slate line. Used for pricing's "when paid plans arrive".

### FAQ
A two-column grid of native disclosure rows on a grey panel, separated by Strong Hairline rules: Inter 600 16.5px question, a drawn chevron at the right that rotates on open (200ms), Muted Slate answer. A centred footnote with inline links follows.

### Reading Page (Academy)
Breadcrumbs, Reading Title, a 19px lede, a byline row ruled off below, then prose at Reading Body. The contents column lists sections in Muted Slate with a 2px transparent left border; the current section turns Ink 600 with a teal left marker.
- **Code blocks:** App Night windows (12px, reading window drop) with a Routed Teal mono language label in the top-left corner, 13.5px/1.7 mono text.
- **Figures:** one inline SVG diagram per guide inside an 18px App Night window, drawn for the dark ground, with an App Text caption; a narrow variant replaces the wide one under 640px.
- **Tables:** light, inside a 12px inset-hairline frame; Panel Grey header row in Inter 600, Soft Hairline row rules.
- **Callouts:** Soft Teal 12px boxes with a Teal Ink bold title; the warning variant uses the pale caution wash.
- **Steps:** numbered with mono teal numerals on 34px Ink discs.
- **Inline code:** Well chips, 6px radius, 0.86em mono.
- **Closing CTA:** a Soft Teal 24px box with a Figtree 22px heading, a line and a pill plus text link.

### Legal (Terms, Privacy)
A single 760px column: Reading Title-scale heading, a Faint Slate meta line ruled off beneath, Figtree h2 sections, 16.5px/1.72 Slate Ink body, Faint Slate list markers, Ink 600 emphasis and Deep Teal inline links. No section panels, stages or windows; only the shared nav and footer frame it. Known content issue outside the design system: Terms section 2 lists SMS among the channels and omits Slack; that is a copy fix, not a visual rule.

### Help Topic Rows
A stack of white 12px rows (10px apart, max 920px) on a grey panel, each a light-ground strip: a 7px Sigtake Teal end tab on the left, a 22px Deep Teal line icon, a Figtree 700 18px topic over one Muted Slate line, and a Deep Teal 600 action with an arrow at the right that nudges on hover. Inset hairline at rest, teal-tinted outline and a soft drop on hover. Under 760px the action drops beneath the text.

### 404 Strip
On a centred Soft Teal stage (max 640px), one dark 52px strip in App Night with the window drop: a Resolved Grey 7px end tab, mono `GET | /missing-path`, and a muted mono status chip at the right ("404 Not Found"); the path ellipsizes. Headline, lede, pill plus arrow link and a row of popular links follow.

### OG Cards
1200 by 630, white. The real logo top left, a Figtree 800 headline (62–66px, -0.045em, max two or three lines) with a 21px Muted Slate sub, and a soft-teal stage holding one App Night window. Four layouts drawn with the same strip rows (6px end tab, mono, pipes): **rows** (alert board with team headers, a ×25 merged strip and channel chips), **stat** (the bill with $0.00 rows and a total), **route** (team_code to channel), **plain** (four strips, the default for Academy and legal cards).

### Teal Band
A full-teal 24px panel for the setup story: Teal Night heading, numbered steps on Teal Night discs with teal numerals, a dark SDK code card with Routed Teal tab underline and a green 201 result.

## Do's and Don'ts

### Do:
- **Do** link every page to the shared stylesheet and script (`/public/css/site.css`, `/public/js/site.js`) and keep page-specific CSS for page-specific parts only.
- **Do** change a token in both `public/css/site.css` and the home's inline copy in `index.html` until the home moves onto the shared stylesheet; the OG template carries a third copy of the colours.
- **Do** set every page on white with Panel Grey (#f5f7f9) panels at 24px radius, inset 14px from the viewport edge.
- **Do** use Sigtake Teal (#2dd4bf) only as fills and strokes in parts: pill, stage, band, end tab, underline, contents marker.
- **Do** use Deep Teal (#0b7d70) whenever teal must be read as text or a mark on a light ground, including inline links.
- **Do** show the product as dark windows (#0f1115) in app tokens, normally on a Soft Teal stage (#e2f6f4) with the window drop shadow.
- **Do** reach for the strip (end tab, mono columns, pipes, value at the right) when a page needs a list of system things; on a light ground the strip is white with a teal tab.
- **Do** mark the current page with aria-current and let the nav draw the teal underline.
- **Do** keep reading pages to 68ch (760px for legal) at 1.72 leading, with code and diagrams in dark windows.
- **Do** set system data in JetBrains Mono with tabular figures.
- **Do** pair every primary pill with an arrow link as the secondary action.
- **Do** give any authored motion a reduced-motion final state rendered without animation.
- **Do** carry the Google Tag Manager blocks (GTM-N5834SWZ) on every page.

### Don't:
- **Don't** put teal text on white, or wash a whole page or section background in teal outside the band.
- **Don't** use Critical Red (#f67171) for anything but firing/critical alerts, or Acknowledged Amber (#fbbf24) for editorial warnings.
- **Don't** mix app tokens into light page surfaces, or page greys into product windows.
- **Don't** build dark-canvas glowing dev-tool sections, stock photography, people photos, or metal and hardware textures.
- **Don't** add long ambient shadows to page cards; only product windows float.
- **Don't** add a second motion set piece to a page; hover feedback stays at 150–200ms.
- **Don't** put stages, section panels or product windows in the body of a legal page.
- **Don't** alter the logo lockup or substitute another accent hue for the brand teal.
