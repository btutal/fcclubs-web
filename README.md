# FC Clubs Companion - Marketing Website

## Current releases — October 10, 2026

The app is available on the App Store and Google Play. **iOS 27.0.1 / 321 is
Ready for Distribution**, verified through App Store Connect and the public
Apple lookup on October 10. **Android 27.0.2 / 134 is public**, verified through
Google Play's public English/US listing on October 10. Its incomplete-opponent
match-import fix is the only new feature claim. Website copy and structured data
show these current platform versions; 27.0.1 remains in both platforms' history.
The [app candidate record](../fcclubsapp/docs/releases/v27.0.1/RELEASE_CANDIDATE.md)
records immutable build identities; older submission snapshots retain their
original review states.

The homepage uses the exact Electric Blue app icon and fresh FC27 Session Detail
and Pro Stats screenshots. Session recaps and player contributions lead the
presentation, with compatibility, free-slot and purchase limits beside downloads.
The [current release update](docs/WEBSITE_RELEASES_2026_10_10.md) records approval
and availability. The [October 8 website update](docs/WEBSITE_27_0_1.md) explains
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
app's [release process](../fcclubsapp/docs/RELEASE_PROCESS.md): keep the website
deploy branch unpushed until store approval. Local edits do not request a deploy.

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
