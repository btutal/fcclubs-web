/**
 * Bento Generator v19 - Nested JSON Schema with contentType per slot
 * 
 * Features:
 * - Export to PNG with proper image rendering
 * - Copy to clipboard for quick sharing
 * - Autosave to localStorage (auto-restores on reload)
 * - Keyboard shortcuts: Cmd+E, Cmd+S, Cmd+Shift+C, Cmd+Z, Cmd+Shift+Z, ?
 * - Multiple formats: Instagram, LinkedIn, Twitter/X
 * - Icon/emoji selector for feature box
 * - Image zoom, position, opacity, and overlay controls
 * - Collapsible control sections
 * - Reset to default per section
 * - Multi-format export (all at once)
 * - Custom image upload via drag & drop
 * - Centralized screenshot list
 * - Undo/Redo support
 * - More text styles (outline, shadow, 3D)
 * - Preset thumbnails
 * - Loading states for export
 */

// Undo/Redo history
const historyStack = [];
let historyPointer = -1;
const MAX_HISTORY = 50;

function pushHistory() {
    // Remove any redo states ahead of current pointer
    if (historyPointer < historyStack.length - 1) {
        historyStack.splice(historyPointer + 1);
    }
    
    const state = getCurrentState();
    historyStack.push(JSON.stringify(state));
    
    // Limit history size
    if (historyStack.length > MAX_HISTORY) {
        historyStack.shift();
    } else {
        historyPointer++;
    }
}

function undo() {
    if (historyPointer > 0) {
        historyPointer--;
        const state = JSON.parse(historyStack[historyPointer]);
        applyStateData(state, true); // true = skip history push
        showToast('↩️ Undo');
    }
}

function redo() {
    if (historyPointer < historyStack.length - 1) {
        historyPointer++;
        const state = JSON.parse(historyStack[historyPointer]);
        applyStateData(state, true);
        showToast('↪️ Redo');
    }
}

// Centralized screenshot list - single source of truth
const SCREENSHOTS = [
    { group: 'iPhone', items: [
        { value: '/assets/screenshots/iphone-dashboard.png', label: 'Dashboard' },
        { value: '/assets/screenshots/iphone-club.png', label: 'Club Details' },
        { value: '/assets/screenshots/iphone-matches.png', label: 'Matches' },
        { value: '/assets/screenshots/iphone-scout.png', label: 'Scout Mode' },
        { value: '/assets/screenshots/iphone-sessions.png', label: 'Sessions' },
        { value: '/assets/screenshots/iphone-welcome.png', label: 'Welcome' },
    ]},
    { group: 'Widgets', items: [
        { value: '/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png', label: 'Widget 1' },
        { value: '/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.28.png', label: 'Widget 2' },
    ]},
    { group: 'iPad', items: [
        { value: '/assets/screenshots/ipad-dashboard.png', label: 'iPad Dashboard' },
        { value: '/assets/screenshots/ipad-welcome.png', label: 'iPad Welcome' },
    ]},
];

// Populate a select element with screenshots
function populateScreenshotSelect(selectEl, includeNone = false) {
    selectEl.innerHTML = '';
    if (includeNone) {
        const opt = document.createElement('option');
        opt.value = '';
        opt.textContent = 'None (Gradient only)';
        selectEl.appendChild(opt);
    }
    SCREENSHOTS.forEach(group => {
        const optgroup = document.createElement('optgroup');
        optgroup.label = group.group;
        group.items.forEach(item => {
            const opt = document.createElement('option');
            opt.value = item.value;
            opt.textContent = item.label;
            optgroup.appendChild(opt);
        });
        selectEl.appendChild(optgroup);
    });
}

const els = {
    canvas: document.getElementById('bentoCanvas'),
    formatSelect: document.getElementById('formatSelect'),
    themeSelect: document.getElementById('themeSelect'),
    exportBtn: document.getElementById('exportBtn'),
    copyBtn: document.getElementById('copyBtn'),
    saveBtn: document.getElementById('saveBtn'),
    bgPresetSelect: document.getElementById('bgPresetSelect'),
    toast: document.getElementById('toast'),
    
    // Hero
    inputHeroTitle: document.getElementById('inputHeroTitle'),
    selectHeroImg: document.getElementById('selectHeroImg'),
    selectTextStyle: document.getElementById('selectTextStyle'),
    inputHeroZoom: document.getElementById('inputHeroZoom'),
    inputHeroPosX: document.getElementById('inputHeroPosX'),
    inputHeroPosY: document.getElementById('inputHeroPosY'),
    zoomHeroVal: document.getElementById('zoomHeroVal'),
    inputHeroOpacity: document.getElementById('inputHeroOpacity'),
    heroOpacityVal: document.getElementById('heroOpacityVal'),
    inputHeroOverlay: document.getElementById('inputHeroOverlay'),
    heroOverlayVal: document.getElementById('heroOverlayVal'),
    
    // Secondary
    selectImg2: document.getElementById('selectImg2'),
    inputImg2Zoom: document.getElementById('inputImg2Zoom'),
    inputImg2PosX: document.getElementById('inputImg2PosX'),
    inputImg2PosY: document.getElementById('inputImg2PosY'),
    inputImg2Title: document.getElementById('inputImg2Title'),
    selectImg2TitleStyle: document.getElementById('selectImg2TitleStyle'),
    zoomImg2Val: document.getElementById('zoomImg2Val'),
    inputImg2Opacity: document.getElementById('inputImg2Opacity'),
    img2OpacityVal: document.getElementById('img2OpacityVal'),
    inputImg2Overlay: document.getElementById('inputImg2Overlay'),
    img2OverlayVal: document.getElementById('img2OverlayVal'),
    
    // Stats
    inputStat1Value: document.getElementById('inputStat1Value'),
    inputStat1Label: document.getElementById('inputStat1Label'),
    inputStat1Desc: document.getElementById('inputStat1Desc'),
    selectStat1Style: document.getElementById('selectStat1Style'),
    inputStat2Value: document.getElementById('inputStat2Value'),
    inputStat2Label: document.getElementById('inputStat2Label'),
    inputStat2Desc: document.getElementById('inputStat2Desc'),
    selectStat2Style: document.getElementById('selectStat2Style'),
    
    // Feature
    inputFeatTitle: document.getElementById('inputFeatTitle'),
    inputFeatDesc: document.getElementById('inputFeatDesc'),
    selectFeatImg: document.getElementById('selectFeatImg'),
    inputFeatZoom: document.getElementById('inputFeatZoom'),
    inputFeatPosX: document.getElementById('inputFeatPosX'),
    inputFeatPosY: document.getElementById('inputFeatPosY'),
    zoomFeatVal: document.getElementById('zoomFeatVal'),
    inputFeatOpacity: document.getElementById('inputFeatOpacity'),
    featOpacityVal: document.getElementById('featOpacityVal'),
    inputFeatOverlay: document.getElementById('inputFeatOverlay'),
    featOverlayVal: document.getElementById('featOverlayVal'),
    selectFeatIcon: document.getElementById('selectFeatIcon'),
    clearFeatIcon: document.getElementById('clearFeatIcon'),
    dispFeatIcon: document.querySelector('.feature-icon'),
    
    // Brand
    inputBrandName: document.getElementById('inputBrandName'),
    inputBrandTagline: document.getElementById('inputBrandTagline'),
    dispBrandName: document.querySelector('.brand-name'),
    dispBrandTagline: document.querySelector('.brand-tagline'),
    
    // Display elements
    dispHeroTitle: document.getElementById('dispHeroTitle'),
    dispHeroImg: document.getElementById('dispHeroImg'),
    dispImg2: document.getElementById('dispImg2'),
    dispImg2Title: document.getElementById('dispImg2Title'),
    dispStat1Value: document.getElementById('dispStat1Value'),
    dispStat1Label: document.getElementById('dispStat1Label'),
    dispStat1Desc: document.getElementById('dispStat1Desc'),
    dispStat2Value: document.getElementById('dispStat2Value'),
    dispStat2Label: document.getElementById('dispStat2Label'),
    dispStat2Desc: document.getElementById('dispStat2Desc'),
    dispFeatTitle: document.getElementById('dispFeatTitle'),
    dispFeatDesc: document.getElementById('dispFeatDesc'),
    dispFeatImg: document.getElementById('dispFeatImg'),
    featGradient: document.querySelector('.feature-gradient'),
    heroGradient: document.querySelector('.hero-gradient'),
    img2Gradient: document.querySelector('.device-gradient'),
    heroTextOverlay: document.querySelector('.hero-text-overlay'),
    img2TextOverlay: document.querySelector('.img2-text-overlay'),
    boxStat1: document.querySelector('.box-stat-1'),
    boxStat2: document.querySelector('.box-stat-2'),
};

