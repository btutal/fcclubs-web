# FC Clubs Companion - Marketing Website

## Release baseline — September 16, 2026

Website source `d6b3176` records **1.1.9 available on iOS and Android**. Its
FC26 live-update pause notice remains separate from app-release availability.
The preparation notice announces **27.0.0** for FC27 while clearly stating
that support is not available and has no confirmed release date. Publish
availability claims only after app/provider verification and store approval. Do not resolve the FC26 incident just because a
new app version or FC27 edition ships.

Local validation passes: nine tests and production build. Vite 7.3.6 and
refreshed transitive dependencies clear the audit. Use Node 22.12+ for local work. The existing Pages workflow uses Node 20;
Vite supports 20.19+. The `prebuild` hook runs tests before every build,
including CI. See the app's
[implementation status](../fcclubsapp/docs/READINESS_27_0_0_IMPLEMENTATION.md).

The official marketing website for the FC Clubs Companion iOS and Android apps.

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
