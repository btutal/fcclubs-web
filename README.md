# FC Clubs Companion - Marketing Website

## 27.0.6 announcement — 8 November 2026

The owner authorized the **27.0.6 is live** announcement and website publication,
confirmed Google Play is live, and is managing Apple publication. This task does
not query either store or claim a fresh Apple approval check. The earlier
09:45 CET provider snapshot is preserved in the preparation record. The combined
[GitHub release](https://github.com/btutal/fcclubsapp/releases/tag/v27.0.6-b358)
is published with the separate immutable iOS and Android build identities.

The release notes match the selected iOS 358 / Android 154 builds,
both version 27.0.6. iOS 358 was built from `main` source `c073b9ae`; Android
154 retains source `400f8609`. Their runtime source and r3 notes are equivalent.
The earlier actual-device checks remain recorded against iOS 355 / Android 154.
The homepage, release notes, status availability, structured data and product
facts now identify 27.0.6, dated November 8. The prior 27.0.5 notes stay in
history. [GitHub Pages run 42472799735](https://github.com/btutal/fcclubs-web/actions/runs/42472799735)
successfully published source `dc851d69c44df069394355404fc15474bb288cd0`.
Local validation passed all 11 tests, the production build and nine responsive
views; cache-disabled production browser checks also pass all nine views.
All 18 cache-disabled live paths match the validated production build byte for
byte. The documentation closeout preserves that deployed customer source. See
[the website record](docs/WEBSITE_27_0_6_PREPARATION.md),
the app's [release record](../fcclubsapp/docs/releases/v27.0.6/RELEASE_358_154_2026_11_08.md)
and [owner-authorized announcement](https://github.com/btutal/fcclubsapp/blob/main/docs/releases/v27.0.6/PUBLIC_ANNOUNCEMENT_2026_11_08.md).

## Historical 27.0.5 announcement — 4 November 2026

The owner confirmed Google Play 27.0.5 was live and explicitly authorized that
website announcement and publication. Release links, structured data, release
notes, status availability copy and `llms.txt` then identified 27.0.5. That
public copy said “27.0.5 is live” without presenting Apple approval as
independently verified. Store-specific evidence remains in the app release record.

See [the preparation record](docs/WEBSITE_27_0_5_PREPARATION.md) for validation and
the earlier local-only boundary and completed publication checks.

## Previous release announcement — October 15, 2026

The owner confirmed **27.0.4 was available on iOS and Android** and authorized
website publication on October 15. Homepage availability, structured data,
release notes, status and `llms.txt` then agreed on that version.
The release notes include the platform-specific Extra Slot setup fixes and the
shared nationality-flag and editable support-email improvements.

The [27.0.4 release record](docs/WEBSITE_27_0_4.md) preserves the earlier local
preparation and tester snapshots separately from this publication. Verify the
exact [Pages workflow](https://github.com/btutal/fcclubs-web/actions/workflows/deploy.yml)
and cache-disabled live readbacks after pushing. The
[27.0.3 publication record](docs/WEBSITE_27_0_3.md) retains the earlier announcement.

The homepage uses the exact Electric Blue app icon and fresh FC27 Session Detail
and Pro Stats screenshots. Session recaps and player contributions lead the
presentation, with compatibility, free-slot and purchase limits beside downloads.
The [October 10 release update](docs/WEBSITE_RELEASES_2026_10_10.md) records the
previous versions’ verified approval and availability. The [October 8 website update](docs/WEBSITE_27_0_1.md) explains
the visual direction and search/AI-discovery checks. The [status page](https://fcclubs.app/status.html)
retains the separate FC26 provider transition and saved-history guidance.

Use Node 22.12+ locally. The `prebuild` hook runs tests before every build,
including GitHub Pages CI.

The official marketing website for the FC Clubs Companion iOS and Android apps.

## Discovery copy update — October 6, 2026

Homepage and Pro Stats copy clarify FC27 compatibility, setup, free starting
features, optional purchases and saved-history limits. The [copy review](docs/DISCOVERY_COPY_REVIEW.md)
records that earlier publication. The user approved the subsequent store copy
and premium assets; they were submitted on October 8. Google has published its
changes, and Apple 27.0.1 / 321 is now approved and ready for distribution.

## Studio 149

FC Clubs Stats is developed and published by Berkay Ogulcan Tutal under the
name [Studio 149](https://studio149.dev/) (**Ideas. Apps. Games.**). The FC Clubs
website links to the studio and its [legal notice](https://studio149.dev/impressum.html),
while keeping FC Clubs support and privacy contacts at `support@fcclubs.app`.
This publisher-information update is independent of platform app releases.

## Overview
This project contains the source code for the landing page and support pages of the FC Clubs Companion app. It serves to showcase the app's features, provide download links, and offer support resources.

## Key Links
- **App Store**: [FC Clubs](https://apps.apple.com/us/app/fc-clubs/id6756238638)
- **Google Play**: [FC Clubs](https://play.google.com/store/apps/details?id=com.berkaytutal.fcclubsapp)
- **Agent workflow**: [AGENTS.md](AGENTS.md)

## Deployment
This site is deployed to [fcclubs.app](https://fcclubs.app) through
[GitHub Pages](.github/workflows/deploy.yml). Pushes to `main` automatically
publish; the workflow also supports manual dispatch. It runs `npm ci`,
the production build, and its automatic `prebuild` test hook.

For an authorized publication, run the relevant tests/build and verify the live
page after deployment. Prepare release notes locally and follow the sibling
app's [release process](../fcclubsapp/docs/RELEASE_PROCESS.md), retaining its
store-approval gate unless the owner explicitly authorizes an earlier
announcement. Keep platform evidence distinct from that authorization. Local
edits do not request a deploy.

## Feature Roadmap
The official roadmap and feature status are maintained in the iOS project's Product Requirements Document.
- **Source**: `../fcclubsapp/PRD.md`
- **Usage**: Developers updating the website should refer to the "Feature Roadmap" section in the PRD to know what is Shipped (Live) vs Backlog.

## Bento Generator
A tool for creating social media graphics for the app.

- **Development URL**: `/bento_generator.html` (the current production Vite inputs exclude this tool)
- **Documentation**: [BENTO_GENERATOR.md](./BENTO_GENERATOR.md)
- **Features**: Multiple formats (square, portrait, landscape), theme presets, export to PNG

## Development
To run the website locally:
1. Open a terminal at the current checkout's Git root.
2. Run `npm install` to install dependencies.
3. Run `npm run dev` to start the local development server.
4. Open the following links in your browser:
    - **Home**: `http://localhost:5173/`
    - **Status**: `http://localhost:5173/status.html`
    - **Release Notes**: `http://localhost:5173/whats-new.html`
    - **Bento Generator**: `http://localhost:5173/bento_generator.html`

> [!NOTE]
> The port `5173` is the default for Vite. If it's occupied, check the terminal output for the correct port.

## Validation

For site behavior/content changes, run `npm test` and `npm run build`. Inspect
changed layouts on desktop and mobile. Documentation-only edits need local
link/command verification and `git diff --check`; schema examples should match
the generator's serializer/importer.

## Status Page
Operational status and incident copy are managed in `status.html`.
See [docs/STATUS_PAGE.md](./docs/STATUS_PAGE.md) for wording rules and update steps.

## Feedback & Support
This repository is also the central hub for:
- **Bug Reports**: Open an issue for any bugs found in the iOS/Android apps or website.
- **Feature Requests**: Submit ideas for new features.
