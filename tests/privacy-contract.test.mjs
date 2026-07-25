import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import test from 'node:test';

const websitePages = [
    'index.html',
    'privacy.html',
    'terms.html',
    'status.html',
    'whats-new.html',
    'pro-stats.html',
];

async function read(relativePath) {
    return readFile(new URL(`../${relativePath}`, import.meta.url), 'utf8');
}

test('public pages do not load Google Analytics or Google Fonts before consent', async () => {
    for (const page of websitePages) {
        const html = await read(page);

        assert.doesNotMatch(
            html,
            /https:\/\/www\.googletagmanager\.com\/gtag\/js/,
            `${page} must not load Google Analytics directly`,
        );
        assert.doesNotMatch(
            html,
            /https:\/\/fonts\.(?:googleapis|gstatic)\.com/,
            `${page} must not make a pre-consent Google Fonts request`,
        );
        assert.match(html, /\/src\/analytics-consent\.css/);
        assert.match(html, /\/src\/analytics-consent\.js/);
    }
});

test('analytics loader keeps advertising signals denied', async () => {
    const source = await read('src/analytics-consent.js');

    assert.match(source, /ad_storage:\s*'denied'/);
    assert.match(source, /ad_user_data:\s*'denied'/);
    assert.match(source, /ad_personalization:\s*'denied'/);
    assert.match(source, /'ads_data_redaction',\s*true/);
    assert.match(source, /'url_passthrough',\s*false/);
    assert.match(source, /allow_google_signals:\s*false/);
    assert.match(source, /allow_ad_personalization_signals:\s*false/);
    assert.match(source, /preference === CONSENT_GRANTED[\s\S]*enableAnalytics\(\)/);
    assert.match(source, /addEventListener\('storage'/);
    assert.match(source, /addEventListener\('pageshow'/);
    assert.match(source, /event\.persisted/);
    assert.match(source, /applySyncedConsentPreference/);
    assert.match(source, /setAttribute\('role', 'dialog'\)/);
    assert.match(source, /document\.body\.prepend\(banner\)/);
});

test('privacy policy exposes analytics controls and a usable deletion request route', async () => {
    const privacyPolicy = await read('privacy.html');

    assert.match(privacyPolicy, /id="website-analytics"/);
    assert.match(privacyPolicy, /data-analytics-preference="denied"/);
    assert.match(privacyPolicy, /data-analytics-preference="granted"/);
    assert.match(privacyPolicy, /id="data-deletion"/);
    assert.match(privacyPolicy, /mailto:support@fcclubs\.app/);
    assert.match(privacyPolicy, /Android Advertising ID \(AAID\)/);
    assert.match(privacyPolicy, /Identifier for Advertisers \(IDFA\)/);
    assert.match(privacyPolicy, /Backend Telemetry Installation ID/);
    assert.match(privacyPolicy, /Firebase Analytics App Instance IDs when available/);
    assert.match(privacyPolicy, /keep the Analytics App Instance IDs they capture locally/);
    assert.match(privacyPolicy, /Send the deletion request before uninstalling/);
    assert.match(privacyPolicy, /Older Android builds that remain installed may still include/);
    assert.match(privacyPolicy, /Collection is not tracking/);
    assert.match(privacyPolicy, /broad region derived from a masked IP address/);
    assert.match(privacyPolicy, /does not request GPS or precise location for Analytics/);
    assert.match(privacyPolicy, /does not receive your payment card details/);
    assert.match(privacyPolicy, /FC Clubs does not create or require an FC Clubs user account/);
    assert.match(privacyPolicy, /None of these categories is used to track you across other companies/);
    assert.doesNotMatch(privacyPolicy, /include your platform, club ID, or in-game player name/);
});
