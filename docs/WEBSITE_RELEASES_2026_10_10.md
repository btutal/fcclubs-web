# Website release availability — October 10, 2026

The user confirmed iOS approval and authorized the repository release work and
website publication. This update changes availability copy, not app binaries.

## Current release evidence

- A fresh authenticated App Store Connect version read returned HTTP 200 and
  `appVersionState: READY_FOR_DISTRIBUTION` (`appStoreState: READY_FOR_SALE`).
  Version 27.0.1 selects build 321, build ID
  `f0e68435-a851-4656-971c-eeb0aa140cde`, with minimum OS 26.1.
  Version ID: `35bd3f62-31c3-4912-b5b5-57571340ae23`.
- The public Apple lookup for ID 6756238638, country `us`, identifies version
  27.0.1, with `currentVersionReleaseDate: 2026-10-10T15:45:41Z`.
- Android 27.0.2 / 134 was submitted on October 9. A fresh no-cache Google Play
  English/US public listing read on October 10 returned HTTP 200, visible
  "What's New in 27.0.2", and the exact release copy: "Fix missing matches and
  sessions for clubs whose match data has incomplete opponent information."
  The website can therefore describe the hotfix as available, independently of
  the earlier committed `completed` track entry. Its first public rollout date
  is not known, so public copy says "Available as of October 10, 2026".
- Android 27.0.1 / 133 remains a previously released version in the history.
- The Android-only 27.0.2 fix allows valid match batches and derived sessions to
  load when optional opponent details are incomplete. The
  [build 134 record](https://github.com/btutal/fcclubsapp/blob/main/docs/releases/v27.0.2/ANDROID_B134_RELEASE.md)
  identifies its exact source and validation. No other features are advertised.

## Website changes

- Homepage release link and MobileApplication structured data identify iOS 27.0.1
  and Android 27.0.2 as current. Feature and purchase copy stays factual.
- Release notes and social/search descriptions announce iOS 27.0.1 availability,
  publish the prepared Android 27.0.2 article as available, and retain 27.0.1's
  platform-specific history. Version 27.0.0 is now previous on both platforms.
- The status page updates its availability guidance and timestamp while retaining
  the separate FC26 provider transition and saved-history guidance.
- Sitemap dates change only for the edited indexable homepage and release notes.
  `llms.txt` remains accurate and points to current release notes instead of
  duplicating version numbers. Canonical URLs and robots rules are preserved.
- Current documentation points to this record. Older approval snapshots are
  explicitly historical rather than silently rewritten.

## Validation and publication

All eleven existing tests, the production build, and `git diff --check` pass.
The homepage, release notes and status page have one H1 and one main landmark,
with no horizontal overflow or broken visible images at 320, 390 and 1440px.
Desktop and mobile previews use the existing cached headless Chromium runtime;
they do not establish physical-device browser acceptance. Current release
headings and platform availability agree with the verified store evidence.
The publication handoff records the deployed revision, GitHub Pages run and
cache-disabled live readback. Store-installed acceptance remains distinct from
website rendering; the owner accepted TestFlight build 321 in the app review.
