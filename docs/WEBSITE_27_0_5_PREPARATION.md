# 27.0.5 website preparation

Prepared locally on 3 November 2026. The owner explicitly requested release
notes for both apps and the website, with **no website push yet**. This work
makes no remote publication, deployment or store-approval claim.

## Prepared copy

The release page adds an upcoming 27.0.5 preview with separate Android, iOS and
shared sections. The homepage and product-facts file link to that preview.
Community icons are optional purchases with app-store/region-dependent
availability; the copy does not promise every design or one purchase across
both stores. Purchased icons can be restored through the same app store.
Android’s six free icons/Automatic are new; existing iOS free icons are not
presented as a new iOS feature.

The copy describes what a customer gains over public 27.0.4: community icons,
Android icon choices, and all-time totals counting playoff matches once. Three
website benefit cards mirror the two iOS cards and three Android cards. Internal development iterations, icon-control regrouping,
diagnostic plumbing, private build flags and Debug Tools are omitted from
user-facing release copy.

## Publication boundary

The starting website checkout is clean `main` at
`9d32bce4aa058f31c2a6f13b70d16d1a7ee3943a`. The remote `main` independently
matched it before editing. The verified public version remains 27.0.4:

- Homepage/current release links, `softwareVersion`, status availability and
  the current product-facts entry remain 27.0.4.
- The 27.0.5 block says upcoming/store approval pending, with no release date.
- The sitemap’s homepage/release-page dates reflect this local content edit,
  not an app release date.

After both production app releases and icon availability are confirmed, prepare
one final publication pass: update homepage availability and structured version,
mark 27.0.5 current on the release page with its actual date, demote 27.0.4 to
history, and update status/product-facts current-version copy. Remove the preview
qualifiers only for confirmed public availability. Run the website checks and
inspect desktop/mobile again. Push/deploy only when the owner authorizes it.

## Validation

`npm test` passed all 11 tests. `npm run build` passed, including its required
prebuild test hook. A separate local Playwright session inspected the changed
release page at desktop 1440px and mobile 390px/320px, plus the homepage at
1440px/390px. The layouts have no horizontal overflow; preview/current labels,
region/purchase boundaries and platform-specific notes remain visible. Website
analytics were declined in this local preview, with no permission changes to the
user’s authenticated store-browser sessions.

Local screenshots and private validation evidence are outside this repository
in sibling `audit-reports/2026-11-03-production-readiness/release-notes-website/`.
The prepared preview is recorded in a local signed commit. Remote `main` remains
at the starting revision. No push, Pages dispatch or deployment was performed.
