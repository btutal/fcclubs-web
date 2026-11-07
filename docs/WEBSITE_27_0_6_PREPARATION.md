# 27.0.6 website preparation

## Current candidates — updated 8 November 2026

Marketing version remains 27.0.6 on both platforms. iOS 358 supersedes 355 as
the selected candidate; Android remains 154.

| Platform | Version / build | Immutable source | Build tag |
| --- | --- | --- | --- |
| iOS / iPadOS | 27.0.6 / 358 | `c073b9ae0abe88692ca6bc2ab4e4d476997bde02` from app `main` | [v27.0.6-b358](https://github.com/btutal/fcclubsapp/tree/v27.0.6-b358) |
| Android | 27.0.6 / 154 | `400f86097b6082658738079512bb116a3d4233cc` | [v27.0.6-android-b154](https://github.com/btutal/fcclubsapp/tree/v27.0.6-android-b154) |

The runtime app, store-note and shared build-script source is unchanged between
those commits. Both candidates retain their platform-specific r3 notes. Store
review and public-availability gates remain pending in this website record;
current provider states belong to the app release record. The owner controls
store submission and promotion. This record establishes neither store approval
nor public availability nor a Pages deployment.

The 358 archive/export review is separate from the actual TestFlight 355 device
acceptance. Source equivalence does not turn the earlier screenshots or
production telemetry receipt into direct installed-358 evidence. Final owner
device checks and the exact 358 archive/provider checkpoint remain separate
release gates; this website preparation does not assert their completion.

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

All 11 existing site tests pass. `npm run build` passes, including its required
prebuild test hook. `git diff --check` is clean.

Those tests and responsive checks describe the unchanged customer-facing
website source prepared on 7 November. The 8 November candidate-record update
only changes this document and the README; its Markdown links and
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