const PRESETS = {
    // OVERVIEW: First impression - Show app breadth
    overview: {
        version: "19",
        hero: {
            contentType: "hero-shot",
            title: "Your Club.\nYour Stats.",
            titleStyle: "white",
            image: "/assets/screenshots/iphone-dashboard.png",
            zoom: 115,
            posX: 50,
            posY: 25,
            opacity: 65,
            overlay: 60
        },
        gallery: {
            contentType: "gallery",
            image: "/assets/screenshots/iphone-matches.png",
            title: "",
            titleStyle: "white",
            zoom: 110,
            posX: 50,
            posY: 20,
            opacity: 90,
            overlay: 30
        },
        stat1: {
            contentType: "highlight",
            value: "∞",
            label: "Matches",
            tagline: "Every game saved forever",
            style: "green"
        },
        stat2: {
            contentType: "highlight",
            value: "AI",
            label: "Predictions",
            tagline: "Win probability before kickoff",
            style: "blue"
        },
        feature: {
            contentType: "feature",
            title: "Scout Any Club",
            description: "Research opponents before you play",
            icon: "🎯",
            image: "/assets/screenshots/iphone-scout.png",
            zoom: 100,
            posX: 50,
            posY: 50,
            opacity: 40,
            overlay: 70
        },
        brand: {
            contentType: "brand",
            name: "FC Clubs Stats",
            tagline: "Free on App Store"
        }
    },
    
    // V102: Scout Mode Focus
    v102: {
        version: "19",
        hero: {
            contentType: "hero-shot",
            title: "Know Your\nOpponent.",
            titleStyle: "gradient-blue",
            image: "/assets/screenshots/iphone-scout.png",
            zoom: 115,
            posX: 50,
            posY: 20,
            opacity: 65,
            overlay: 60
        },
        gallery: {
            contentType: "gallery",
            image: "/assets/screenshots/iphone-club.png",
            title: "",
            titleStyle: "gradient-blue",
            zoom: 110,
            posX: 50,
            posY: 15,
            opacity: 90,
            overlay: 30
        },
        stat1: {
            contentType: "highlight",
            value: "Any",
            label: "Club",
            tagline: "Search millions of players",
            style: "blue"
        },
        stat2: {
            contentType: "highlight",
            value: "H2H",
            label: "History",
            tagline: "See your past matchups",
            style: "gold"
        },
        feature: {
            contentType: "feature",
            title: "Full Player Stats",
            description: "Goals, assists, rating & more",
            icon: "📊",
            image: "/assets/screenshots/iphone-dashboard.png",
            zoom: 100,
            posX: 50,
            posY: 50,
            opacity: 40,
            overlay: 70
        },
        brand: {
            contentType: "brand",
            name: "FC Clubs Stats",
            tagline: "Free on App Store"
        }
    },
    
    // V103: Widgets & AI Focus - v1.0.3 Release
    v103: {
        version: "19",
        hero: {
            contentType: "hero-shot",
            title: "Stats at\na Glance.\nw/ Widgets.",
            titleStyle: "neon-green",
            image: "/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png",
            zoom: 100,
            posX: 50,
            posY: 30,
            opacity: 65,
            overlay: 60
        },
        gallery: {
            contentType: "gallery",
            image: "/assets/screenshots/iphone-scout.png",
            title: "",
            titleStyle: "neon-green",
            zoom: 110,
            posX: 50,
            posY: 20,
            opacity: 90,
            overlay: 30
        },
        stat1: {
            contentType: "highlight",
            value: "AI",
            label: "MATCH FORECAST",
            tagline: "Know Your Odds",
            style: "green"
        },
        stat2: {
            contentType: "highlight",
            value: "Scout",
            label: "OPPONENTS",
            tagline: "Get Ready for the Match",
            style: "blue"
        },
        feature: {
            contentType: "feature",
            title: "Scout Report",
            description: "Full tactical breakdown before kickoff",
            icon: "🎯",
            image: "/assets/screenshots/iphone-scout.png",
            zoom: 110,
            posX: 50,
            posY: 30,
            opacity: 40,
            overlay: 70
        },
        brand: {
            contentType: "brand",
            name: "FC Clubs Stats",
            tagline: "Free on App Store"
        }
    }
};

const DEFAULTS = {
    hero: {
        inputHeroTitle: "Your Headline\nGoes Here",
        selectTextStyle: "white",
        selectHeroImg: SCREENSHOTS[0].items[0].value,
        inputHeroZoom: 100,
        inputHeroPosX: 50,
        inputHeroPosY: 50,
        inputHeroOpacity: 100,
        inputHeroOverlay: 50
    },
    img2: {
        selectImg2: SCREENSHOTS[0].items[2].value,
        inputImg2Zoom: 100,
        inputImg2PosX: 50,
        inputImg2PosY: 50,
        inputImg2Title: "",
        selectImg2TitleStyle: "white",
        inputImg2Opacity: 100,
        inputImg2Overlay: 30
    },
    stats: {
        inputStat1Value: "100",
        inputStat1Label: "Label",
        inputStat1Desc: "Description",
        selectStat1Style: "green",
        inputStat2Value: "200",
        inputStat2Label: "Label",
        inputStat2Desc: "Description",
        selectStat2Style: "blue"
    },
    feature: {
        inputFeatTitle: "Feature Title",
        inputFeatDesc: "Feature description goes here",
        selectFeatImg: SCREENSHOTS[0].items[3].value,
        inputFeatZoom: 100,
        inputFeatPosX: 50,
        inputFeatPosY: 50,
        inputFeatOpacity: 40,
        inputFeatOverlay: 70,
        selectFeatIcon: "🚀"
    },
    brand: {
        inputBrandName: "FC Clubs Stats",
        inputBrandTagline: "Free on App Store"
    }
};

