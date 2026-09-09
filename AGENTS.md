# Website agent guide

This repository owns the FC Clubs marketing/support website and the local Bento graphics tool. Work from this checkout's Git root and read the relevant page or runbook for the task.

## Local work and verification

- Carry requested local changes through relevant checks; fix failures caused by the change and report remaining gaps.
- Use semantic HTML, separate CSS, and the existing design tokens. Preserve responsive layouts, keyboard navigation, meaningful labels, contrast, and SEO metadata.
- For site behavior/content changes, run `npm test` and `npm run build`; inspect changed layouts on desktop and mobile. Documentation-only changes need link/command verification and `git diff --check`, without unrelated browser/build work.
- Keep secrets and large generated intermediate files out of Git.

## Task-specific references

- [README.md](README.md): local development, supported pages, and deployment.
- [docs/STATUS_PAGE.md](docs/STATUS_PAGE.md): public status copy and update rules.
- [BENTO_GENERATOR.md](BENTO_GENERATOR.md): current v20 preset schema, legacy autosave migration, and assets. Read it for generator/preset changes; each exported slot has its documented `contentType`. Check all supported formats when generator layout/export behavior changes.
- The sibling app's [PRD](../fcclubsapp/PRD.md) owns product scope; its [release process](../fcclubsapp/docs/RELEASE_PROCESS.md) owns platform-specific release-note and store-approval gates.

## Publication

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) publishes GitHub Pages when `main` is pushed, or on manual dispatch. It installs/builds the site; it does not currently run `npm test`.
- Follow the user's existing authorization for pushes and publication. Prepare release notes locally and retain the app release process's store-approval gate before pushing the website deploy branch.
- Preserve platform-specific release copy. For an authorized deployment, verify the intended revision and read back the live page with cache disabled.
