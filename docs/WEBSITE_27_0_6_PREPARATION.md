# 27.0.6 website announcement and preparation

## Owner-authorized announcement — 8 November 2026

The owner authorized the generic **27.0.6 is live** announcement and website
publication, confirmed Google Play is live, and is managing Apple publication.
No store verification is requested or performed in this publication task.
This authorization supersedes the earlier local-only website boundary; it does
not turn the historical Apple snapshot below into a new approval observation.

Customer copy now identifies 27.0.6 as the latest release, announced November 8,
with iOS 358 and Android 154 retaining their separate immutable identities.
The app's [announcement record](https://github.com/btutal/fcclubsapp/blob/main/docs/releases/v27.0.6/PUBLIC_ANNOUNCEMENT_2026_11_08.md)
owns the cross-repository publication scope. Pages successfully published the
announcement source; the receipt below keeps deployment and live readback
separate from platform store evidence.

## Publication receipt — 8 November 2026

[GitHub Pages run 42472799735](https://github.com/btutal/fcclubs-web/actions/runs/42472799735)
successfully published source
`dc851d69c44df069394355404fc15474bb288cd0` after website branch integration.
Website local and remote `main` and `develop` matched this source at the
deployment checkpoint. Its customer pages had passed all 11 tests, the
production build and nine local responsive views, as recorded below.

Cache-disabled production browser checks pass all nine views: home, release
notes and status at 320px, 390px and 1440px. CDP HTTP-cache disabling, no-cache
headers and a source-specific query identify the fresh readback. All release
dates, the 27.0.6 current release and homepage JSON-LD are correct. There are
no overflowing elements, broken images, console errors/warnings or failed
requests; 25 observed requests succeed. Visual review passes. The ignored app
artifact packet's `browser/live-responsive-report.json`, nine `live-*.png`
screenshots and request logs retain the evidence. No store query is performed.

All 18 cache-disabled live paths match the validated production build byte for
byte, including root/home, all production HTML, JavaScript/CSS, SVG, `llms.txt`
and sitemap. The ignored app artifact
`artifacts/archives/2706-publication-20261108/live-byte-readback.json` records
the source, successful run, timestamp and each comparison.

This closeout changes only the README and this record. The deployed customer
bytes remain tied to the source above; a documentation commit does not identify
a new app build or a new customer-page deployment. Documentation receipt
commits use `[ci skip]` to avoid another Pages build for prose alone.

## Earlier provider checkpoint — 8 November 2026, 09:45 CET

- Google Play confirms **27.0.6 / 154 is `PUBLISHED`** in Production and
  Internal. The current non-obsolete Production inventory no longer lists 150
  as the published candidate.
- App Store Connect confirms **27.0.6 / 358 is `WAITING_FOR_REVIEW`**, with the
  owner's submitted review intact. The latest publicly released iOS version is
  27.0.5.
- The owner submitted both store releases. The combined
  [GitHub release](https://github.com/btutal/fcclubsapp/releases/tag/v27.0.6-b358)
  is published using iOS tag `v27.0.6-b358` and Android tag
  `v27.0.6-android-b154`, with their separate source commits.
- At this earlier checkpoint website publication was unperformed and separately
  gated. Customer pages still used the local Upcoming preview and public website
  version 27.0.5. That documentation-only update did not push a branch, dispatch
  Pages or establish a website deployment.

These timestamped provider observations supersede the earlier pending-store
wording in this preparation. The app's
[current release record](../../fcclubsapp/docs/releases/v27.0.6/RELEASE_358_154_2026_11_08.md)
owns the detailed store, artifact and submission evidence.

## Release builds — updated 8 November 2026

Marketing version remains 27.0.6 on both platforms. iOS 358 supersedes 355 as
the selected candidate; Android remains 154.

| Platform | Version / build | Immutable source | Build tag |
| --- | --- | --- | --- |
| iOS / iPadOS | 27.0.6 / 358 | `c073b9ae0abe88692ca6bc2ab4e4d476997bde02` from app `main` | [v27.0.6-b358](https://github.com/btutal/fcclubsapp/tree/v27.0.6-b358) |
| Android | 27.0.6 / 154 | `400f86097b6082658738079512bb116a3d4233cc` | [v27.0.6-android-b154](https://github.com/btutal/fcclubsapp/tree/v27.0.6-android-b154) |

The runtime app, store-note and shared build-script source is unchanged between
those commits. Both candidates retain their platform-specific r3 notes. The
earlier checkpoint records Android publication and pending Apple review;
the owner subsequently authorized the website announcement above. Later
documentation commits do not change these binary identities or authorize
another store operation.

The exact 358 archive/export, signing, symbols, production configuration and
packaged notes were verified in the app release record. That review is separate
from actual TestFlight 355 device acceptance. Source and unsigned-executable
equivalence do not turn the earlier screenshots or production telemetry receipt
into direct installed-358 evidence; no exact 358 device pass is claimed here.

### Original preparation — 7 November 2026

The website was originally prepared for iOS 355 / Android 154, both built from
`400f86097b6082658738079512bb116a3d4233cc`. The corresponding actual-store device
checks remain historical evidence for those exact builds. Their existing
storage-failure, widget and accessibility testing limits remain unchanged by
the iOS candidate replacement.

## Current copy and publication scope

The release page presents 27.0.6 as the latest release, dated November 8,
covering FC27 Session Detail filters, selective scoring-average precision,
missing Pro Stats provider data, Studio 149 in Settings and Credits, and
iOS-only saved-data recovery guidance.
It follows both apps' final r3 notes and preserves their platform differences.
There is no subscription or session-assessment availability claim.

The homepage, release-page metadata, current release links, structured
`softwareVersion`, status availability, `llms.txt` product facts and homepage/
release sitemap dates agree on 27.0.6 and November 8. The homepage's duplicate
preview link is removed. The 27.0.5 article and community-icon details remain in
history. The unchanged Pro Stats page retains its own sitemap date.

The FC26 provider transition, affected scope and first-confirmed timestamp are
unchanged. Status Last updated now reflects November 8's release-copy update;
it does not announce provider recovery or a new incident.

This separate website task reuses the clean website checkout, starting from
fresh `origin/main` at `97ab96289a6714b773d7fc47c69f044d997c83b1`, on local
`codex/27.0.6-release-notes`, preserving its three prepared commits through
`627fb09e774ee606e85f5cf37e9b80a18f38d6fa`. Local `main` and `develop` both began
at `97ab96289a6714b773d7fc47c69f044d997c83b1`; `origin/main` matched, and no
remote `develop` existed at this preparation checkpoint. Website `main`
publishes automatically when pushed. Branch integration and publication then
completed at the source and Pages run recorded above.

## Announcement validation — 8 November 2026

`npm test` passes all 11 site tests, including the updated 27.0.6 availability
and release-history contracts. `npm run build` passes, including another
successful 11-test prebuild run. This verifies structured-data parsing,
cross-page current-release consistency, platform-specific release copy,
preserved 27.0.5 history, privacy and production-asset boundaries.

Fresh isolated Playwright checks of the production preview pass all nine views:
home, release notes and status at 320px, 390px and 1440px. Each document fits its
viewport with no horizontal overflow or broken images. The current release,
November 8 date, homepage link and JSON-LD are correct. Console output has zero
errors/warnings; observed local requests return 200/304. Visual review passes.
The app checkout's ignored `artifacts/archives/2706-publication-20261108/browser/`
packet contains `local-responsive-report.json`, nine screenshots and network
logs. No store endpoint is used in this validation.

All 20 local Markdown targets in the three changed documents resolve, and
`git diff --check` passes. The deployed Pages revision, cache-disabled
production browser readback and 18-path live-byte comparison are recorded
above as separate acceptance results.

## Historical preparation validation — 7 November 2026

At the 7 November customer-page checkpoint, all 11 existing site tests and
`npm run build` passed, including the required prebuild test hook.

Those tests and responsive checks describe the preview source prepared on
7 November. The earlier 8 November candidate/status checkpoint only changed
this document and the README, with Markdown links and `git diff --check`
verified separately. The newly authorized announcement changes customer pages
and requires fresh tests, build and responsive checks.

An isolated Playwright session inspected the production preview on desktop
1440px and mobile 390px/320px for the release page, and 1440px/390px for the
homepage. Document widths equal viewport widths in each case; headings, preview
status and platform-specific text remain readable with no horizontal overflow.
The homepage retains its 27.0.5 current-release link beside the clearly labeled
27.0.6 preview. Browser console reports zero errors and warnings. Optional
website analytics were declined only in this isolated local preview.

Private screenshots and CLI snapshots are retained in the app checkout's ignored
`artifacts/archives/2706-public-preparation-20261107/website/` packet. The existing
authenticated store-browser sessions were not used. No push, Pages dispatch or
deployment was performed.

## Completed publication checks

- The owner's announcement scope and distinct platform evidence are preserved;
  no store query is performed in this task.
- All site tests and the production build pass. Release, home and status pass
  local and live 320px, 390px and 1440px browser checks.
- Website `main` and `develop` integrate the prepared commits at the published
  source above. App build tags are unchanged. Markdown links and whitespace
  checks pass.
- The exact Pages revision/run succeeds; all 18 cache-disabled live paths match
  the validated built output, with nine live responsive views accepted.
