# Discovery copy review — 6 October 2026

Status: **website publication approved on 6 October 2026; historical store proposal, subsequently approved and submitted on October 8**. After reviewing the local preparation, the user authorized publishing the website changes and asked to see the planned store changes. This approval covers the website commit, push and deployment; store publication remains pending separate approval.

## Website changes

- Homepage title, description and social metadata lead with FC27 Pro Clubs tracking. The hero explains saved match stats, squad comparisons and session recaps, with game compatibility, mobile requirements and the free starting slot beside the download links.
- Pro Stats page metadata consistently names FC27. Purchase copy explains one-slot or all-three coverage, separate Extra Slot purchases and available-data limits for advanced match/session metrics.
- Seven visible questions answer compatibility, setup, free/paid features, Pro Stats, retained FC26 history, refresh frequency and device changes. Native HTML details keep the answers readable in page source and available through keyboard navigation.
- Feature copy describes automatic time-based session grouping and forecasts based on available stats. Widgets cover both platforms; Live Activity is identified as an iPhone feature.
- The homepage has a main landmark. Testimonial headings can wrap at intermediate widths, feature cards fit narrow phones and the Pro Stats table gives its explanation column room on mobile. Existing design tokens, review quotations, app screenshots and download destinations are preserved.
- Sitemap dates change only for the two edited marketing pages. No special chatbot file, crawler rule, ratings markup, analytics event or legal/status/release copy is added.

The related local [store copy review](../../fcclubsapp/docs/STORE_DISCOVERY_COPY_REVIEW.md) contains the proposed en-US fields, character counts and screenshot messaging candidates. Store metadata and that review remain uncommitted in the sibling checkout. Screenshots themselves require a separate proposal using current FC27 UI.

## Product evidence

Copy was checked against the current iOS and Android source, including edition catalogs, deployment targets, slot entitlements, session grouping, forecast engines, widgets and backup implementations. The current [FC27 decisions](../../fcclubsapp/docs/releases/v27.0.0/IOS_DECISIONS_ANDROID_REFERENCE.md) and [Android Drive contract](../../fcclubsapp/docs/platform/android/DRIVE_SYNC.md) document the main boundaries.

One slot and the standard tracking features are free. Extra Slots and Pro Stats are separate one-time purchases. Advanced metrics depend on provider coverage and apply to match/session views. FC26 is retained history rather than live tracking. Apple iCloud and Android Google Drive preserve their own platform's available history; cross-platform transfer is not promised. Refreshing regularly saves matches while they remain available from the provider.

## Validation

- All ten existing tests passed through the final `npm run build` prebuild hook, and the production build succeeded.
- The production preview was inspected on desktop and mobile. The homepage has no horizontal overflow at 320, 390, 868 and 1440px. Pro Stats was inspected at 320, 390 and 1440px, including its table and device mockup; no horizontal overflow was found.
- FAQ expansion works by click and Enter, with a visible keyboard focus outline. Changed-page images load, one main landmark and one H1 are present, and download links retain their store destinations.
- All eight store metadata fields fit their character limits. Local documentation links and both repository whitespace checks passed. An independent source/copy review found no outstanding blocking issues after its corrections were applied.

The existing release-availability test is scoped to the hero for obsolete pause messaging, allowing the FAQ to explain retained FC26 history while still rejecting an obsolete service notice anywhere on the homepage. No new app tests or app build were needed for metadata-only edits.

Preview evidence is temporarily saved in `/private/tmp/fcclubs-discovery-preview-2026-10-06/`, including `home-hero.jpg`, `home-desktop.jpg`, `home-mobile.jpg`, `pro-stats-desktop.jpg`, `pro-stats-mobile.jpg` and `pro-stats-narrow.jpg`. These are local draft previews, not published readbacks. The loopback preview is available at `http://127.0.0.1:4173/` while its server is running. Browser inspection used the Codex in-app Chromium browser, not Safari or physical devices.

## Publication and measurement

The website diff has publication approval. Publish through the main-branch GitHub Pages workflow, then record the deployed commit, workflow result and cache-disabled live readback in the publication handoff. Store publication has its own authenticated-field and locale checks, detailed in the store review.

After an approved publication, verify live metadata, content, links and mobile rendering. Recheck organic queries and store conversion over comparable post-release windows. The discovery audit already found Google AI visibility and ChatGPT referrals, but clearer copy cannot guarantee inclusion or recommendations from ChatGPT, Claude or Grok. Named store-click measurement, localization and store experiments remain separate proposals.

## Subsequent publication

The user approved the store metadata and premium assets and submitted them on
October 8. At that time Google’s production release and listing were published;
Apple’s 27.0.1 / 321 was Waiting for Review. The [October 8 website update](WEBSITE_27_0_1.md)
supersedes the old asset and availability details above.