function init() {
    // Populate screenshot selects from centralized list
    populateScreenshotSelect(els.selectHeroImg);
    populateScreenshotSelect(els.selectImg2);
    populateScreenshotSelect(els.selectFeatImg, true); // Include "None" option
    
    // Setup collapsible sections
    setupCollapsibleSections();
    
    // Setup custom image drop zones
    setupImageDropZones();
    
    // Setup visual text style selectors (for ALL text style dropdowns)
    setupVisualTextSelector(els.selectTextStyle, 'heroStyleGrid');
    setupVisualTextSelector(els.selectImg2TitleStyle, 'img2StyleGrid');
    setupVisualTextSelector(els.selectStat1Style, 'stat1StyleGrid');
    setupVisualTextSelector(els.selectStat2Style, 'stat2StyleGrid');
    
    // Setup visual icon picker
    setupIconPicker(els.selectFeatIcon, 'featIconGrid');
    
    // Setup format picker overlay (only show if first visit)
    setupFormatPicker();
    
    bindEvents();
    restoreFromLocalStorage() || setTheme('overview');
    updateScale();
    window.addEventListener('resize', updateScale);
    bindKeyboardShortcuts();
}

// Format Picker Overlay
function setupFormatPicker() {
    const overlay = document.getElementById('formatPicker');
    const formatCards = document.querySelectorAll('.format-card');
    const bgBtns = document.querySelectorAll('.bg-btn');
    
    if (!overlay) return;
    
    // Check if we should show the picker (first visit or no format selected)
    const hasVisited = localStorage.getItem('bentoGenerator_hasVisited');
    if (hasVisited) {
        overlay.classList.add('hidden');
    }
    
    // Always set up event listeners (for restart button reopening)
    formatCards.forEach(card => {
        card.addEventListener('click', () => {
            formatCards.forEach(c => c.classList.remove('selected'));
            card.classList.add('selected');
            const selectedFormat = card.dataset.format;
            
            // Apply format and dismiss
            setTimeout(() => {
                applyFormatSelection(selectedFormat);
                overlay.classList.add('hidden');
                localStorage.setItem('bentoGenerator_hasVisited', 'true');
            }, 300);
        });
    });
}

function applyFormatSelection(format, bg) {
    // Apply format
    els.formatSelect.value = format;
    els.canvas.className = `bento-canvas format-${format}`;
    
    setTimeout(updateScale, 50);
}

// Visual Text Style Selector - Reusable for any style select
function setupVisualTextSelector(select, gridId) {
    if (!select) return;
    
    // Create container
    const container = document.createElement('div');
    container.className = 'style-grid';
    container.id = gridId;
    
    // Hide native select
    select.style.display = 'none';
    select.parentNode.appendChild(container);
    
    // Create buttons from options
    Array.from(select.options).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = `style-btn text-style-${opt.value}`;
        btn.dataset.value = opt.value;
        btn.title = opt.text;
        btn.innerHTML = '<span>Ag</span>';
        
        if (select.value === opt.value) btn.classList.add('active');
        
        btn.addEventListener('click', () => {
            select.value = opt.value;
            container.querySelectorAll('.style-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyToCanvas();
        });
        
        container.appendChild(btn);
    });
}

// Helper to sync a visual grid's active state
function syncVisualGrid(gridId, activeValue) {
    const grid = document.getElementById(gridId);
    if (!grid) return;
    grid.querySelectorAll('.style-btn, .color-btn, .icon-btn').forEach(btn => {
        btn.classList.toggle('active', btn.dataset.value === activeValue);
    });
}

// Color Picker - Visual circles for stat colors
const COLOR_MAP = {
    green: '#42FEC2',
    blue: '#3BADF7',
    pink: '#F73B97',
    gold: '#FEC242',
    white: '#FFFFFF'
};

function setupColorPicker(select, gridId) {
    if (!select) return;
    
    const container = document.createElement('div');
    container.className = 'color-grid';
    container.id = gridId;
    
    select.style.display = 'none';
    select.parentNode.appendChild(container);
    
    Array.from(select.options).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'color-btn';
        btn.dataset.value = opt.value;
        btn.title = opt.text;
        btn.style.background = COLOR_MAP[opt.value] || '#888';
        
        if (select.value === opt.value) btn.classList.add('active');
        
        btn.addEventListener('click', () => {
            select.value = opt.value;
            container.querySelectorAll('.color-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyToCanvas();
        });
        
        container.appendChild(btn);
    });
}

// Icon Picker - Emoji grid
function setupIconPicker(select, gridId) {
    if (!select) return;
    
    const container = document.createElement('div');
    container.className = 'icon-grid';
    container.id = gridId;
    
    select.style.display = 'none';
    // Find and hide the clear button if it exists
    const clearBtn = document.getElementById('clearFeatIcon');
    if (clearBtn) clearBtn.style.display = 'none';
    
    select.parentNode.appendChild(container);
    
    Array.from(select.options).forEach(opt => {
        const btn = document.createElement('button');
        btn.className = 'icon-btn';
        btn.dataset.value = opt.value;
        btn.title = opt.text;
        btn.textContent = opt.value || '∅'; // Show empty symbol for "None"
        
        if (select.value === opt.value) btn.classList.add('active');
        
        btn.addEventListener('click', () => {
            select.value = opt.value;
            container.querySelectorAll('.icon-btn').forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            applyToCanvas();
        });
        
        container.appendChild(btn);
    });
}

// Collapsible sections toggle + Reset Buttons
function setupCollapsibleSections() {
    const sectionMap = {
        'Hero': 'hero',
        'Secondary': 'img2',
        'Stats': 'stats',
        'Brand': 'brand',
        'Feature': 'feature'
    };

    const titles = document.querySelectorAll('.section-title');
    titles.forEach((title, index) => {
        title.style.cursor = 'pointer';
        
        // Collapse all sections except the first one on load
        const section = title.closest('.control-section');
        if (index > 0) {
            section.classList.add('collapsed');
        }
        
        // Create Reset Button
        const sectionName = title.textContent.trim();
        const defaultKey = sectionMap[sectionName];
        
        if (defaultKey) {
            const resetBtn = document.createElement('button');
            resetBtn.textContent = '↺';
            resetBtn.title = 'Reset Section to Default';
            resetBtn.className = 'section-reset-btn';
            resetBtn.addEventListener('click', (e) => {
                e.stopPropagation(); // Don't collapse
                if (confirm(`Reset ${sectionName} to defaults?`)) {
                    resetSection(defaultKey);
                    pushHistory();
                }
            });
            title.appendChild(resetBtn);
        }

        title.addEventListener('click', () => {
            const section = title.closest('.control-section');
            section.classList.toggle('collapsed');
        });
    });
}

function resetSection(key) {
    const defaults = DEFAULTS[key];
    if (!defaults) return;
    
    Object.keys(defaults).forEach(elId => {
        if (els[elId]) {
            els[elId].value = defaults[elId];
            // Trigger change/input event if needed for some listeners, 
            // but mostly applyToCanvas reads directly.
        }
    });
    applyToCanvas();
    showToast(`↺ Reset ${key}`);
}

