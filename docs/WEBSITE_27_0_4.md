# 27.0.4 website preparation and readiness — October 13, 2026

The owner requested a review of both platform releases and their notes, plus
27.0.4 release notes and latest-published-version wording on local website
`main`, **without pushing to the remote**. This is prepared announcement copy.
It does not establish live website publication, public store approval or
installed-device acceptance.

## Platform identities and readiness snapshot

| Platform | Identity | Verified readiness | Remaining gates |
| --- | --- | --- | --- |
| Android | 27.0.4 / 138; `v27.0.4-android-b138`; source `b193ba82435ab5789feedf2181c965ad75982a3e` | Signed release AAB, mapping and native ZIP match archived hashes. Release gate passed with 890 unit tests, including 17 issue-26 regressions. The same artifacts and canonical notes were uploaded to Internal and Closed Testing `alpha`. | Exact Play-installed purchase/restore and setup for both paid slots, slot 1 and FC26 retention, refresh and Drive acceptance. Closed-beta availability was subsequently reported ready by the owner; this review did not independently refresh Console acceptance. |
| iOS | 27.0.4 / 324; `v27.0.4-b324`; source `9f94b222349c0fde994e9463bd6f0af5ffd7e477` | Branch push verified; all configurations and local app/widget builds use 27.0.4. Existing 538 unique unit/UI tests and focused setup regressions passed. Codex Tasks archive and Internal TestFlight distribution succeeded; App Store Connect confirms 324 is valid and in internal beta testing. | Exact installed-build purchase/restore, setup/cancellation/retry, cold launch and CloudKit acceptance. External testing and public submission remain separate gates. |

The Android receipt is a dated October 12 snapshot: it independently confirmed
Internal availability and Alpha in review then. A completed Play track entry
alone does not prove current tester availability. Paparazzi comparison was
excluded because external goldens were unavailable; full native symbolication
remains unverified for libraries supplied stripped.

The iOS run is `0c456363-c31b-4812-bf95-e42bc11bafaf`, started automatically on
October 13 at 04:24:50 UTC and completed successfully at 04:34:29 UTC. Its
Archive and TestFlight Internal Testing actions both succeeded. Build
`60c298b8-06f3-480b-8e41-a54a33573783` is `VALID` with internal state
`IN_BETA_TESTING` and external state `READY_FOR_BETA_SUBMISSION`. Remote tag
`v27.0.4-b324` resolves to the exact source above; local build floor 300 does
not identify the uploaded archive.
App Store Connect has a 27.0.4 version in `PREPARE_FOR_SUBMISSION`, with an empty
en-US What's New field at this review. Apply the canonical local iOS copy before
public submission. This task makes no store metadata or submission changes.

The detailed platform records remain in the sibling app repository:
[Android receipt](../../fcclubsapp/docs/releases/v27.0.4/V27_0_4_RELEASE_NOTES_DRAFT.md)
and [iOS beta candidate](../../fcclubsapp/docs/releases/v27.0.4/IOS_BETA_CANDIDATE.md).
Existing source tags and dated publication records are preserved.

## Release-note contract

iOS bundled and generated App Store notes agree:

```text
What’s New in 27.0.4

- Set up empty Extra Slots while keeping your current club selected.
- Retry club setup with clear feedback if saving fails.
- Return to an available saved club when an earlier slot selection is empty.
```

Android bundled and uploaded Play notes agree:

```text
What’s New in 27.0.4

- Fix setup of purchased Extra Slots when adding a club for the first time in FC27.
```

The website keeps these platform scopes separate. The new leading `v2704`
entry uses October 13, 2026; 27.0.3 and all older release notes remain historical.
Homepage release text and JSON-LD, release-page search/social summaries, status
availability, `llms.txt` and edited sitemap dates agree on 27.0.4. Provider
incident state and first-confirmed time remain unchanged.

## Local validation and publication boundary

Run `npm test`, `npm run build`, `git diff --check` and inspect homepage,
release notes and status at desktop/mobile widths before committing. The build's
prebuild hook also runs the contract tests. Check local documentation links.

Local validation passed: all 11 contract tests, the production Vite build,
whitespace checks and 16 local documentation links. Homepage, release notes and
status matched document width at 1440, 390 and 320 pixels, with no horizontal
overflow. A cache-disabled live release-page readback still led with 27.0.3
and contained no 27.0.4 entry.

The original local and remote website `main` were both
`cb1d40f9e682624f505c8db8b01640fe8c305023`. Commit the prepared change only to
local `main` and independently re-read remote `main` to prove it is unchanged.
Do not push or dispatch Pages for this task. A later authorized deployment must
verify the exact Pages revision and cache-disabled live readbacks before
claiming publication.
