import assert from 'node:assert/strict';
import { readdir } from 'node:fs/promises';
import test from 'node:test';

async function listFiles(directoryUrl, prefix = '') {
    const entries = await readdir(directoryUrl, { withFileTypes: true });
    const files = [];

    for (const entry of entries) {
        if (entry.name === '.DS_Store') continue;

        const relativePath = prefix ? `${prefix}/${entry.name}` : entry.name;
        if (entry.isDirectory()) {
            files.push(...await listFiles(new URL(`${entry.name}/`, directoryUrl), relativePath));
        } else {
            files.push(relativePath);
        }
    }

    return files;
}

test('public directory contains only production runtime files', async () => {
    const files = (await listFiles(new URL('../public/', import.meta.url))).sort();

    assert.deepEqual(files, [
        'assets/app-icon.png',
        'assets/screenshots/hero-ai-sessions.webp',
        'assets/screenshots/pro-stats.webp',
        'assets/social/marketing.jpg',
        'robots.txt',
        'sitemap.xml',
    ]);
});