// Custom image drag & drop zones
function setupImageDropZones() {
    [els.selectHeroImg, els.selectImg2, els.selectFeatImg].forEach(select => {
        if (!select) return;
        const wrapper = select.closest('.control-group');
        if (!wrapper) return;
        
        wrapper.addEventListener('dragover', (e) => {
            e.preventDefault();
            wrapper.classList.add('drag-over');
        });
        
        wrapper.addEventListener('dragleave', () => {
            wrapper.classList.remove('drag-over');
        });
        
        wrapper.addEventListener('drop', (e) => {
            e.preventDefault();
            wrapper.classList.remove('drag-over');
            
            const file = e.dataTransfer.files[0];
            if (file && file.type.startsWith('image/')) {
                const reader = new FileReader();
                reader.onload = (event) => {
                    // Add custom option
                    const opt = document.createElement('option');
                    opt.value = event.target.result;
                    opt.textContent = `📁 ${file.name}`;
                    select.appendChild(opt);
                    select.value = event.target.result;
                    applyToCanvas();
                    showToast(`✅ Added: ${file.name}`);
                };
                reader.readAsDataURL(file);
            }
        });
    });
}

// Toast notification helper
function showToast(message) {
    if (els.toast) {
        els.toast.textContent = message;
        els.toast.classList.add('show');
        setTimeout(() => els.toast.classList.remove('show'), 2000);
    }
}

// Autosave to localStorage
function saveToLocalStorage() {
    const data = getCurrentState();
    localStorage.setItem('bentoGenerator_autosave', JSON.stringify(data));
}

function restoreFromLocalStorage() {
    try {
        const saved = localStorage.getItem('bentoGenerator_autosave');
        if (saved) {
            let data = JSON.parse(saved);
            
            // Migrate old flat format to v19 nested format
            if (!data.version || data.version !== "19") {
                console.log('Migrating localStorage from old format to v19...');
                data = migrateToV19(data);
                // Save migrated data
                localStorage.setItem('bentoGenerator_autosave', JSON.stringify(data));
            }
            
            applyStateData(data);
            return true;
        }
    } catch (e) {
        console.warn('Failed to restore autosave:', e);
        // Clear corrupted data
        localStorage.removeItem('bentoGenerator_autosave');
    }
    return false;
}

// Migrate old flat format to v19 nested format
function migrateToV19(old) {
    return {
        version: "19",
        format: old.format || "ig-square",
        hero: {
            contentType: "hero-shot",
            title: old.heroTitle || "",
            titleStyle: old.textStyle || "white",
            image: old.heroImg || "",
            zoom: parseFloat(old.heroZoom) || 100,
            posX: parseFloat(old.heroPosX) || 50,
            posY: parseFloat(old.heroPosY) || 50,
            opacity: parseFloat(old.heroOpacity) || 65,
            overlay: parseFloat(old.heroOverlay) || 60
        },
        gallery: {
            contentType: "gallery",
            image: old.img2 || "",
            title: old.img2Title || "",
            titleStyle: old.img2TitleStyle || "white",
            zoom: parseFloat(old.img2Zoom) || 100,
            posX: parseFloat(old.img2PosX) || 50,
            posY: parseFloat(old.img2PosY) || 50,
            opacity: parseFloat(old.img2Opacity) || 90,
            overlay: parseFloat(old.img2Overlay) || 30
        },
        stat1: {
            contentType: "highlight",
            value: old.stat1Value || "",
            label: old.stat1Label || "",
            tagline: old.stat1Desc || "",
            style: old.stat1Style || old.stat1Color || "green"
        },
        stat2: {
            contentType: "highlight",
            value: old.stat2Value || "",
            label: old.stat2Label || "",
            tagline: old.stat2Desc || "",
            style: old.stat2Style || old.stat2Color || "pink"
        },
        feature: {
            contentType: "feature",
            title: old.featTitle || "",
            description: old.featDesc || "",
            icon: old.featIcon || "",
            image: old.featImg || "",
            zoom: parseFloat(old.featZoom) || 100,
            posX: parseFloat(old.featPosX) || 50,
            posY: parseFloat(old.featPosY) || 50,
            opacity: parseFloat(old.featOpacity) || 40,
            overlay: parseFloat(old.featOverlay) || 70
        },
        brand: {
            contentType: "brand",
            name: old.brandName || "FC Clubs Stats",
            tagline: old.brandTagline || "Free on App Store"
        }
    };
}

function getCurrentState() {
    return {
        version: "19",
        format: els.formatSelect.value,
        hero: {
            contentType: "hero-shot",
            title: els.inputHeroTitle.value,
            titleStyle: els.selectTextStyle.value,
            image: els.selectHeroImg.value,
            zoom: parseFloat(els.inputHeroZoom.value) || 100,
            posX: parseFloat(els.inputHeroPosX.value) || 50,
            posY: parseFloat(els.inputHeroPosY.value) || 50,
            opacity: parseFloat(els.inputHeroOpacity.value) || 65,
            overlay: parseFloat(els.inputHeroOverlay.value) || 60
        },
        gallery: {
            contentType: "gallery",
            image: els.selectImg2.value,
            title: els.inputImg2Title.value,
            titleStyle: els.selectImg2TitleStyle.value,
            zoom: parseFloat(els.inputImg2Zoom.value) || 100,
            posX: parseFloat(els.inputImg2PosX.value) || 50,
            posY: parseFloat(els.inputImg2PosY.value) || 50,
            opacity: parseFloat(els.inputImg2Opacity.value) || 90,
            overlay: parseFloat(els.inputImg2Overlay.value) || 30
        },
        stat1: {
            contentType: "highlight",
            value: els.inputStat1Value.value,
            label: els.inputStat1Label.value,
            tagline: els.inputStat1Desc.value,
            style: els.selectStat1Style.value
        },
        stat2: {
            contentType: "highlight",
            value: els.inputStat2Value.value,
            label: els.inputStat2Label.value,
            tagline: els.inputStat2Desc.value,
            style: els.selectStat2Style.value
        },
        feature: {
            contentType: "feature",
            title: els.inputFeatTitle.value,
            description: els.inputFeatDesc.value,
            icon: els.selectFeatIcon.value,
            image: els.selectFeatImg.value,
            zoom: parseFloat(els.inputFeatZoom.value) || 100,
            posX: parseFloat(els.inputFeatPosX.value) || 50,
            posY: parseFloat(els.inputFeatPosY.value) || 50,
            opacity: parseFloat(els.inputFeatOpacity.value) || 40,
            overlay: parseFloat(els.inputFeatOverlay.value) || 70
        },
        brand: {
            contentType: "brand",
            name: els.inputBrandName.value,
            tagline: els.inputBrandTagline.value
        }
    };
}

