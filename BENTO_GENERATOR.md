# Bento Generator v19 - Developer Documentation

> **For AI Agents & Developers**: This document defines the complete schema for Bento Generator presets and state management.

## Table of Contents
1. [Overview](#overview)
2. [JSON Schema](#json-schema)
3. [Slot Reference](#slot-reference)
4. [Content Types](#content-types)
5. [Style Reference](#style-reference)
6. [Asset Reference](#asset-reference)
7. [Preset Examples](#preset-examples)

---

## Overview

The Bento Generator creates social media graphics using a **6-slot grid layout**:

```
┌─────────────┬─────────────┐
│             │      B      │  B = Brand
│      H      ├─────────────┤
│             │     I2      │  I2 = Gallery
│   (Hero)    ├──────┬──────┤
│             │  S1  │  S2  │  S1/S2 = Stats
├─────────────┴──────┴──────┤
│             F             │  F = Feature
└───────────────────────────┘
```

Each slot can display different **content types** (hero-shot, gallery, highlight, etc.).

---

## JSON Schema

### Root Structure
```json
{
  "version": "19",
  "format": "ig-square",
  "hero": { ... },
  "gallery": { ... },
  "stat1": { ... },
  "stat2": { ... },
  "feature": { ... },
  "brand": { ... }
}
```

| Field | Type | Required | Description |
|-------|------|----------|-------------|
| `version` | string | ✅ | Schema version (`"19"`) |
| `format` | string | ✅ | Canvas format (see [Formats](#formats)) |
| `hero` | object | ✅ | H slot configuration |
| `gallery` | object | ✅ | I2 slot configuration |
| `stat1` | object | ✅ | S1 slot configuration |
| `stat2` | object | ✅ | S2 slot configuration |
| `feature` | object | ✅ | F slot configuration |
| `brand` | object | ✅ | B slot configuration |

---

## Slot Reference

### Slots & Default Content Types
| Slot | Key | Default Content Type | Purpose |
|------|-----|---------------------|---------|
| H | `hero` | `hero-shot` | Main visual, headline |
| I2 | `gallery` | `gallery` | Secondary screenshot |
| S1 | `stat1` | `highlight` | Key metric/number |
| S2 | `stat2` | `highlight` | Key metric/number |
| F | `feature` | `feature` | Feature callout |
| B | `brand` | `brand` | App branding |

---

## Content Types

### 1. `hero-shot` - Screenshot with Headline

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"hero-shot"` |
| `title` | string | ✅ | `""` | Text, use `\\n` for line breaks |
| `titleStyle` | string | ❌ | `"white"` | See [Text Styles](#text-styles) |
| `image` | string | ✅ | `""` | Path to screenshot |
| `zoom` | number | ❌ | `100` | `50-200` |
| `posX` | number | ❌ | `50` | `0-100` |
| `posY` | number | ❌ | `50` | `0-100` |
| `opacity` | number | ❌ | `65` | `0-100` |
| `overlay` | number | ❌ | `60` | `0-100` |

```json
{
  "contentType": "hero-shot",
  "title": "Your Club.\\nYour Stats.",
  "titleStyle": "white",
  "image": "/internal-assets/screenshots/iphone-dashboard.png",
  "zoom": 100,
  "posX": 50,
  "posY": 50,
  "opacity": 65,
  "overlay": 60
}
```

---

### 2. `gallery` - Screenshot with Optional Title

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"gallery"` |
| `image` | string | ✅ | `""` | Path to screenshot |
| `title` | string | ❌ | `""` | Short label |
| `titleStyle` | string | ❌ | `"white"` | See [Text Styles](#text-styles) |
| `zoom` | number | ❌ | `100` | `50-200` |
| `posX` | number | ❌ | `50` | `0-100` |
| `posY` | number | ❌ | `50` | `0-100` |
| `opacity` | number | ❌ | `90` | `0-100` |
| `overlay` | number | ❌ | `30` | `0-100` |

```json
{
  "contentType": "gallery",
  "image": "/internal-assets/screenshots/iphone-sessions.png",
  "title": "Sessions",
  "titleStyle": "white",
  "zoom": 100,
  "posX": 50,
  "posY": 50,
  "opacity": 90,
  "overlay": 30
}
```

---

### 3. `highlight` - Stat/Number Display

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"highlight"` |
| `value` | string | ✅ | `""` | Large text (e.g., "100", "∞", "AI") |
| `label` | string | ✅ | `""` | UPPERCASE label |
| `tagline` | string | ❌ | `""` | Description |
| `style` | string | ❌ | `"green"` | See [Stat Styles](#stat-styles) |

```json
{
  "contentType": "highlight",
  "value": "∞",
  "label": "MATCHES SAVED",
  "tagline": "Never lose your history",
  "style": "green"
}
```

---

### 4. `feature` - Feature Callout with Icon

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"feature"` |
| `title` | string | ✅ | `""` | Feature name |
| `description` | string | ❌ | `""` | Short description |
| `icon` | string | ❌ | `""` | See [Icons](#icons) |
| `image` | string | ❌ | `""` | Optional background |
| `zoom` | number | ❌ | `100` | `50-200` |
| `posX` | number | ❌ | `50` | `0-100` |
| `posY` | number | ❌ | `50` | `0-100` |
| `opacity` | number | ❌ | `40` | `0-100` |
| `overlay` | number | ❌ | `70` | `0-100` |

```json
{
  "contentType": "feature",
  "title": "Real-Time Sync",
  "description": "Automatic updates as you play",
  "icon": "⚡",
  "image": "",
  "zoom": 100,
  "posX": 50,
  "posY": 50,
  "opacity": 40,
  "overlay": 70
}
```

---

### 5. `brand` - App Branding

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"brand"` |
| `name` | string | ✅ | `"FC Clubs Stats"` | App name |
| `tagline` | string | ❌ | `"Free on App Store"` | CTA text |

```json
{
  "contentType": "brand",
  "name": "FC Clubs Stats",
  "tagline": "Free on App Store"
}
```

---

### 6. `callout` - Large Text

| Field | Type | Required | Default | Values |
|-------|------|----------|---------|--------|
| `contentType` | string | ✅ | - | `"callout"` |
| `title` | string | ✅ | `""` | Large text |
| `titleStyle` | string | ❌ | `"white"` | See [Text Styles](#text-styles) |

```json
{
  "contentType": "callout",
  "title": "Every Match.\\nEvery Stat.",
  "titleStyle": "gradient-blue"
}
```

---

### 7. `spacer` - Empty Box

| Field | Type | Required | Default |
|-------|------|----------|---------|
| `contentType` | string | ✅ | - |

```json
{
  "contentType": "spacer"
}
```

---

## Style Reference

### Text Styles
For `titleStyle` field:

| Value | Description |
|-------|-------------|
| `white` | White text (default) |
| `gradient-blue` | Blue→Green gradient |
| `gradient-green` | Green→Lime gradient |
| `gradient-pink` | Pink→Red gradient |
| `gradient-gold` | Gold→Orange gradient |
| `neon-blue` | Blue with glow |
| `neon-green` | Green with glow |
| `outline` | White stroke, transparent fill |
| `heavy-shadow` | Strong drop shadow |
| `3d` | 3D depth effect |
| `retro` | Retro pop style |

### Stat Styles
For `style` field in `highlight`:

**Solid Colors:**
| Value | Hex |
|-------|-----|
| `green` | #42FEC2 |
| `blue` | #3BADF7 |
| `pink` | #F73B97 |
| `gold` | #FEC242 |
| `white` | #FFFFFF |

**Gradients:**
| Value | Colors |
|-------|--------|
| `gradient-blue` | #3BADF7 → #42FEC2 |
| `gradient-green` | #42FEC2 → #A8FF78 |
| `gradient-pink` | #E36BD9 → #FF6B6B |
| `gradient-gold` | #FFC254 → #FF8C00 |

**Effects:**
| Value | Effect |
|-------|--------|
| `neon-blue` | Blue with glow |
| `neon-green` | Green with glow |
| `outline` | White stroke |
| `heavy-shadow` | Strong shadow |
| `3d` | 3D depth |

### Formats
| Value | Dimensions | Best For |
|-------|------------|----------|
| `ig-square` | 1080×1080 | Instagram, LinkedIn, X |
| `ig-portrait` | 1080×1350 | Instagram Feed |
| `ig-story` | 1080×1920 | Stories, TikTok |
| `li-landscape` | 1200×626 | LinkedIn Articles |
| `x-landscape` | 1600×900 | X (Twitter), YouTube |

---

## Asset Reference

### Icons
| Value | Name |
|-------|------|
| `""` | None |
| `⚡` | Lightning |
| `🎯` | Target |
| `🔥` | Fire |
| `⭐` | Star |
| `🏆` | Trophy |
| `📊` | Chart |
| `🤖` | AI |
| `📱` | Phone |
| `🎮` | Gaming |
| `⚽` | Football |
| `🛡️` | Shield |
| `👁️` | Eye |

### Screenshots
**iPhone:**
- `/internal-assets/screenshots/iphone-dashboard.png`
- `/internal-assets/screenshots/iphone-club.png`
- `/internal-assets/screenshots/iphone-matches.png`
- `/internal-assets/screenshots/iphone-scout.png`
- `/internal-assets/screenshots/iphone-sessions.png`
- `/internal-assets/screenshots/iphone-welcome.png`

**Widgets:**
- `/internal-assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png`
- `/internal-assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.28.png`

**iPad:**
- `/internal-assets/screenshots/ipad-dashboard.png`
- `/internal-assets/screenshots/ipad-welcome.png`

---

## Preset Examples

### App Overview Preset
```json
{
  "version": "19",
  "format": "ig-square",
  "hero": {
    "contentType": "hero-shot",
    "title": "Your Club.\\nYour Stats.",
    "titleStyle": "white",
    "image": "/internal-assets/screenshots/iphone-dashboard.png",
    "zoom": 115,
    "posX": 50,
    "posY": 25,
    "opacity": 65,
    "overlay": 60
  },
  "gallery": {
    "contentType": "gallery",
    "image": "/internal-assets/screenshots/iphone-matches.png",
    "title": "",
    "titleStyle": "white",
    "zoom": 110,
    "posX": 50,
    "posY": 20,
    "opacity": 90,
    "overlay": 30
  },
  "stat1": {
    "contentType": "highlight",
    "value": "∞",
    "label": "Matches",
    "tagline": "Every game saved forever",
    "style": "green"
  },
  "stat2": {
    "contentType": "highlight",
    "value": "AI",
    "label": "Predictions",
    "tagline": "Win probability before kickoff",
    "style": "blue"
  },
  "feature": {
    "contentType": "feature",
    "title": "Scout Any Club",
    "description": "Research opponents before you play",
    "icon": "🎯",
    "image": "/internal-assets/screenshots/iphone-scout.png",
    "zoom": 100,
    "posX": 50,
    "posY": 50,
    "opacity": 40,
    "overlay": 70
  },
  "brand": {
    "contentType": "brand",
    "name": "FC Clubs Stats",
    "tagline": "Free on App Store"
  }
}
```
