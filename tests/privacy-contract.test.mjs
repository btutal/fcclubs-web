import assert from 'node:assert/strict';
import { access, readFile } from 'node:fs/promises';
import test from 'node:test';

const marketingPages = [
    'index.html',
    'pro-stats.html',
    'whats-new.html',
];

const utilityPages = [
    'privacy.html',
    'terms.html',
    'status.html',
];

const websitePages = [...marketingPages, ...utilityPages];

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

test('privacy policy states the real data scope without operational internals', async () => {
    const privacyPolicy = await read('privacy.html');

    assert.match(privacyPolicy, /Berkay Ogulcan Tutal/);
    assert.match(privacyPolicy, /do not sell personal data/);
    assert.match(privacyPolicy, /do not use personal data for advertising or tracking/);
    assert.match(privacyPolicy, /These features are off until you enable/);
    assert.match(privacyPolicy, /selected club, in-game player name, match context/);
    assert.match(privacyPolicy, /broad region from a masked IP address/);
    assert.match(privacyPolicy, /does not request GPS or precise location/);
    assert.match(privacyPolicy, /does not receive your payment card information/);
    assert.match(privacyPolicy, /Current Android builds do not request the Android Advertising ID/);
    assert.match(privacyPolicy, /iOS app does not request Apple’s Identifier for Advertisers/);
    assert.match(privacyPolicy, /does not create a user account/);
    assert.match(privacyPolicy, /Data sent by the app is encrypted in transit/);

    assert.match(privacyPolicy, /id="website-analytics"/);
    assert.match(privacyPolicy, /data-analytics-preference="denied"/);
    assert.match(privacyPolicy, /data-analytics-preference="granted"/);
    assert.match(privacyPolicy, /id="data-deletion"/);
    assert.match(privacyPolicy, /Settings &gt; Privacy &gt; Privacy &amp; Data/);
    assert.match(privacyPolicy, /mailto:support@fcclubs\.app/);
    assert.match(privacyPolicy, /not displayed in Settings/);
    assert.match(privacyPolicy, /Send the in-app request before uninstalling/i);
});

test('marketing pages carry focused search and social metadata', async () => {
    for (const page of marketingPages) {
        const html = await read(page);

        assert.match(html, /<title>[^<]{15,70}<\/title>/, `${page} needs a useful title`);
        assert.match(html, /<meta name="description" content="[^"]{50,170}" \/>/);
        assert.match(html, /<link rel="canonical" href="https:\/\/fcclubs\.app\/[^"]*" \/>/);
        assert.match(html, /<meta property="og:site_name" content="FC Clubs Stats" \/>/);
        assert.match(html, /<meta property="og:title" content="[^"]+" \/>/);
        assert.match(html, /<meta property="og:description" content="[^"]+" \/>/);
        assert.match(html, /<meta property="og:image" content="https:\/\/fcclubs\.app\/assets\/social\/marketing\.jpg" \/>/);
        assert.match(html, /<meta property="og:image:width" content="1200" \/>/);
        assert.match(html, /<meta property="og:image:height" content="630" \/>/);
        assert.match(html, /<meta name="twitter:card" content="summary_large_image" \/>/);
        assert.doesNotMatch(html, /name="robots"[^>]*noindex/);
    }
});

test('utility and legal pages stay available without competing in search', async () => {
    for (const page of utilityPages) {
        const html = await read(page);
        assert.match(html, /<meta name="robots" content="noindex, follow" \/>/);
    }

    const sitemap = await read('public/sitemap.xml');
    assert.match(sitemap, /<loc>https:\/\/fcclubs\.app\/<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/fcclubs\.app\/pro-stats\.html<\/loc>/);
    assert.match(sitemap, /<loc>https:\/\/fcclubs\.app\/whats-new\.html<\/loc>/);
    assert.doesNotMatch(sitemap, /privacy|terms|status/);
    assert.equal((sitemap.match(/<url>/g) ?? []).length, marketingPages.length);
});

test('structured data is valid and does not claim an unsupported rating', async () => {
    const homepage = await read('index.html');
    const match = homepage.match(/<script type="application\/ld\+json">([\s\S]*?)<\/script>/);
    assert.ok(match, 'homepage must include JSON-LD');

    const structuredData = JSON.parse(match[1]);
    const graphTypes = structuredData['@graph'].map((entry) => entry['@type']);

    assert.deepEqual(graphTypes, ['WebSite', 'MobileApplication']);
    assert.equal(structuredData['@graph'][1].name, 'FC Clubs Stats');
    assert.equal(structuredData['@graph'][1].offers.price, '0');
    assert.doesNotMatch(match[1], /aggregateRating|reviewCount|ratingValue/);
});

test('release notes distinguish the upcoming build from the live version', async () => {
    const releaseNotes = await read('whats-new.html');

    assert.match(releaseNotes, /v1\.1\.7[\s\S]*Coming Soon[\s\S]*Upcoming/);
    assert.match(releaseNotes, /v1\.1\.6[\s\S]*Current Version/);
    assert.doesNotMatch(releaseNotes, /v1\.1\.7[\s\S]{0,200}Current Version/);
});

test('production pages and assets do not expose internal tooling or stale screenshots', async () => {
    const publicSources = [
        ...websitePages,
        'src/analytics-consent.js',
    ];
    const forbiddenDetails = [
        ['notification delivery detail', /\b(?:Telegram|channel|bot|webhook)\b/i],
        ['backend storage implementation', /\b(?:Cloudflare\s+)?Workers?\s*\+\s*D1\b/i],
        ['backend database implementation', /\bCloudflare\s+(?:Workers?|D1)\b/i],
        ['credential detail', /\b(?:token|process\.env|import\.meta\.env|service[ _-]?account)\b/i],
        ['private key material', /-----BEGIN (?:RSA |EC |OPENSSH )?PRIVATE KEY-----/],
        ['internal asset path', /\/internal-assets\//],
        ['stale public screenshot path', /\/assets\/screenshots\/v1\.1\.0\//],
        ['obsolete keyword metadata', /<meta name="keywords"/],
        ['generic link text', />\s*Learn more\s*</i],
        ['release-note contributor handle', /\b(?:Requested|Suggested|Thanks) by\b/i],
        ['release-note issue reference', />\s*Issue #\d+\s*</i],
    ];

    for (const sourcePath of publicSources) {
        const source = await read(sourcePath);

        for (const [label, pattern] of forbiddenDetails) {
            assert.doesNotMatch(source, pattern, `${sourcePath} exposes ${label}`);
        }
    }

    const expectedAssets = [
        'public/assets/app-icon.png',
        'public/assets/screenshots/hero-ai-sessions.webp',
        'public/assets/screenshots/pro-stats.webp',
        'public/assets/social/marketing.jpg',
    ];
    for (const asset of expectedAssets) {
        await assert.doesNotReject(access(new URL(`../${asset}`, import.meta.url)));
    }
});
