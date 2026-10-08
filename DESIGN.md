---
name: Sigtake
description: Alert management and monitoring for small ops teams, shown as one strip per incident on a clean white SaaS page.
colors:
  page: "#ffffff"
  panel: "#f5f7f9"
  line: "#e3e8ed"
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
  headline:
    fontFamily: "Figtree, Inter, system-ui, sans-serif"
    fontSize: "clamp(30px, 2.65vw, 44px)"
    fontWeight: 700
    lineHeight: 1.08
    letterSpacing: "-0.03em"
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
  xl: "20px"
  panel: "24px"
  pill: "999px"
spacing:
  page-inset: "14px"
  gutter: "clamp(16px, 3.26vw, 50px)"
  grid-gap: "28px"
  section-top: "112px"
  section-top-mobile: "80px"
  panel-bottom: "72px"
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
---

# Design System: Sigtake

## Overview

**Creative North Star: "The Strip Board"**

Every alert is one strip. Repeats do not stack up as new lines; they raise a counter on the strip that already exists, and the strip lands under its team with its channel. The marketing site is a clean, professional SaaS page wrapped around that idea: a white ground, soft grey rounded panels inset from the viewport edge, pill buttons, generous air, and near-black grotesque headlines with tight tracking. The product itself appears as dark windows set on the light page, drawn in the app's real tokens, so what a visitor sees on the page is what they will see after signing up.

Brand teal is the signature and is used in parts, never everywhere: the primary pill, the soft-teal stage that holds the product scene, the full-teal "Live in five minutes" band, the pipeline core, active tab underlines, and the logo. Severity colour lives only inside the product windows and means exactly one thing each. The world refuses the dark-canvas, glowing dev-tool page, stock-photo proof, and decorative metal or hardware texture. Proof is real product mechanics: real app screenshots and example strips that show the product at work.

Density is relaxed on the page and dense inside the windows. Sections breathe (112px tops, 24px-radius panels), while strips are compact monospaced rows, because that contrast is the product story: a calm page around a calm, deduplicated alert list.

**Key Characteristics:**
- White page, inset grey panels (24px radius, 14px from the viewport edge).
- Teal in parts: pill, stage, band, active tab, pipeline core, logo.
- Dark product windows in the app's own tokens, floating on light stages.
- Strip board as the signature: colour end tab, mono columns, ×N count, tally marks, team header bands.
- Figtree 700 headlines with negative tracking; Inter for UI and body; JetBrains Mono for data and code.
- One authored motion moment in the hero; everything else is quiet hover feedback.

## Colors

A white, cool-grey page with one brand teal used in parts, and a separate dark product palette whose severity colours never leave the product windows.

