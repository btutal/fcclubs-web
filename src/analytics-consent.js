const ANALYTICS_MEASUREMENT_ID = 'G-YZG95LHNPW';
const ANALYTICS_SCRIPT_ID = 'fcclubs-google-analytics';
const CONSENT_STORAGE_KEY = 'fcclubs.website.analytics-consent.v1';
const CONSENT_GRANTED = 'granted';
const CONSENT_DENIED = 'denied';

let inMemoryPreference = null;
let analyticsInitialized = false;

function isConsentPreference(value) {
    return value === CONSENT_GRANTED || value === CONSENT_DENIED;
}

function readConsentPreference() {
    try {
        const storedPreference = window.localStorage.getItem(CONSENT_STORAGE_KEY);
        inMemoryPreference = isConsentPreference(storedPreference)
            ? storedPreference
            : null;
    } catch {
        // Storage can be unavailable in strict privacy modes. The choice still
        // applies to the current page through the in-memory value.
    }

    return inMemoryPreference;
}

function writeConsentPreference(preference) {
    inMemoryPreference = preference;

    try {
        window.localStorage.setItem(CONSENT_STORAGE_KEY, preference);
    } catch {
        // Keep the current-page choice even when the browser blocks storage.
    }
}

function deleteAnalyticsCookies() {
    const cookieNames = document.cookie
        .split(';')
        .map((cookie) => cookie.split('=')[0].trim())
        .filter((name) => name === '_ga' || name.startsWith('_ga_'));

    const hostnameParts = window.location.hostname.split('.');
    const domains = hostnameParts.flatMap((_, index) => {
        const domain = hostnameParts.slice(index).join('.');
        return domain.includes('.') ? [domain, `.${domain}`] : [];
    });

    for (const cookieName of cookieNames) {
        document.cookie = `${cookieName}=; Max-Age=0; path=/; SameSite=Lax`;
        for (const domain of domains) {
            document.cookie = `${cookieName}=; Max-Age=0; path=/; domain=${domain}; SameSite=Lax`;
        }
    }
}

function disableAnalytics({ clearCookies = true } = {}) {
    window[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = true;

    if (typeof window.gtag === 'function') {
        window.gtag('consent', 'update', {
            analytics_storage: 'denied',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        });
    }

    if (clearCookies) {
        deleteAnalyticsCookies();
    }
}

function enableAnalytics() {
    window[`ga-disable-${ANALYTICS_MEASUREMENT_ID}`] = false;

    if (analyticsInitialized || document.getElementById(ANALYTICS_SCRIPT_ID)) {
        window.gtag?.('consent', 'update', {
            analytics_storage: 'granted',
            ad_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
        });
        return;
    }

    analyticsInitialized = true;
    window.dataLayer = window.dataLayer || [];
    window.gtag = window.gtag || function gtag() {
        window.dataLayer.push(arguments);
    };

    window.gtag('consent', 'default', {
        analytics_storage: 'granted',
        ad_storage: 'denied',
        ad_user_data: 'denied',
        ad_personalization: 'denied',
    });
    window.gtag('set', 'ads_data_redaction', true);
    window.gtag('set', 'url_passthrough', false);
    window.gtag('js', new Date());
    window.gtag('config', ANALYTICS_MEASUREMENT_ID, {
        allow_google_signals: false,
        allow_ad_personalization_signals: false,
    });

    const analyticsScript = document.createElement('script');
    analyticsScript.id = ANALYTICS_SCRIPT_ID;
    analyticsScript.async = true;
    analyticsScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_MEASUREMENT_ID}`;
    document.head.append(analyticsScript);
}

function consentStatusText(preference) {
    if (preference === CONSENT_GRANTED) {
        return 'Website analytics is allowed on this browser.';
    }
    if (preference === CONSENT_DENIED) {
        return 'Website analytics is declined on this browser.';
    }
    return 'No choice is saved. Google Analytics is off.';
}

function updatePreferenceControls(preference) {
    for (const control of document.querySelectorAll('[data-analytics-preference]')) {
        const action = control.dataset.analyticsPreference;
        control.setAttribute('aria-pressed', String(action === preference));
    }

    for (const status of document.querySelectorAll('[data-analytics-consent-status]')) {
        status.textContent = consentStatusText(preference);
    }
}

function hideConsentBanner() {
    const banner = document.getElementById('analytics-consent-banner');
    if (!banner) {
        return;
    }

    banner.classList.remove('analytics-consent--visible');
    banner.addEventListener('transitionend', () => banner.remove(), { once: true });
    window.setTimeout(() => banner.remove(), 300);
}

function applyConsentPreference(preference) {
    writeConsentPreference(preference);

    if (preference === CONSENT_GRANTED) {
        enableAnalytics();
    } else {
        disableAnalytics();
    }

    updatePreferenceControls(preference);
    hideConsentBanner();
}

function applySyncedConsentPreference(preference) {
    inMemoryPreference = preference;

    if (preference === CONSENT_GRANTED) {
        enableAnalytics();
    } else {
        disableAnalytics();
    }

    updatePreferenceControls(preference);
    if (preference) {
        hideConsentBanner();
    } else if (!document.getElementById('analytics-consent-banner')) {
        showConsentBanner();
    }
}

function bindPreferenceControls() {
    for (const control of document.querySelectorAll('[data-analytics-preference]')) {
        if (control.dataset.analyticsConsentBound === 'true') {
            continue;
        }

        control.dataset.analyticsConsentBound = 'true';
        control.addEventListener('click', () => {
            applyConsentPreference(control.dataset.analyticsPreference);
        });
    }
}

function showConsentBanner() {
    const banner = document.createElement('aside');
    banner.id = 'analytics-consent-banner';
    banner.className = 'analytics-consent';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-modal', 'false');
    banner.setAttribute('aria-labelledby', 'analytics-consent-title');
    banner.innerHTML = `
        <div class="analytics-consent__copy">
            <h2 id="analytics-consent-title">Optional website analytics</h2>
            <p>
                Allow Google Analytics to help us understand aggregate page use.
                It stays off unless you allow it. <a href="/privacy.html#website-analytics">Learn more</a>.
            </p>
        </div>
        <div class="analytics-consent__actions" aria-label="Website analytics preference">
            <button type="button" class="analytics-consent__button" data-analytics-preference="${CONSENT_DENIED}" aria-pressed="false">
                Decline
            </button>
            <button type="button" class="analytics-consent__button" data-analytics-preference="${CONSENT_GRANTED}" aria-pressed="false">
                Allow
            </button>
        </div>
    `;

    document.body.prepend(banner);
    bindPreferenceControls();
    banner.querySelector('button')?.focus();
    window.requestAnimationFrame(() => banner.classList.add('analytics-consent--visible'));
}

function initializeAnalyticsConsent() {
    const preference = readConsentPreference();

    if (preference === CONSENT_GRANTED) {
        enableAnalytics();
    } else {
        // This also prevents a stale Google tag from a previous site version
        // from sending data before the visitor makes an explicit choice.
        disableAnalytics();
    }

    bindPreferenceControls();
    updatePreferenceControls(preference);

    if (!preference) {
        showConsentBanner();
    }
}

window.addEventListener('storage', (event) => {
    if (event.key !== CONSENT_STORAGE_KEY) {
        return;
    }

    applySyncedConsentPreference(
        isConsentPreference(event.newValue) ? event.newValue : null,
    );
});

window.addEventListener('pageshow', (event) => {
    if (event.persisted) {
        applySyncedConsentPreference(readConsentPreference());
    }
});

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initializeAnalyticsConsent, { once: true });
} else {
    initializeAnalyticsConsent();
}
