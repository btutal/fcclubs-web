# Website agent guide

This repository owns the FC Clubs marketing/support website and the local Bento graphics tool. Work from this checkout's Git root and read the relevant page or runbook for the task.

## Browser use

- Use the in-app browser by default for browser work.
- Do not open, select, inspect, navigate, screenshot or automate Google Chrome, or attach to it through CDP, browser extensions or screen sharing, unless the user explicitly asks to use Chrome. A generic request to test a website or collect screenshots is not Chrome authorization.
- If the in-app browser is unavailable, use a non-browser connector or CLI where possible, or report the blocker. Do not automatically fall back to Chrome or use a browser-launching CLI as a substitute.
- Leave the user's personal windows, tabs, profiles and browser sessions untouched unless explicitly asked to operate that browser or session.

## Local work and verification

- Carry requested local changes through relevant checks; fix failures caused by the change and report remaining gaps.
- Use semantic HTML, separate CSS, and the existing design tokens. Preserve responsive layouts, keyboard navigation, meaningful labels, contrast, and SEO metadata.
- For site behavior/content changes, run `npm test` and `npm run build`; inspect changed layouts on desktop and mobile. Documentation-only changes need link/command verification and `git diff --check`, without unrelated browser/build work.
- Keep secrets and large generated intermediate files out of Git.

## Generated output and storage

- Use one shared main-project `artifacts/` root. Honor `FC_CLUBS_ARTIFACTS_ROOT`; otherwise resolve the primary checkout from `git rev-parse --path-format=absolute --git-common-dir` and use its project parent's `artifacts/`. Worktrees share this output root while source edits remain in the current checkout. Do not create new top-level `audit-reports/`, `release-artifacts/` or worktree-local artifact trees.
- Use `cache/fcclubs-web/<stable-checkout-id>/<tool>/` for reusable caches, `scratch/fcclubs-web/<task>/` for disposable files, `evidence/fcclubs-web/<task>/` for concise logs/selected screenshots and `releases/fcclubs-web/<version-build>/` for required release material. Derive the stable checkout ID from the current Git root instead of accumulating per-build timestamps. Use explicit tool output options and temporary directories with cleanup traps.
- Keep Vite's normal production `dist/` and the Pages workflow contract intact. For one-off browser checks, put screenshots, snapshots and request logs in central scratch/evidence, then retain only useful proof. Do not copy whole browser profiles or secret-bearing network captures into reports; private evidence parents must be mode `0700`.
- At completion, close task-owned browser/preview processes and remove only scratch, generated duplicate captures and rebuildable temporary output created by the task. Report retained large output with its path and size. Reuse existing test simulators; delete only clones created for the task, without erasing personal/default or active devices.
- Preserve canonical assets, fixtures, required release/symbol/recovery material and tracked evidence. Historical artifact paths remain provenance; record relocations rather than silently rewriting old receipts. Storage cleanup does not authorize a Pages deployment or remote data deletion.

## Task-specific references

- [README.md](README.md): local development, supported pages, and deployment.
- [docs/STATUS_PAGE.md](docs/STATUS_PAGE.md): public status copy and update rules.
- [BENTO_GENERATOR.md](BENTO_GENERATOR.md): current v20 preset schema, legacy autosave migration, and assets. Read it for generator/preset changes; each exported slot has its documented `contentType`. Check all supported formats when generator layout/export behavior changes.
- The sibling app's [PRD](../fcclubsapp/PRD.md) owns product scope; its [release process](../fcclubsapp/docs/RELEASE_PROCESS.md) owns platform-specific release-note and store-approval gates.

## Publication

- [.github/workflows/deploy.yml](.github/workflows/deploy.yml) publishes GitHub Pages when `main` is pushed, or on manual dispatch. It installs dependencies and runs the build, whose `prebuild` hook runs `npm test` before publication.
- Follow the user's existing authorization for pushes and publication. Prepare release notes locally and retain the app release process's store-approval gate before pushing the website deploy branch.
- Preserve platform-specific release copy. For an authorized deployment, verify the intended revision and read back the live page with cache disabled.