function applyStateData(data, skipHistory = false) {
    if (!data) return;
    
    // Format
    if (data.format) {
        els.formatSelect.value = data.format;
        els.canvas.className = `bento-canvas format-${data.format}`;
    }
    
    // Hero (from data.hero)
    const hero = data.hero || {};
    els.inputHeroTitle.value = hero.title || '';
    els.selectTextStyle.value = hero.titleStyle || 'white';
    syncVisualGrid('heroStyleGrid', els.selectTextStyle.value);
    els.selectHeroImg.value = hero.image || '';
    els.inputHeroZoom.value = hero.zoom || 100;
    els.inputHeroPosX.value = hero.posX || 50;
    els.inputHeroPosY.value = hero.posY || 50;
    els.inputHeroOpacity.value = hero.opacity || 65;
    els.inputHeroOverlay.value = hero.overlay || 60;
    
    // Gallery (from data.gallery)
    const gallery = data.gallery || {};
    els.selectImg2.value = gallery.image || '';
    els.inputImg2Zoom.value = gallery.zoom || 100;
    els.inputImg2PosX.value = gallery.posX || 50;
    els.inputImg2PosY.value = gallery.posY || 50;
    els.inputImg2Opacity.value = gallery.opacity || 90;
    els.inputImg2Overlay.value = gallery.overlay || 30;
    els.inputImg2Title.value = gallery.title || '';
    els.selectImg2TitleStyle.value = gallery.titleStyle || 'white';
    syncVisualGrid('img2StyleGrid', els.selectImg2TitleStyle.value);
    
    // Stats (from data.stat1, data.stat2)
    const stat1 = data.stat1 || {};
    els.inputStat1Value.value = stat1.value || '';
    els.inputStat1Label.value = stat1.label || '';
    els.inputStat1Desc.value = stat1.tagline || '';
    els.selectStat1Style.value = stat1.style || 'green';
    syncVisualGrid('stat1StyleGrid', els.selectStat1Style.value);
    
    const stat2 = data.stat2 || {};
    els.inputStat2Value.value = stat2.value || '';
    els.inputStat2Label.value = stat2.label || '';
    els.inputStat2Desc.value = stat2.tagline || '';
    els.selectStat2Style.value = stat2.style || 'pink';
    syncVisualGrid('stat2StyleGrid', els.selectStat2Style.value);
    
    // Feature (from data.feature)
    const feature = data.feature || {};
    els.inputFeatTitle.value = feature.title || '';
    els.inputFeatDesc.value = feature.description || '';
    els.selectFeatImg.value = feature.image || '';
    els.inputFeatZoom.value = feature.zoom || 100;
    els.inputFeatPosX.value = feature.posX || 50;
    els.inputFeatPosY.value = feature.posY || 50;
    els.inputFeatOpacity.value = feature.opacity || 40;
    els.inputFeatOverlay.value = feature.overlay || 70;
    els.selectFeatIcon.value = feature.icon || '';
    syncVisualGrid('featIconGrid', els.selectFeatIcon.value);
    
    // Brand (from data.brand)
    const brand = data.brand || {};
    els.inputBrandName.value = brand.name || 'FC Clubs Stats';
    els.inputBrandTagline.value = brand.tagline || 'Free on App Store';
    
    applyToCanvas(skipHistory);
}

// Keyboard shortcuts
function bindKeyboardShortcuts() {
    document.addEventListener('keydown', (e) => {
        // Cmd/Ctrl + E = Export
        if ((e.metaKey || e.ctrlKey) && e.key === 'e') {
            e.preventDefault();
            els.exportBtn.click();
        }
        // Cmd/Ctrl + S = Save preset
        if ((e.metaKey || e.ctrlKey) && e.key === 's') {
            e.preventDefault();
            els.saveBtn.click();
        }
        // Cmd/Ctrl + Shift + C = Copy to clipboard
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'C') {
            e.preventDefault();
            els.copyBtn.click();
        }
        // Cmd/Ctrl + Z = Undo
        if ((e.metaKey || e.ctrlKey) && !e.shiftKey && e.key === 'z') {
            e.preventDefault();
            undo();
        }
        // Cmd/Ctrl + Shift + Z = Redo
        if ((e.metaKey || e.ctrlKey) && e.shiftKey && e.key === 'Z') {
            e.preventDefault();
            redo();
        }
        // ? = Toggle help overlay
        if (e.key === '?' || (e.shiftKey && e.key === '/')) {
            e.preventDefault();
            toggleHelpOverlay();
        }
        // Escape = Close help overlay
        if (e.key === 'Escape') {
            const help = document.getElementById('helpOverlay');
            if (help) help.classList.remove('show');
        }
    });
}

// Help overlay toggle
function toggleHelpOverlay() {
    let help = document.getElementById('helpOverlay');
    if (!help) {
        help = document.createElement('div');
        help.id = 'helpOverlay';
        help.className = 'help-overlay';
        help.innerHTML = `
            <div class="help-content">
                <h3>⌨️ Keyboard Shortcuts</h3>
                <div class="help-grid">
                    <kbd>⌘/Ctrl</kbd> + <kbd>E</kbd> <span>Export PNG</span>
                    <kbd>⌘/Ctrl</kbd> + <kbd>S</kbd> <span>Save Preset</span>
                    <kbd>⌘/Ctrl</kbd> + <kbd>⇧</kbd> + <kbd>C</kbd> <span>Copy to Clipboard</span>
                    <kbd>?</kbd> <span>Toggle this help</span>
                    <kbd>Esc</kbd> <span>Close overlays</span>
                </div>
                <h3 style="margin-top:16px;">💡 Tips</h3>
                <ul>
                    <li>Drag & drop images onto screenshot selectors</li>
                    <li>Click section titles to collapse/expand</li>
                    <li>Changes auto-save to browser storage</li>
                </ul>
                <button onclick="this.closest('.help-overlay').classList.remove('show')">Close</button>
            </div>
        `;
        document.body.appendChild(help);
    }
    help.classList.toggle('show');
}

function setTheme(key) {
    const data = PRESETS[key];
    if (!data) return;
    
    // Hero (from data.hero)
    const hero = data.hero || {};
    els.inputHeroTitle.value = hero.title || "";
    els.selectTextStyle.value = hero.titleStyle || "white";
    els.selectHeroImg.value = hero.image || "";
    els.inputHeroZoom.value = hero.zoom || 100;
    els.inputHeroPosX.value = hero.posX || 50;
    els.inputHeroPosY.value = hero.posY || 50;
    els.inputHeroOpacity.value = hero.opacity || 65;
    els.inputHeroOverlay.value = hero.overlay || 60;
    
    // Gallery (from data.gallery)
    const gallery = data.gallery || {};
    els.selectImg2.value = gallery.image || "";
    els.inputImg2Zoom.value = gallery.zoom || 100;
    els.inputImg2PosX.value = gallery.posX || 50;
    els.inputImg2PosY.value = gallery.posY || 50;
    els.inputImg2Opacity.value = gallery.opacity || 90;
    els.inputImg2Overlay.value = gallery.overlay || 30;
    els.inputImg2Title.value = gallery.title || "";
    els.selectImg2TitleStyle.value = gallery.titleStyle || "white";
    
    // Stats (from data.stat1, data.stat2)
    const stat1 = data.stat1 || {};
    els.inputStat1Value.value = stat1.value || "";
    els.inputStat1Label.value = stat1.label || "";
    els.inputStat1Desc.value = stat1.tagline || "";
    els.selectStat1Style.value = stat1.style || "green";
    
    const stat2 = data.stat2 || {};
    els.inputStat2Value.value = stat2.value || "";
    els.inputStat2Label.value = stat2.label || "";
    els.inputStat2Desc.value = stat2.tagline || "";
    els.selectStat2Style.value = stat2.style || "pink";
    
    // Feature (from data.feature)
    const feature = data.feature || {};
    els.inputFeatTitle.value = feature.title || "";
    els.inputFeatDesc.value = feature.description || "";
    els.selectFeatImg.value = feature.image || "";
    els.inputFeatZoom.value = feature.zoom || 100;
    els.inputFeatPosX.value = feature.posX || 50;
    els.inputFeatPosY.value = feature.posY || 50;
    els.inputFeatOpacity.value = feature.opacity || 40;
    els.inputFeatOverlay.value = feature.overlay || 70;
    els.selectFeatIcon.value = feature.icon || "";
    
    // Brand (from data.brand)
    const brand = data.brand || {};
    els.inputBrandName.value = brand.name || "FC Clubs Stats";
    els.inputBrandTagline.value = brand.tagline || "Free on App Store";
    
    applyToCanvas();
}

