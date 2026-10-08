# Product

<!-- impeccable:product-schema 1 -->

## Platform

web

## Users

Small ops and dev teams (roughly 2–20 engineers) who want one place for their alerts without PagerDuty/Opsgenie-level weight or cost. Many arrive with alert noise flooding Slack or email, or are leaving Opsgenie before it shuts down on April 5, 2027.

## Product Purpose

Sigtake ingests alerts from every system, collapses duplicates into one row, and routes what matters to the right team by email, Slack, Microsoft Teams or in-app. Success for a visitor: they sign up during early access and send a first alert through the SDK or API.

## Positioning

Alerts and monitoring in one pipeline. Ingested alerts, website/uptime and SSL-expiry checks, and signal rules (threshold, anomaly detection that learns normal by hour and weekday, heartbeat) all feed the same deduplication, routing and notification path. A team does not stitch an uptime tool onto an alert router.

## Operating Context

- Integration: official Node (`@sigtake/sdk`) and Python (`sigtake`) SDKs exposing `alerts.ingest({title, severity, source, team_code, payload})` and `signals.send(source, {metric: value})`; the API key resolves tenant and project.
- Routing: the API key decides the project, `team_code` decides the team, that team's channels in the project decide where it lands.
- Deduplication: fingerprint `source|title|severity` per project; notifications at occurrences 1, 10, 25, 50, 100, then every 100.
- Slack: one workspace per organization, one channel per project; repeats reply in the first card's thread and update it in place.
- App at `app.sigtake.com`, docs at `docs.sigtake.com`, Academy guides on this site.

## Capabilities and Constraints

- Live channels: email, Slack, Microsoft Teams, in-app (always on). Discord and Google Chat are in progress, not live.
- No on-call schedules, escalations, or phone/SMS paging. Pages must not imply them.
- Pricing: free during early access — unlimited users, teams, alerts and monitors, no credit card; paid plans later, not yet defined.
- Site is plain HTML on GitHub Pages: no build step, no shared layout, every page owns its `<head>`, and every page carries Google Tag Manager `GTM-N5834SWZ` (see CLAUDE.md).
- Self-hosted fonts in `public/fonts/`; OG cards rendered by `tools/og/`.

## Brand Commitments

- Name: Sigtake. Logo `public/logo.svg`, favicon set in `public/` — the logo and name lockup stay untouched in any redesign.
- Brand teal `#2DD4BF` (the logo's colour) is the Sigtake signature and must stay present in any visual world, used in parts rather than everywhere.
- Voice: plain, factual, engineer-to-engineer; states limits honestly (the Academy says when Sigtake is the wrong replacement).
- Support in English and Spanish; replies within 2 business days via help@sigtake.com.

## Evidence on Hand

- Real product facts and Academy guides (`academy/`), OG images (`og/`), one product image (`public/img/features-oncall-*.webp`).
- No testimonials, customer logos, case studies, usage numbers or benchmarks exist. Do not fabricate any.

## Product Principles

1. Truth over reach: every claim must match what the product does today.
2. One pipeline: alerts and monitoring are shown as a single flow, not a feature list.
3. Less noise is the outcome the visitor buys.
4. Lightweight by design: present the deliberate limits (no rotas, escalation trees or pager apps) as the advantage they are, never as a warning to leave, and never imply capabilities Sigtake does not have.
