# Status Page Runbook

The public status page lives at `/status.html` and is intended for clear user communication during provider or app-side incidents. Keep it simple: current status, current event, and previous events.

## Wording Rules

- Use **data provider** or **provider-backed updates**.
- Do not name the upstream provider in incident copy.
- Be precise about scope: avoid saying the whole app is down when only match-history or session refreshes are affected.
- Keep reassurance factual: saved data remains available only if it was already saved on the device.
- Tell users when no action is needed. Do not ask users to reinstall unless there is a confirmed app-side reason.

## Updating An Incident

Edit `status.html`:

1. Update the `Current Status` card:
   - label, for example `Degraded`, `Operational`, `Unavailable`, or `Monitoring`
   - affected areas
   - still-available areas
2. Update the current-status `<time>` element:
   - the visible text, for example `June 23, 2026 at 18:45 CEST`
   - the `datetime` attribute, for example `2026-06-23T18:45:17+02:00`
3. Update the `Current Event` card with the newest user-facing note.
4. If there is no active event, remove the current-event card and make the current status `Operational`.
5. Run `npm run build`.

## Resolving An Incident

When the issue is resolved:

1. Change the `Current Status` card to `Operational` or `Monitoring`.
2. Move the current-event summary into `Previous Events`.
3. Include the resolved time and one sentence on impact.
4. Remove the active event card if there is no current issue.
5. Run `npm run build`.

## Suggested Status Labels

- `Operational`: feature should work normally.
- `Degraded`: feature is working intermittently, stale, delayed, or partially failing.
- `Unavailable`: feature is expected to fail until a provider or app-side issue is resolved.
- `Monitoring`: issue appears recovered, but keep watching telemetry and support messages.

## Current Provider-Incident Template

Use this shape when provider-backed stats are stale but the app is not globally offline:

```text
Some data provider updates are delayed.

The data provider is currently responding inconsistently for some club history requests. You may see club stats, matches, or sessions stuck on older data until the provider responses recover.

FC Clubs is keeping saved data visible and will continue to load features that have a healthy response. You do not need to reinstall the app or change your club setup.
```