function applyToCanvas(skipHistory = false) {
    // Text content
    els.dispHeroTitle.innerHTML = els.inputHeroTitle.value.replace(/\n/g, '<br>');
    
    // Hero image - use background-image for html2canvas compatibility
    els.dispHeroImg.style.backgroundImage = `url('${els.selectHeroImg.value}')`;
    
    // Secondary image - use background-image for html2canvas compatibility
    els.dispImg2.style.backgroundImage = `url('${els.selectImg2.value}')`;
    els.dispImg2Title.textContent = els.inputImg2Title.value;
    
    els.dispStat1Value.textContent = els.inputStat1Value.value;
    els.dispStat1Label.textContent = els.inputStat1Label.value;
    els.dispStat1Desc.textContent = els.inputStat1Desc.value;
    
    els.dispStat2Value.textContent = els.inputStat2Value.value;
    els.dispStat2Label.textContent = els.inputStat2Label.value;
    els.dispStat2Desc.textContent = els.inputStat2Desc.value;
    
    // Brand
    if (els.dispBrandName) els.dispBrandName.textContent = els.inputBrandName.value;
    if (els.dispBrandTagline) els.dispBrandTagline.textContent = els.inputBrandTagline.value;
    
    els.dispFeatTitle.textContent = els.inputFeatTitle.value;
    els.dispFeatDesc.textContent = els.inputFeatDesc.value;
    
    // Feature Icon
    const featIcon = els.selectFeatIcon.value;
    if (els.dispFeatIcon) {
        els.dispFeatIcon.textContent = featIcon;
        els.dispFeatIcon.style.display = featIcon ? 'block' : 'none';
    }
    
    // Feature Image - use background-image for html2canvas compatibility
    const featImgSrc = els.selectFeatImg.value;
    if (featImgSrc) {
        els.dispFeatImg.style.backgroundImage = `url('${featImgSrc}')`;
        els.dispFeatImg.style.display = 'block';
        
        // Feature zoom and position
        const featZoom = parseFloat(els.inputFeatZoom.value) || 100;
        const featPosX = parseFloat(els.inputFeatPosX.value) || 50;
        const featPosY = parseFloat(els.inputFeatPosY.value) || 50;
        els.zoomFeatVal.textContent = featZoom;
        
        els.dispFeatImg.style.backgroundSize = `${featZoom}%`;
        els.dispFeatImg.style.backgroundPosition = `${featPosX}% ${featPosY}%`;
        
        // Feature image opacity
        const featOpacity = parseFloat(els.inputFeatOpacity.value) / 100;
        els.featOpacityVal.textContent = els.inputFeatOpacity.value;
        els.dispFeatImg.style.opacity = featOpacity;
    } else {
        els.dispFeatImg.style.display = 'none';
        els.dispFeatImg.style.backgroundImage = '';
    }
    
    // Feature overlay (gradient)
    const featOverlay = (parseFloat(els.inputFeatOverlay.value) || 70) / 100;
    els.featOverlayVal.textContent = els.inputFeatOverlay.value;
    if (els.featGradient) {
        els.featGradient.style.background = `linear-gradient(to top, rgba(0,0,0,${featOverlay}) 0%, rgba(0,0,0,${featOverlay * 0.6}) 100%)`;
    }
    
    // Hero text style
    const textStyle = els.selectTextStyle.value;
    els.heroTextOverlay.className = `hero-text-overlay text-style-${textStyle}`;
    
    // Img2 title style
    els.img2TextOverlay.className = `img2-text-overlay img2-title-style-${els.selectImg2TitleStyle.value}`;
    
    // Stat styles (unified - solid colors + gradients + effects)
    const stat1Style = els.selectStat1Style?.value || 'green';
    const stat2Style = els.selectStat2Style?.value || 'pink';
    els.boxStat1.className = `bento-box box-stat-1 stat-style-${stat1Style}`;
    els.boxStat2.className = `bento-box box-stat-2 stat-style-${stat2Style}`;
    
    // Hero zoom + position - use background-size and background-position
    const heroZoom = parseFloat(els.inputHeroZoom.value) || 100;
    const heroPosX = parseFloat(els.inputHeroPosX.value) || 50;
    const heroPosY = parseFloat(els.inputHeroPosY.value) || 50;
    els.zoomHeroVal.textContent = heroZoom;
    
    // Use background-size for zoom (percentage > 100 = zoomed in)
    els.dispHeroImg.style.backgroundSize = `${heroZoom}%`;
    els.dispHeroImg.style.backgroundPosition = `${heroPosX}% ${heroPosY}%`;
    
    // Hero opacity and overlay
    const heroOpacity = (parseFloat(els.inputHeroOpacity.value) || 65) / 100;
    const heroOverlay = (parseFloat(els.inputHeroOverlay.value) || 60) / 100;
    els.heroOpacityVal.textContent = els.inputHeroOpacity.value;
    els.heroOverlayVal.textContent = els.inputHeroOverlay.value;
    els.dispHeroImg.style.opacity = heroOpacity;
    if (els.heroGradient) {
        els.heroGradient.style.background = `linear-gradient(to top, rgba(0,0,0,${heroOverlay}) 0%, rgba(0,0,0,${heroOverlay * 0.3}) 50%, rgba(0,0,0,${heroOverlay * 0.5}) 100%)`;
    }
    
    // Img2 zoom + position - use background-size and background-position
    const img2Zoom = parseFloat(els.inputImg2Zoom.value) || 100;
    const img2PosX = parseFloat(els.inputImg2PosX.value) || 50;
    const img2PosY = parseFloat(els.inputImg2PosY.value) || 50;
    els.zoomImg2Val.textContent = img2Zoom;
    
    els.dispImg2.style.backgroundSize = `${img2Zoom}%`;
    els.dispImg2.style.backgroundPosition = `${img2PosX}% ${img2PosY}%`;
    
    // Img2 opacity and overlay
    const img2Opacity = (parseFloat(els.inputImg2Opacity.value) || 90) / 100;
    const img2Overlay = (parseFloat(els.inputImg2Overlay.value) || 30) / 100;
    els.img2OpacityVal.textContent = els.inputImg2Opacity.value;
    els.img2OverlayVal.textContent = els.inputImg2Overlay.value;
    els.dispImg2.style.opacity = img2Opacity;
    if (els.img2Gradient) {
        els.img2Gradient.style.background = `linear-gradient(to bottom, transparent 50%, rgba(0,0,0,${img2Overlay}) 100%)`;
    }
    
    // Autosave on every change
    saveToLocalStorage();
    
    // Push to history (unless restoring from undo/redo)
    if (!skipHistory) {
        pushHistory();
    }
}

