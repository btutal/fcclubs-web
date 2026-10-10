# Website 27.0.1 update — October 8, 2026

This is the historical publication record. Apple subsequently approved build 321;
see [the October 10 release update](WEBSITE_RELEASES_2026_10_10.md) for current
availability. The original evidence below retains its October 8 review state.

The user authorized updating and publishing the website for the new release,
with stronger presentation and search/LLM compatibility.

## Verified release state

- Google Play Console Production is Active, with latest release 27.0.1 / 133.
  Publishing overview reports last publication on October 8, 2026.
- Authenticated Apple `/v1/appStoreVersions/35bd3f62-31c3-4912-b5b5-57571340ae23?include=build`
  reports WAITING_FOR_REVIEW, version 27.0.1, build 321. The public iOS release
  remains 27.0.0. The owner's permission to say the app is available on both
  stores is reflected without presenting the pending iOS patch as approved.
- Patch notes come from the approved platform-specific metadata in the sibling
  app repository. No store description or app binary is changed by this update.

## Design

Visual thesis: make FC Clubs immediately recognizable through its complete,
approved app icon, restrained Electric Blue accents and real FC27 app screens.
Content plan: club benefit and store downloads; Pro Stats product story;
feature detail and existing user reviews; setup answers; final download action.
Interaction thesis: responsive link/button feedback and keyboard-accessible
native FAQ disclosures; smooth anchor navigation with reduced-motion support.

The icon comes from the approved Apple Icon Composer export in
`../fcclubsapp/store/app-store/assets/creative-assets/brand/`.
Session Detail and Pro Stats captures come from the fresh real FC27 iPhone
sources in `../fcclubsapp/store/store-screenshot-sources/en-US/app-iphone/`.
Only web delivery size/format changes are made. The social preview is a coded
layout using those same assets, replacing its obsolete FC26 screenshot/copy.
Mobile leads with the app's purpose and downloads, and keeps useful navigation
visible. All text remains HTML; screenshots do not replace feature explanations.

## Search and AI discovery

- Search titles, canonical URLs, social metadata, crawlable store/internal links
  and indexable marketing pages are retained. Utility/legal pages keep their
  existing noindex policy. Sitemap modification dates match edited pages.
- MobileApplication JSON-LD describes real features and platform-specific public
  versions. No invented ratings, AI functionality or universal metric coverage.
- Existing robots.txt permits crawling. The seven visible setup answers explain
  platforms, pricing, advanced metrics, refresh limits and platform-specific backup.
- `llms.txt` offers a concise factual product summary and authoritative links;
  versions point to release notes rather than duplicating time-sensitive numbers.
  It is supplementary, not a search requirement or ranking guarantee.
- No new analytics, external fonts or pre-consent network requests are introduced.

[Google’s AI search guidance](https://developers.google.com/search/docs/appearance/ai-features)
requires ordinary SEO, readable content, crawl access and accurate structured
data, rather than a special AI file. [OpenAI’s crawler guidance](https://developers.openai.com/api/docs/bots)
describes search access separately from training. Neither crawler eligibility
nor a summary file guarantees that ChatGPT, Claude, Grok or Google recommends
the app. Post-publication Search Console and referral performance remain the
way to measure discoverability.

## Validation

All ten existing tests and the production build pass. The homepage, Pro Stats,
release notes and status page have one H1 and one main landmark, with no
horizontal overflow at 320, 390, 868 and 1440px. Current images load. FAQ click
and Enter toggling work, and mobile navigation remains visible. Desktop/mobile
visual review corrected screenshot proportions and anchor offsets before
publication. The social preview has been inspected at its actual 1200×630 size. The final handoff records the exact commit,
Pages workflow and production readback. Store-installed device acceptance is
separate from website rendering.
