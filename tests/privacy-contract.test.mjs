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

        for (const externalTab of html.matchAll(/<a\b[^>]*\btarget="_blank"[^>]*>/g)) {
            assert.match(
                externalTab[0],
                /\brel="[^"]*\bnoopener\b[^"]*"/,
                `${page} must protect links that open a new tab`,
            );
        }
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
    assert.match(privacyPolicy, /Settings &gt; Privacy &gt; Privacy &amp; Data/);
    assert.match(privacyPolicy, /app-specific references needed to locate relevant records/);
    assert.match(privacyPolicy, /not displayed in Settings/);
    assert.match(privacyPolicy, /Send the in-app request before uninstalling/i);
    assert.doesNotMatch(privacyPolicy, /include the same available identifiers from that screen/);
    assert.match(privacyPolicy, /Some older installed builds may still include/);
    assert.match(privacyPolicy, /Collection is not tracking/);
    assert.match(privacyPolicy, /broad region derived from a masked IP address/);
    assert.match(privacyPolicy, /does not request GPS or precise location for Analytics/);
    assert.match(privacyPolicy, /does not receive your payment card details/);
    assert.match(privacyPolicy, /FC Clubs does not create or require an FC Clubs user account/);
    assert.match(privacyPolicy, /None of these categories is used to track you across other companies/);
    assert.match(privacyPolicy, /Operational service providers/);
    assert.match(privacyPolicy, /solely to operate and support FC Clubs/);
    assert.match(privacyPolicy, /may not use this information for their own advertising or tracking/);
});

test('public website omits private operational details and credential material', async () => {
    const publicSources = [
        ...websitePages,
        'src/analytics-consent.js',
        'src/main.js',
    ];
    const forbiddenDetails = [
        ['operational delivery detail', /\b(?:channel|bot|webhook)\b/i],
        ['backend storage implementation', /\b(?:Cloudflare\s+)?Workers?\s*\+\s*D1\b/i],
        ['backend database implementation', /\bCloudflare\s+(?:Workers?|D1)\b/i],
        ['token detail', /\btoken\b/i],
        ['runtime environment reference', /\b(?:process\.env|import\.meta\.env)\b/],
        ['service-account credential', /\bservice[ _-]?account(?:[ _-]?(?:key|json))?\b/i],
        ['private key material', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
    ];

    for (const sourcePath of publicSources) {
        const source = await read(sourcePath);

        for (const [label, pattern] of forbiddenDetails) {
            assert.doesNotMatch(source, pattern, `${sourcePath} exposes ${label}`);
        }
    }
});