function updateScale() {
    const canvas = els.canvas;
    const container = document.querySelector('.preview-stage');
    if (!canvas || !container) return;

    canvas.style.transform = 'none';
    
    console.log('DEBUG updateScale:', {
        format: canvas.className,
        canvasWidth: canvas.offsetWidth,
        canvasHeight: canvas.offsetHeight,
        containerWidth: container.clientWidth,
        containerHeight: container.clientHeight
    });
    
    const scale = Math.min(
        (container.clientWidth - 60) / canvas.offsetWidth,
        (container.clientHeight - 60) / canvas.offsetHeight,
        1
    );
    
    console.log('DEBUG scale:', scale);
    
    canvas.style.transform = `scale(${scale})`;
}

// Update layout guide to match selected format
function updateLayoutGuide(format) {
    const layoutGrid = document.querySelector('.layout-grid');
    if (!layoutGrid) return;
    
    // Simplified layouts matching actual CSS grid-template-areas
    // Using 6-column mini-grid to represent the actual 12-column layout
    const layouts = {
        // IG Square: H left half, B/I2/S1/S2/F stacked on right
        'ig-square': {
            areas: `"H H H B B B" "H H H I2 I2 I2" "H H H I2 I2 I2" "H H H S1 S1 S1" "H H H S2 S2 S2" "H H H F F F"`,
            rows: 6
        },
        // IG Portrait: B top full, H wide, I2 wide, S1/S2 side-by-side, F bottom
        'ig-portrait': {
            areas: `"B B B B B B" "H H H H H H" "H H H H H H" "I2 I2 I2 I2 I2 I2" "S1 S1 S1 S2 S2 S2" "F F F F F F"`,
            rows: 6
        },
        // IG Story: Same as portrait but taller proportions
        'ig-story': {
            areas: `"B B B B B B" "H H H H H H" "H H H H H H" "H H H H H H" "I2 I2 I2 I2 I2 I2" "I2 I2 I2 I2 I2 I2" "S1 S1 S1 S2 S2 S2" "F F F F F F"`,
            rows: 8
        },
        // X Square: Same as IG square but S1/S2 are taller
        'x-square': {
            areas: `"H H H B B B" "H H H I2 I2 I2" "H H H S1 S1 S1" "H H H S1 S1 S1" "H H H S2 S2 S2" "H H H S2 S2 S2" "H H H F F F"`,
            rows: 7
        },
        // X Landscape: H left (5/12), B top-right (7/12), I2 middle-right, S1/S2, F bottom
        'x-landscape': {
            areas: `"H H B B B B" "H H I2 I2 I2 I2" "H H I2 I2 I2 I2" "H H S1 S2 S2 S2" "H H F F F F"`,
            rows: 5
        },
        // LI Square: Same as IG square
        'li-square': {
            areas: `"H H H B B B" "H H H I2 I2 I2" "H H H S1 S1 S1" "H H H S1 S1 S1" "H H H S2 S2 S2" "H H H S2 S2 S2" "H H H F F F"`,
            rows: 7
        },
        // LI Portrait: H left, B/I2 top-right, S1/S2 mid, F bottom
        'li-portrait': {
            areas: `"H H B B I2 I2" "H H B B I2 I2" "H H S1 S1 S2 S2" "H H S1 S1 S2 S2" "H H F F F F"`,
            rows: 5
        },
        // LI Landscape: H left, B/I2 top-right, S1/S2/F bottom row
        'li-landscape': {
            areas: `"H H B B B B" "H H I2 I2 I2 I2" "S1 S2 S2 F F F"`,
            rows: 3
        }
    };
    
    const layout = layouts[format] || layouts['ig-square'];
    layoutGrid.style.gridTemplateAreas = layout.areas;
    layoutGrid.style.gridTemplateRows = `repeat(${layout.rows}, 1fr)`;
}

