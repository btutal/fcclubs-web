# 27.0.6 website preparation

Prepared locally on 7 November 2026 for iOS 27.0.6 (355) and Android 27.0.6
(154), both built from app source `400f86097b6082658738079512bb116a3d4233cc`.
The owner will perform final device checks and store submission/promotion.
This record does not establish store approval, public availability or a Pages
deployment.

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
