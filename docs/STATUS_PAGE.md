# Status Page Runbook

The public status page lives at `/status.html` and is intended for clear user communication during provider or app-side incidents. Keep it simple: one current incident/status panel and previous events.

## Wording Rules

- Use **data provider**, **official Clubs data provider**, or **provider-backed updates**.
- The September 2026 notice now describes the confirmed shared-provider transition to FC27. FC26 remains frozen; do not promise FC26 recovery or describe this as an ongoing unconfirmed outage.
- iOS 27.0.0 build 311 and Android 27.0.0 build 131 are public. Google Play Production listed build 131 as available on October 4, 2026. Keep the two platform release records distinct and verify store state before future availability changes.
- The homepage no longer carries the FC26 pause notice. Keep FC26 service-transition details and saved-history guidance on this status page until its service state actually changes.
- Be precise about scope: avoid saying the whole app is down when only match-history or session refreshes are affected.
- Keep reassurance factual: saved data remains available only if it was already saved on the device.
- Tell users when no action is needed. Do not ask users to reinstall unless there is a confirmed app-side reason.

## Updating An Incident

Edit `status.html`:

1. Update the `Current Status` card:
   - label, for example `Degraded`, `Operational`, `Unavailable`, or `Monitoring`
   - affected areas
   - still-available areas
   - incident summary
2. Update the current-status `<time>` elements:
   - first reported, if this is a new incident
   - last updated every time the page changes
   - the visible text, for example `June 23, 2026 at 18:45 CEST`
   - the `datetime` attribute, for example `2026-06-23T18:45:17+02:00`
3. If there is no active incident, make current status `Operational` and remove incident-specific guidance.
4. Run `npm test` and `npm run build`, then inspect the changed page at desktop and mobile widths.

## Resolving An Incident

When the issue is resolved:

1. Change the `Current Status` card to `Operational` or `Monitoring`.
2. Move the current incident summary into `Previous Events`.
3. Include the resolved time and one sentence on impact.
4. Run `npm test` and `npm run build`, then inspect the changed page at desktop and mobile widths.

## Suggested Status Labels

- `Operational`: feature should work normally.
- `Degraded`: feature is working intermittently, stale, delayed, or partially failing.
- `Unavailable`: feature is expected to fail until a provider or app-side issue is resolved.
- `Monitoring`: issue appears recovered, but keep watching telemetry and support messages.

## Historical Club-Search Incident Template

This June 2026 example applies to a club-search-only incident. The September FC26 live-update pause has broader impact and its own saved-data guidance in `status.html`:

```text
Club search is currently unavailable.

First reported: June 19, 2026 at 01:32 UTC.

The official Clubs data provider is currently having problems with club search. You may be unable to find clubs or add a new club until search starts returning results again.

FC Clubs is keeping saved data visible and will continue to load other features that receive a healthy response. You do not need to reinstall the app or change your existing setup.
```

## 27.0.1 availability — October 8, 2026

Play Console Production is active with latest release 27.0.1 / 133, and
Publishing overview reports publication on October 8. Apple’s version endpoint
still reports 27.0.1 / 321 as WAITING_FOR_REVIEW. Public copy therefore says the
app is available on both stores, identifies Android 27.0.1 as live and keeps
iOS 27.0.0 current until approval. The FC26 incident itself is unchanged.
Use the current status copy rather than the older release snapshots above.