function bindEvents() {
    els.formatSelect.addEventListener('change', (e) => {
        els.canvas.className = `bento-canvas format-${e.target.value}`;
        updateLayoutGuide(e.target.value);
        setTimeout(updateScale, 50);
    });
    
    // Initialize layout guide on load
    updateLayoutGuide(els.formatSelect.value);
    
    els.themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
    
    // Help button
    const helpBtn = document.getElementById('helpBtn');
    if (helpBtn) {
        helpBtn.addEventListener('click', toggleHelpOverlay);
    }
    
    const liveInputs = [
        'inputHeroTitle', 'inputHeroZoom', 'inputHeroPosX', 'inputHeroPosY',
        'inputHeroOpacity', 'inputHeroOverlay',
        'inputImg2Zoom', 'inputImg2PosX', 'inputImg2PosY', 'inputImg2Title',
        'inputImg2Opacity', 'inputImg2Overlay',
        'inputStat1Value', 'inputStat1Label', 'inputStat1Desc',
        'inputStat2Value', 'inputStat2Label', 'inputStat2Desc',
        'inputFeatTitle', 'inputFeatDesc', 'inputFeatOpacity', 'inputFeatOverlay',
        'inputFeatZoom', 'inputFeatPosX', 'inputFeatPosY',
        'inputBrandName', 'inputBrandTagline'
    ];
    liveInputs.forEach(id => {
        if (els[id]) els[id].addEventListener('input', applyToCanvas);
    });
    
    els.selectHeroImg.addEventListener('change', applyToCanvas);
    els.selectImg2.addEventListener('change', applyToCanvas);
    els.selectTextStyle.addEventListener('change', applyToCanvas);
    els.selectStat1Style.addEventListener('change', applyToCanvas);
    els.selectStat2Style.addEventListener('change', applyToCanvas);
    els.selectImg2TitleStyle.addEventListener('change', applyToCanvas);
    els.selectFeatImg.addEventListener('change', applyToCanvas);
    els.selectFeatIcon.addEventListener('change', applyToCanvas);
    
    // Sidebar theme toggle
    const sidebarBgLight = document.getElementById('sidebarBgLight');
    const sidebarBgDark = document.getElementById('sidebarBgDark');
    
    if (sidebarBgLight && sidebarBgDark) {
        sidebarBgLight.addEventListener('click', () => {
            sidebarBgLight.classList.add('active');
            sidebarBgDark.classList.remove('active');
            document.body.classList.add('theme-light');
        });
        
        sidebarBgDark.addEventListener('click', () => {
            sidebarBgDark.classList.add('active');
            sidebarBgLight.classList.remove('active');
            document.body.classList.remove('theme-light');
        });
    }
    
    // Clear icon button
    els.clearFeatIcon.addEventListener('click', () => {
        els.selectFeatIcon.value = '';
        applyToCanvas();
    });
    
    // Background preset change
    if (els.bgPresetSelect) {
        els.bgPresetSelect.addEventListener('change', () => {
            // Remove all bg- classes
            els.canvas.classList.remove('bg-deep-ocean', 'bg-midnight', 'bg-electric-blue', 'bg-neon-teal', 'bg-ember', 'bg-solid-dark');
            // Add selected
            els.canvas.classList.add(`bg-${els.bgPresetSelect.value}`);
        });
        // Set initial background
        els.canvas.classList.add(`bg-${els.bgPresetSelect.value}`);
    }
    
    // Restart button - show format picker again
    const restartBtn = document.getElementById('restartBtn');
    if (restartBtn) {
        restartBtn.addEventListener('click', () => {
            const overlay = document.getElementById('formatPicker');
            if (overlay) {
                overlay.classList.remove('hidden');
            }
        });
    }
    
    // Layout preset change
    const layoutPresetSelect = document.getElementById('layoutPresetSelect');
    if (layoutPresetSelect) {
        layoutPresetSelect.addEventListener('change', () => {
            // Remove all layout- classes
            els.canvas.classList.remove('layout-standard', 'layout-stats-focus', 'layout-hero-only', 'layout-triple-feature');
            // Add selected
            els.canvas.classList.add(`layout-${layoutPresetSelect.value}`);
        });
        // Set initial layout
        els.canvas.classList.add(`layout-${layoutPresetSelect.value}`);
    }
    
    els.saveBtn.addEventListener('click', () => {
        const data = getCurrentState();
        const timestamp = new Date().toISOString().slice(0,10);
        const filename = `bento-preset-${timestamp}.json`;
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = filename;
        a.click();
        showToast(`💾 Saved: ${filename}`);
    });
    
    // Load Preset from JSON file
    const loadPresetBtn = document.getElementById('loadPresetBtn');
    const loadPresetInput = document.getElementById('loadPresetInput');
    
    if (loadPresetBtn && loadPresetInput) {
        loadPresetBtn.addEventListener('click', () => {
            loadPresetInput.click();
        });
        
        loadPresetInput.addEventListener('change', (e) => {
            const file = e.target.files[0];
            if (!file) return;
            
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    applyStateData(data);
                    pushHistory();
                    showToast(`✅ Loaded: ${file.name}`);
                } catch (err) {
                    console.error('Parse error:', err);
                    showToast('❌ Invalid JSON file');
                }
            };
            reader.readAsText(file);
            
            // Reset input so same file can be loaded again
            loadPresetInput.value = '';
        });
    }
    
    els.exportBtn.addEventListener('click', async () => {
        els.exportBtn.textContent = '⏳ Preloading...';
        els.exportBtn.disabled = true;
        
        // Preload all images before export
        const imageUrls = [
            els.selectHeroImg.value,
            els.selectImg2.value,
            els.selectFeatImg.value,
            '/assets/app-icon.png'
        ].filter(Boolean);
        
        try {
            await Promise.all(imageUrls.map(url => {
                return new Promise((resolve, reject) => {
                    const img = new Image();
                    img.onload = resolve;
                    img.onerror = () => {
                        console.warn('Failed to preload:', url);
                        resolve(); // Continue even if one fails
                    };
                    img.src = url;
                });
            }));
        } catch (e) {
            console.warn('Image preload warning:', e);
        }
        
        els.exportBtn.textContent = '⏳ Exporting...';
        
        const canvas = els.canvas;
        const orig = canvas.style.transform;
        canvas.style.transform = 'none';
        
        // Get naming components
        const preset = els.themeSelect.value;
        const format = els.formatSelect.value;
        const date = new Date().toISOString().slice(0,10);
        
        // Get dimensions from canvas
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        try {
            const rendered = await html2canvas(canvas, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 15000,
                width: width,
                height: height
            });
            
            const link = document.createElement('a');
            link.download = `FCClubs-${preset}-${format}-${width}x${height}-${date}.png`;
            link.href = rendered.toDataURL('image/png', 1.0);
            link.click();
        } catch (err) {
            console.error('Export error:', err);
            alert('Export failed: ' + err.message);
        } finally {
            canvas.style.transform = orig;
            els.exportBtn.textContent = '📸 Export';
            els.exportBtn.disabled = false;
        }
    });
    
    // Copy to clipboard button
    els.copyBtn.addEventListener('click', async () => {
        els.copyBtn.textContent = '⏳ Copying...';
        els.copyBtn.disabled = true;
        
        const canvas = els.canvas;
        const orig = canvas.style.transform;
        canvas.style.transform = 'none';
        
        try {
            const rendered = await html2canvas(canvas, {
                backgroundColor: null,
                scale: 2,
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 15000,
                width: canvas.offsetWidth,
                height: canvas.offsetHeight
            });
            
            rendered.toBlob(async (blob) => {
                try {
                    await navigator.clipboard.write([
                        new ClipboardItem({ 'image/png': blob })
                    ]);
                    showToast('✅ Copied to clipboard!');
                } catch (clipErr) {
                    console.error('Clipboard error:', clipErr);
                    showToast('❌ Clipboard not supported');
                }
            }, 'image/png');
        } catch (err) {
            console.error('Copy error:', err);
            showToast('❌ Copy failed');
        } finally {
            canvas.style.transform = orig;
            els.copyBtn.textContent = '📋 Copy';
            els.copyBtn.disabled = false;
        }
    });
    
    // Multi-export: Export all formats
    const multiExportBtn = document.getElementById('multiExportBtn');
    if (multiExportBtn) {
        multiExportBtn.addEventListener('click', async () => {
            const formats = ['ig-square', 'ig-story', 'li-landscape', 'x-landscape'];
            const originalFormat = els.formatSelect.value;
            
            multiExportBtn.textContent = '⏳ Exporting...';
            multiExportBtn.disabled = true;
            
            for (let i = 0; i < formats.length; i++) {
                const format = formats[i];
                multiExportBtn.textContent = `⏳ ${i + 1}/${formats.length}...`;
                
                // Change format
                els.formatSelect.value = format;
                els.canvas.className = `bento-canvas format-${format}`;
                await new Promise(r => setTimeout(r, 200)); // Let CSS settle
                updateScale();
                await new Promise(r => setTimeout(r, 100));
                
                const canvas = els.canvas;
                const orig = canvas.style.transform;
                canvas.style.transform = 'none';
                
                try {
                    const rendered = await html2canvas(canvas, {
                        backgroundColor: null,
                        scale: 2,
                        useCORS: true,
                        allowTaint: true,
                        logging: false,
                        imageTimeout: 15000,
                        width: canvas.offsetWidth,
                        height: canvas.offsetHeight
                    });
                    
                    const link = document.createElement('a');
                    link.download = `bento-${format}-${Date.now()}.png`;
                    link.href = rendered.toDataURL('image/png', 1.0);
                    link.click();
                } catch (err) {
                    console.error(`Export error for ${format}:`, err);
                } finally {
                    canvas.style.transform = orig;
                }
                
                await new Promise(r => setTimeout(r, 500)); // Delay between downloads
            }
            
            // Restore original format
            els.formatSelect.value = originalFormat;
            els.canvas.className = `bento-canvas format-${originalFormat}`;
            updateScale();
            
            multiExportBtn.textContent = '📦 Export All Formats';
            multiExportBtn.disabled = false;
            showToast(`✅ Exported ${formats.length} formats!`);
        });
    }
}

document.addEventListener('DOMContentLoaded', init);