### Primary
- **Sigtake Teal** (teal): the logo colour and the only brand accent. Fills the primary pill, the "Live in five minutes" band, the pipeline core, source dots, the collapse arrow and active tab underlines. Always a fill or a stroke, never text on white.
- **Pressed Teal** (teal-hover): the primary pill's hover fill.
- **Deep Teal** (teal-deep): the legible teal for text and marks on light grounds: focus outline, plan label, check marks, teal-accented words.
- **Teal Ink** (teal-ink): text on teal fills (pill label, band body copy family).
- **Teal Night** (teal-night): headings and step numerals on the teal band, and the dark pill that sits on teal.
- **Soft Teal Stage** (stage): the rounded ground that holds the hero scene and the feature screenshots; the light page's way of saying "this is the product".
- **Stage Line / Wire** (stage-line, wire): hairlines and source wires drawn on the stage and in the pipeline diagram (dashed links use #9edfd6, fan connectors #8fd3c9).

### Neutral
- **Paper White** (page): page ground, cards, pipeline team chips.
- **Panel Grey** (panel): inset section panels and the footer.
- **Hairline** (line): borders, tab rule, inset card outlines; section rules on panels use #d5dde5.
- **Ink** (ink): headlines and strong text.
- **Slate Ink** (ink-2): nav links, secondary body, links.
- **Muted Slate** (muted): ledes and body paragraphs on light grounds.
- **Faint Slate** (faint): notes, timestamps, inactive tabs, footer column labels.

### Product (dark windows only)
- **App Night** (app): window ground for the strip board, screenshots and the SDK code card.
- **App Header** (app-2) and **App Row** (app-row): team header bands and strip grounds; outlines are an inset 1px rgba(255,255,255,.07).
- **App Ink / App Text / App Muted** (app-ink, app-text, app-muted): window title, strip text, secondary text.
- **Routed Teal** (routed): the app's teal, for routed strip tabs and the active code tab underline on dark.
- **Critical Red** (critical): firing/critical only: the strip tab, the ×N count on a critical strip, the CRITICAL chip.
- **Acknowledged Amber** (warning): acknowledged strip tab; also the Slack message rule in the notification card.
- **Resolved Green** (resolved): RESOLVED chip, 201 response chip, the close-section strip tab.
- **Resolved Grey** (resolved-tab): the strip-board end tab after a strip is resolved.

### Named Rules
**The Teal In Parts Rule.** Teal appears as discrete filled parts (pill, stage, band, core, tab underline), never as a wash over the whole page and never as text on white; when teal must be read as text on light, use Deep Teal.

**The Severity Stays Inside Rule.** Critical red, amber and green belong to the product windows and to the strips that mirror them. Red means firing/critical and nothing else; it is never used for page decoration or marketing emphasis.

**The Two Palettes Rule.** The light page and the dark app never mix tokens: page surfaces use page/panel/stage, product surfaces use the app-* family.

## Typography

**Display Font:** Figtree (with Inter, system-ui)
**Body Font:** Inter (with system-ui)
**Label/Mono Font:** JetBrains Mono (with ui-monospace)

**Character:** A compact geometric-humanist grotesque set heavy and tight for headlines, over a neutral UI sans; the mono carries everything that is data, so the page reads like a product rather than a brochure. All three are self-hosted variable woff2 files in `public/fonts/`.

### Hierarchy
- **Display** (700, clamp(44px, 5.75vw, 92px), 0.985, -0.04em): the hero headline only, three lines on desktop.
- **Headline** (700, clamp(30px, 2.65vw, 44px), 1.08, -0.03em, balanced wrap): section headings. The closing heading scales up to clamp(34px, 4vw, 60px) at -0.035em.
- **Title** (700, 20–22px, 1.2, -0.01em, Figtree): monitoring captions, FAQ heading, pipeline core label (19px).
- **Lede** (400, clamp(16px, 1.15vw, 18px), 1.6, max 60ch): section intros in Muted Slate. The hero sub runs larger (clamp(17px, 1.4vw, 21.5px)).
- **Body** (400, 16px, 1.55): default; list copy runs 15–15.5px. Card titles inside lists use Inter 600.
- **Label** (600, 11px, 0.06em, uppercase): small status tags on figure captions; footer column labels use 13px at 0.04em uppercase.
- **Mono** (400, 11.5–13.5px, tabular figures): strip columns, feed lines, code, severity chips (600, 11px, 0.04em), counters (700).

### Named Rules
**The Data Is Mono Rule.** Anything a system emitted (source, title in a strip, timestamps, counts, code, HTTP status) is set in JetBrains Mono with tabular figures; human prose never is.

**The Tight Headline Rule.** Figtree headlines always carry negative tracking (-0.03em to -0.04em) and weight 700; body Inter stays at normal tracking.

## Layout

A full-bleed white page with section panels inset 14px from the viewport edge (8px below 1000px), each panel a 24px-radius Panel Grey block. Horizontal padding uses one fluid gutter (clamp(16px, 3.26vw, 50px)). Sections open with 112px of top space (80px under 760px) and panels close with 72px (48px mobile). Centred section heads cap at 860px; content grids cap at 1080–1320px; ledes at 60–62ch.

The hero is an asymmetric two-column grid (624fr / 804fr): copy left, the soft-teal stage right, bleeding toward the edge. The stage is a container-query scene scaled by a single unit (100cqw / 804) so the composition holds its proportions at every desktop width; below 760px it reflows into a static stacked list (sources wrap, wires hide, columns drop).

Repeated grids: three-column rules (timeline, promises) at 28px gaps, 5fr/7fr copy-visual splits (features, band), two-column screenshot grid (monitoring). Breakpoints: 1240px (nav tightens), 1100px (nav collapses to toggle), 1000px (hero stacks), 960px (feature/band/pipeline stack), 760px (mobile), 420px.

## Elevation & Depth

Mostly flat and tonal: depth on the page comes from Panel Grey and Soft Teal grounds against white, and from 1px inset hairlines. Real shadows are reserved for two things: dark product windows (a soft, long ambient drop that makes them sit on the stage) and the teal pill (a small tinted lift). White cards on stages carry only a 1–2px contact shadow.

### Shadow Vocabulary
- **Window drop** (`box-shadow: 0 2px 6px rgba(9, 30, 36, .12), 0 30px 60px -28px rgba(9, 40, 44, .45)`): app windows and screenshots on a stage.
- **Pill lift** (`box-shadow: 0 1px 2px rgba(6, 42, 38, .12), 0 4px 14px -6px rgba(6, 42, 38, .3)`): primary pill at rest; deepens on hover with a 1px rise.
- **Contact** (`box-shadow: 0 1px 2px rgba(15, 50, 60, .06)`): white chips and cards on the stage.
- **Price card** (`box-shadow: 0 1px 2px rgba(15, 30, 50, .05), 0 20px 40px -28px rgba(15, 30, 50, .25), inset 0 0 0 1px var(--line)`): the single lifted card on a grey panel.
- **Inset hairline** (`box-shadow: inset 0 0 0 1px var(--line)`): outlined cards and pipeline chips instead of borders.

### Named Rules
**The Only Windows Float Rule.** Long ambient shadows belong to dark product windows; page cards stay flat or take a contact shadow. Nothing glows at rest; the hero's single fading ring pulse is motion, not elevation.

## Shapes

Soft, generous rounding on page structures and tight rounding inside the product: panels, stage and band at 24px; cards 14–20px; screenshots and channel chips 12px; inside windows, team headers 6px and strips 4px. Every action and source chip is a full pill (999px). Strips are clipped rectangles whose left edge is a solid 4–7px colour tab rounded only on the outer corners. Diagrams use 1.5px teal hairlines with rounded elbows and dashed connectors.

## Components

### Buttons
- **Shape:** full pill (999px).
- **Primary:** Sigtake Teal fill with Teal Ink label, Inter 600, slight negative tracking; 52px tall in content, 48px in the nav, 64px in the hero.
- **Hover / Focus:** fill shifts to Pressed Teal, rises 1px with a deeper tinted shadow (180ms, ease-out curve); focus is a 2px Deep Teal outline at 3px offset.
- **Dark pill:** Teal Night fill with white label, used only on the teal band where a teal pill would vanish.
- **Arrow link:** Slate Ink text with a trailing arrow icon that nudges 3px right on hover; the secondary action beside every primary pill.

### Chips
- **Source chips:** white pills on the stage with a teal dot and Inter 600 uppercase source names.
- **Channel chips:** white 12px-radius tiles with Slack, Email or Teams marks from the sprite.
- **Severity chips:** 6px-radius mono capitals on a 14% tint of their severity colour (CRITICAL, RESOLVED).
- **Tags:** small grey uppercase pills on figure captions; a teal-tinted variant appears only on dark.

### Cards / Containers
- **Corner Style:** 14px (stage cards), 16px (feed, code), 18px (limits list), 20px (price card).
- **Background:** Paper White on panels and stages; App Night for product cards.
- **Shadow Strategy:** contact or inset hairline; see Elevation.
- **Internal Padding:** 16–22px; price card 32px.

### Navigation
Sticky, 92% white with a saturated 10px blur, gaining a hairline when scrolled. Logo lockup left, centred Inter 450 links in Slate Ink (darken to Ink on hover), Log in plus the teal pill right. Below 1100px links collapse into a toggle-opened white sheet with hairline-separated rows; the collapsed state is set before first paint.

### Tabs
Text tabs in Inter 600 over a hairline rule; inactive in Faint Slate, active in Ink with a 2px teal underline. On dark (code card) the underline switches to Routed Teal.

### Strip Board (signature)
The product's alert list rendered as a board of strips inside a dark App Night window. Each strip is a compact App Row bar with a solid colour end tab on the left: Routed Teal for routed, Critical Red for firing/critical, Amber for acknowledged, Resolved Grey once resolved. Columns are monospaced and separated by thin pipes (source | title | status). Repeats of the same incident fold into one taller strip that carries a red ×N count and tally marks drawn in groups of five. Strips sit under team header bands (App Header ground, icon, uppercase team name, chevron). Clicking a strip advances it (firing to acknowledged to resolved), resolving dims it to 55%.

**Motion (hero only):** strips slide in from 28px left (460ms, cubic-bezier(.16, 1, .3, 1), 140ms stagger); the five duplicates fold down into the merged strip (520ms, 110ms stagger) while the count climbs ×1 to ×25 (1.7s) and the tally draws left to right (1.5s); later team rows enter; the Slack chip gives one teal ring pulse. With reduced motion the board renders directly in its final state.

### Teal Band
A full-teal 24px panel for the setup story: Teal Night heading, numbered steps on Teal Night discs with teal numerals, a dark SDK code card with Routed Teal tab underline and a green 201 result.

## Do's and Don'ts

### Do:
- **Do** set every new page on white with Panel Grey (#f5f7f9) panels at 24px radius, inset 14px from the viewport edge.
- **Do** use Sigtake Teal (#2dd4bf) only as fills and strokes in parts: primary pill, stage, band, active tab, pipeline core.
- **Do** use Deep Teal (#0b7d70) whenever teal must be read as text or a mark on a light ground.
- **Do** show the product as dark windows (#0f1115) in app tokens on a Soft Teal stage (#e2f6f4), with the window drop shadow.
- **Do** set system data in JetBrains Mono with tabular figures.
- **Do** pair every primary pill with an arrow link as the secondary action.
- **Do** give any authored motion a reduced-motion final state rendered without animation.
- **Do** carry the Google Tag Manager blocks (GTM-N5834SWZ) on every page.

### Don't:
- **Don't** put teal text on white, or wash a whole page or section background in teal outside the band.
- **Don't** use Critical Red (#f67171) for anything but firing/critical alerts.
- **Don't** mix app tokens into light page surfaces, or page greys into product windows.
- **Don't** build dark-canvas glowing dev-tool sections, stock photography, people photos, or metal and hardware textures.
- **Don't** add long ambient shadows to page cards; only product windows float.
- **Don't** add a second motion set piece to a page; hover feedback stays at 150–180ms.
- **Don't** alter the logo lockup or substitute another accent hue for the brand teal.
