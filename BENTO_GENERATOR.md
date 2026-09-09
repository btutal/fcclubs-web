# Bento Generator v20 — preset and state reference

This guide describes the current state exported by `getCurrentState()` and read
by `applyStateData()` in [src/bento_generator.js](src/bento_generator.js).
The generator is available at `/bento_generator.html` during local Vite
development; it is not an input in the current [production build](vite.config.js).

## Authoring contract

Use the string `"20"` for `version`, a supported `format`, a `background`, and
all six slot objects. Saving a preset or browser autosave exports this shape.
Missing fields can reset controls to defaults; the importer is not a strict
schema validator.

| Slot | `contentType` | Fields |
| --- | --- | --- |
| `hero` | `hero-shot` | `title` object and `image` object |
| `gallery` | `gallery` | `title` object and `image` object |
| `stat1`, `stat2` | `highlight` | String `value`, `label`, `tagline`, `style` |
| `feature` | `feature` | String `title`, `description`, `icon`; `image` object |
| `brand` | `brand` | String `name`, `tagline` |

The editor has these fixed slots. `contentType` records their type; changing it
alone does not turn a slot into another renderer. The old guide's `callout` and
`spacer` examples are not supported authoring options in the current editor.

### Titles and images

Hero/gallery titles use `title.content` and `title.style`. The feature title
remains a string. Use a JSON newline escape (`\n`) inside text for a line break.

All three image slots use this structure:

```json
{
  "src": "/internal-assets/screenshots/iphone-dashboard.png",
  "position": { "x": 50, "y": 50 },
  "zoom": 100,
  "opacity": 65,
  "overlay": 60
}
```

`src` is a screenshot path or a custom image value provided by the editor.
The feature image can be empty. Position, zoom, opacity, and overlay are numeric
control values, not pixel coordinates. The current implementation uses `||`
fallbacks for numeric fields, so zero may become a default when state is loaded
or saved; do not assume a zero-valued preset round-trips unchanged.

| Default | Hero | Gallery | Feature |
| --- | --- | --- | --- |
| Position x/y | 50/50 | 50/50 | 50/50 |
| Zoom | 100 | 100 | 100 |
| Opacity | 65 | 90 | 40 |
| Overlay | 60 | 30 | 70 |

Stat styles default to `green` for stat1 and `pink` for stat2. Hero/gallery title
styles default to `white`. Brand defaults are `FC Clubs Stats` and
`Free on App Store`; use campaign-appropriate approved copy when authoring.

## Complete v20 example

```json
{
  "version": "20",
  "format": "ig-square",
  "background": "deep-ocean",
  "hero": {
    "contentType": "hero-shot",
    "title": { "content": "Your Club.\nYour Stats.", "style": "white" },
    "image": {
      "src": "/internal-assets/screenshots/iphone-dashboard.png",
      "position": { "x": 50, "y": 25 },
      "zoom": 115,
      "opacity": 65,
      "overlay": 60
    }
  },
  "gallery": {
    "contentType": "gallery",
    "title": { "content": "Match history", "style": "white" },
    "image": {
      "src": "/internal-assets/screenshots/iphone-matches.png",
      "position": { "x": 50, "y": 20 },
      "zoom": 110,
      "opacity": 90,
      "overlay": 30
    }
  },
  "stat1": {
    "contentType": "highlight",
    "value": "∞",
    "label": "Matches",
    "tagline": "Your saved match history",
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
    "image": {
      "src": "/internal-assets/screenshots/iphone-scout.png",
      "position": { "x": 50, "y": 50 },
      "zoom": 100,
      "opacity": 40,
      "overlay": 70
    }
  },
  "brand": {
    "contentType": "brand",
    "name": "FC Clubs Stats",
    "tagline": "Free on App Store"
  }
}
```

## Formats and styles

Use the options exposed by [bento_generator.html](bento_generator.html) and
[src/bento_generator.css](src/bento_generator.css); keep those controls and this
reference aligned when adding an option.

| Format | Dimensions |
| --- | --- |
| `ig-square` | 1080 × 1080 |
| `ig-portrait` | 1080 × 1350 |
| `ig-story` | 1080 × 1920 |
| `li-landscape` | 1200 × 626 |
| `x-landscape` | 1600 × 900 |

- Backgrounds: `deep-ocean`, `midnight`, `electric-blue`, `neon-teal`, `ember`, `solid-dark`.
- Hero/gallery title styles: `white`, `gradient-blue`, `gradient-green`, `gradient-pink`, `gradient-gold`, `neon-blue`, `neon-green`, `outline`, `heavy-shadow`, `3d`, `retro`.
- Stat styles: solid `green`, `blue`, `pink`, `gold`, `white`; the four gradients above; `neon-blue`, `neon-green`, `outline`, `heavy-shadow`, `3d`.
- Feature icons: the editor's emoji choices or empty string for none. Use the current picker rather than inventing an icon identifier.

Layout selection changes canvas classes but is not included in the v20 JSON
returned by `getCurrentState()`. A saved preset does not preserve that selection.

## Assets and preset files

`SCREENSHOTS` in [the generator source](src/bento_generator.js) owns the selectable
asset list. It includes the v1.1.0 screenshot set and legacy iPhone, iPad, and
widget images under `/internal-assets/screenshots/`. Confirm local asset
availability when preparing exports; these development assets are not proof of
current shipped app behavior.

`PRESET_FILES` in the same source owns the built-in preset paths under
`src/presets/`. Adding a preset requires registering its path and an appropriate
selector option. Author new files as v20; use the complete example above or a
fresh editor export as the starting point.

## Legacy autosave compatibility

Browser autosave restoration (`restoreFromLocalStorage`) migrates unversioned
flat state to v19 and then to v20, or v19 directly to v20.

| v19 field | v20 field |
| --- | --- |
| `hero.title`, `gallery.title` | respective `title.content` |
| `hero.titleStyle`, `gallery.titleStyle` | respective `title.style` |
| `hero.image`, `gallery.image`, `feature.image` strings | respective `image.src` |
| Top-level slot `posX`, `posY` | respective `image.position.x`, `image.position.y` |
| Top-level slot `zoom`, `opacity`, `overlay` | respective `image.zoom`, `image.opacity`, `image.overlay` |
| Feature text, stat fields, brand fields | remain flat within their slots |

The JSON file-import handler and built-in preset loader do **not** run that
migration chain. Convert legacy files to the documented v20 shape before import;
changing only the version string is insufficient. Keep migration behavior when
changing the editor, but do not use the legacy shape for new presets.

## Verification by change

- Documentation edits: validate JSON examples and compare their fields with the serializer/importer; no renderer change is implied.
- Preset edits: load the file in the local editor, inspect its six slots, save/reload it, and check the intended export.
- Generator layout/export changes: check all five formats, image loading, text clipping, PNG output, save/import, and autosave compatibility. Run relevant website tests/build; the public build alone does not exercise this excluded development tool.
