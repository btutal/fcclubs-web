# 27.0.3 website publication — October 11, 2026

The owner submitted iOS 323 and Android 137 for review and explicitly requested
that 27.0.3 become latest and available on the website immediately, without
waiting for store approval. App Store Connect confirms version 27.0.3 is
`WAITING_FOR_REVIEW` with valid, App Store-eligible build 323 selected.
Android review submission is owner-reported; its locally built 137 Internal
release was independently verified previously. No store submission or workflow
configuration change is part of this publication.

## Immutable platform identity

- iOS: `v27.0.3-b323` at `3bdae06c0ed3bf977abc8f8b1e9a2687f1a59cfe`.
- Android: `v27.0.3-android-b137` at `70b3b3d98f63e97f45b58d103f4b479d6056bc87`.
- Combined release: [FC Clubs 27.0.3 (iOS 323 / Android 137)](https://github.com/btutal/fcclubsapp/releases/tag/v27.0.3-b323).

Existing source tags are preserved. Superseded build 322 and Android 136 keep
their historical tags. Documentation/publication commits do not identify the
native binaries.

## Published surfaces and verification

Homepage release link and JSON-LD, current release notes and social metadata,
status-page availability, `llms.txt` and marketing sitemap dates identify
27.0.3. Earlier releases remain historical. iOS notes cover resilient match
loading and repaired saved opponent links; Android notes cover optional
diagnostics, brief Dashboard feedback and the telemetry inspector crash fix.
FC26 incident state is unchanged.

Before pushing main, run `npm test`, `npm run build`, `git diff --check` and
inspect desktop/mobile rendering. After pushing, require success of the Pages
run for the exact revision and cache-disabled HTTP readback of homepage,
release notes, status, sitemap and `llms.txt`, including a 390px overflow check.
These checks establish website publication, not store approval or device
acceptance.

Local validation passed: all 11 contract checks, production Vite build and
whitespace checks. Homepage, release notes and status were inspected at
1440px desktop and 390px mobile widths; each viewport matched document width
with no horizontal overflow. Deployment identity and live HTTP readbacks are
retained separately with the publication receipts.
