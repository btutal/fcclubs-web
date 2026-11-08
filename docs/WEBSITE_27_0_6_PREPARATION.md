# 27.0.6 website preparation

## Latest provider checkpoint — 8 November 2026, 09:45 CET

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
- Website publication remains unperformed and separately gated. Customer pages
  still use the local Upcoming preview and public website version 27.0.5. This
  documentation-only checkpoint does not push a branch, dispatch Pages or
  establish a website deployment.

These timestamped provider observations supersede the earlier pending-store
wording in this preparation. The app's
[current release record](../../fcclubsapp/docs/releases/v27.0.6/RELEASE_358_154_2026_11_08.md)
owns the detailed store, artifact and submission evidence.

## Current candidates — updated 8 November 2026

Marketing version remains 27.0.6 on both platforms. iOS 358 supersedes 355 as
the selected candidate; Android remains 154.

| Platform | Version / build | Immutable source | Build tag |
| --- | --- | --- | --- |
| iOS / iPadOS | 27.0.6 / 358 | `c073b9ae0abe88692ca6bc2ab4e4d476997bde02` from app `main` | [v27.0.6-b358](https://github.com/btutal/fcclubsapp/tree/v27.0.6-b358) |
| Android | 27.0.6 / 154 | `400f86097b6082658738079512bb116a3d4233cc` | [v27.0.6-android-b154](https://github.com/btutal/fcclubsapp/tree/v27.0.6-android-b154) |

The runtime app, store-note and shared build-script source is unchanged between
those commits. Both candidates retain their platform-specific r3 notes. The
checkpoint above records Android publication and pending Apple review;
website publication remains a separate gate. Later documentation commits do
not change these binary identities or authorize another store operation.

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

## Copy and publication boundary

The release page adds an upcoming 27.0.6 section covering FC27 Session Detail
filters, selective scoring-average precision, missing Pro Stats provider data,
Studio 149 in Settings and Credits, and iOS-only saved-data recovery guidance.
It follows both apps' final r3 notes and preserves their platform differences.
There is no subscription or session-assessment availability claim.

The homepage and product-facts file link to the preview. The preview explicitly
says not yet released and has no release date. The homepage's current release,
structured `softwareVersion`, status page and public product-facts release stay
at 27.0.5. Historical release text is preserved.

This separate website task reuses the clean website checkout, starting from
fresh `origin/main` at `97ab96289a6714b773d7fc47c69f044d997c83b1`, on local
`codex/27.0.6-release-notes`. No branch is pushed, no PR is opened, and no Pages
workflow is dispatched. Website `main` publishes automatically when pushed.

## Validation

At the 7 November customer-page checkpoint, all 11 existing site tests and
`npm run build` passed, including the required prebuild test hook.

Those tests and responsive checks describe the unchanged customer-facing
website source prepared on 7 November. The 8 November candidate/status updates
only change this document and the README; their Markdown links and
`git diff --check` are verified without rerunning app or website builds.

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

## Later publication checklist

- Confirm actual platform availability and the owner's announcement scope.
- Replace the upcoming marker with the confirmed availability and date; retain
  platform-specific wording if the stores go live at different times.
- Update current release links, structured version, status availability,
  product facts and relevant sitemap dates together. Demote 27.0.5 to history.
- Run the site tests/build and inspect desktop/mobile again.
- Push/publish only within the owner's authorization, then verify the exact
  Pages revision and cache-disabled live content.
