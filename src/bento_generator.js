/**
 * Bento Generator v18 - Position-Based Slots & UX Content Types
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
    selectStat1Color: document.getElementById('selectStat1Color'),
    inputStat2Value: document.getElementById('inputStat2Value'),
    inputStat2Label: document.getElementById('inputStat2Label'),
    inputStat2Desc: document.getElementById('inputStat2Desc'),
    selectStat2Color: document.getElementById('selectStat2Color'),
    
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
        heroTitle: "Your Club.\nYour Stats.",
        textStyle: "white",
        heroImg: "/assets/screenshots/iphone-dashboard.png",
        heroZoom: 115,
        heroPosX: 50,
        heroPosY: 25,
        heroOpacity: 65,
        heroOverlay: 60,
        
        img2: "/assets/screenshots/iphone-matches.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 20,
        img2Title: "",
        img2TitleStyle: "white",
        img2Opacity: 90,
        img2Overlay: 30,
        
        // STAT 1: Core feature - Match Tracking
        stat1Value: "∞",
        stat1Label: "Matches",
        stat1Desc: "Every game saved forever",
        stat1Color: "green",
        
        // STAT 2: AI Feature
        stat2Value: "AI",
        stat2Label: "Predictions",
        stat2Desc: "Win probability before kickoff",
        stat2Color: "blue",
        
        // FEATURE: Scout capability
        featTitle: "Scout Any Club",
        featDesc: "Research opponents before you play",
        featImg: "/assets/screenshots/iphone-scout.png",
        featZoom: 100,
        featPosX: 50,
        featPosY: 50,
        featOpacity: 40,
        featOverlay: 70,
        featIcon: "🎯",
        brandName: "FC Clubs Stats",
        brandTagline: "Free on App Store"
    },
    
    // V102: Scout Mode Focus
    v102: {
        heroTitle: "Know Your\nOpponent.",
        textStyle: "gradient-blue",
        heroImg: "/assets/screenshots/iphone-scout.png",
        heroZoom: 115,
        heroPosX: 50,
        heroPosY: 20,
        heroOpacity: 65,
        heroOverlay: 60,
        
        img2: "/assets/screenshots/iphone-club.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 15,
        img2Title: "",
        img2TitleStyle: "gradient-blue",
        img2Opacity: 90,
        img2Overlay: 30,
        
        // STAT 1: Search feature
        stat1Value: "Any",
        stat1Label: "Club",
        stat1Desc: "Search millions of players",
        stat1Color: "blue",
        
        // STAT 2: H2H feature
        stat2Value: "H2H",
        stat2Label: "History",
        stat2Desc: "See your past matchups",
        stat2Color: "gold",
        
        // FEATURE: Player ratings
        featTitle: "Full Player Stats",
        featDesc: "Goals, assists, rating & more",
        featImg: "/assets/screenshots/iphone-dashboard.png",
        featZoom: 100,
        featPosX: 50,
        featPosY: 50,
        featOpacity: 40,
        featOverlay: 70,
        featIcon: "📊",
        brandName: "FC Clubs Stats",
        brandTagline: "Free on App Store"
    },
    
    // V103: Widgets & AI Focus - v1.0.3 Release
    v103: {
        heroTitle: "Stats at\na Glance.\nw/ Widgets.",
        textStyle: "neon-green",
        heroImg: "/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png",
        heroZoom: 100,
        heroPosX: 50,
        heroPosY: 30,
        heroOpacity: 65,
        heroOverlay: 60,
        
        img2: "/assets/screenshots/iphone-scout.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 20,
        img2Title: "",
        img2TitleStyle: "neon-green",
        img2Opacity: 90,
        img2Overlay: 30,
        
        // STAT 1: AI Match Forecast
        stat1Value: "AI",
        stat1Label: "MATCH FORECAST",
        stat1Desc: "Know Your Odds",
        stat1Color: "green",
        
        // STAT 2: Scout Mode
        stat2Value: "Scout",
        stat2Label: "OPPONENTS",
        stat2Desc: "Get Ready for the Match",
        stat2Color: "blue",
        
        // FEATURE: Scout Report
        featTitle: "Scout Report",
        featDesc: "Full tactical breakdown before kickoff",
        featImg: "/assets/screenshots/iphone-scout.png",
        featZoom: 110,
        featPosX: 50,
        featPosY: 30,
        featOpacity: 40,
        featOverlay: 70,
        featIcon: "🎯",
        brandName: "FC Clubs Stats",
        brandTagline: "Free on App Store"
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
        selectStat1Color: "green",
        inputStat2Value: "200",
        inputStat2Label: "Label",
        inputStat2Desc: "Description",
        selectStat2Color: "blue"
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
    
    // Setup visual color pickers for stat colors
    setupColorPicker(els.selectStat1Color, 'stat1ColorGrid');
    setupColorPicker(els.selectStat2Color, 'stat2ColorGrid');
    
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
            const data = JSON.parse(saved);
            applyStateData(data);
            return true;
        }
    } catch (e) {
        console.warn('Failed to restore autosave:', e);
    }
    return false;
}

function getCurrentState() {
    return {
        heroTitle: els.inputHeroTitle.value,
        textStyle: els.selectTextStyle.value,
        heroImg: els.selectHeroImg.value,
        heroZoom: els.inputHeroZoom.value,
        heroPosX: els.inputHeroPosX.value,
        heroPosY: els.inputHeroPosY.value,
        heroOpacity: els.inputHeroOpacity.value,
        heroOverlay: els.inputHeroOverlay.value,
        img2: els.selectImg2.value,
        img2Zoom: els.inputImg2Zoom.value,
        img2PosX: els.inputImg2PosX.value,
        img2PosY: els.inputImg2PosY.value,
        img2Opacity: els.inputImg2Opacity.value,
        img2Overlay: els.inputImg2Overlay.value,
        img2Title: els.inputImg2Title.value,
        img2TitleStyle: els.selectImg2TitleStyle.value,
        stat1Value: els.inputStat1Value.value,
        stat1Label: els.inputStat1Label.value,
        stat1Desc: els.inputStat1Desc.value,
        stat1Color: els.selectStat1Color.value,
        stat2Value: els.inputStat2Value.value,
        stat2Label: els.inputStat2Label.value,
        stat2Desc: els.inputStat2Desc.value,
        stat2Color: els.selectStat2Color.value,
        featTitle: els.inputFeatTitle.value,
        featDesc: els.inputFeatDesc.value,
        featImg: els.selectFeatImg.value,
        featZoom: els.inputFeatZoom.value,
        featPosX: els.inputFeatPosX.value,
        featPosY: els.inputFeatPosY.value,
        featOpacity: els.inputFeatOpacity.value,
        featOverlay: els.inputFeatOverlay.value,
        featIcon: els.selectFeatIcon.value,
        brandName: els.inputBrandName.value,
        brandTagline: els.inputBrandTagline.value,
        format: els.formatSelect.value
    };
}

function applyStateData(data, skipHistory = false) {
    if (!data) return;
    
    // Format
    if (data.format) {
        els.formatSelect.value = data.format;
        els.canvas.className = `bento-canvas format-${data.format}`;
    }
    
    // Hero
    els.inputHeroTitle.value = data.heroTitle || '';
    els.selectTextStyle.value = data.textStyle || 'white';
    
    // Sync Hero visual selector
    syncVisualGrid('heroStyleGrid', els.selectTextStyle.value);

    els.selectHeroImg.value = data.heroImg || '';
    els.inputHeroZoom.value = data.heroZoom || 100;
    els.inputHeroPosX.value = data.heroPosX || 50;
    els.inputHeroPosY.value = data.heroPosY || 50;
    els.inputHeroOpacity.value = data.heroOpacity || 65;
    els.inputHeroOverlay.value = data.heroOverlay || 60;
    
    // Secondary
    els.selectImg2.value = data.img2 || '';
    els.inputImg2Zoom.value = data.img2Zoom || 100;
    els.inputImg2PosX.value = data.img2PosX || 50;
    els.inputImg2PosY.value = data.img2PosY || 50;
    els.inputImg2Opacity.value = data.img2Opacity || 90;
    els.inputImg2Overlay.value = data.img2Overlay || 30;
    els.inputImg2Title.value = data.img2Title || '';
    els.selectImg2TitleStyle.value = data.img2TitleStyle || 'white';
    
    // Sync Secondary visual selector
    syncVisualGrid('img2StyleGrid', els.selectImg2TitleStyle.value);
    
    // Stats
    els.inputStat1Value.value = data.stat1Value || '';
    els.inputStat1Label.value = data.stat1Label || '';
    els.inputStat1Desc.value = data.stat1Desc || '';
    els.selectStat1Color.value = data.stat1Color || 'green';
    syncVisualGrid('stat1ColorGrid', els.selectStat1Color.value);
    
    els.inputStat2Value.value = data.stat2Value || '';
    els.inputStat2Label.value = data.stat2Label || '';
    els.inputStat2Desc.value = data.stat2Desc || '';
    els.selectStat2Color.value = data.stat2Color || 'pink';
    syncVisualGrid('stat2ColorGrid', els.selectStat2Color.value);
    
    // Feature
    els.inputFeatTitle.value = data.featTitle || '';
    els.inputFeatDesc.value = data.featDesc || '';
    els.selectFeatImg.value = data.featImg || '';
    els.inputFeatZoom.value = data.featZoom || 100;
    els.inputFeatPosX.value = data.featPosX || 50;
    els.inputFeatPosY.value = data.featPosY || 50;
    els.inputFeatOpacity.value = data.featOpacity || 40;
    els.inputFeatOverlay.value = data.featOverlay || 70;
    els.selectFeatIcon.value = data.featIcon || '';
    syncVisualGrid('featIconGrid', els.selectFeatIcon.value);
    
    // Brand
    els.inputBrandName.value = data.brandName || 'FC Clubs Stats';
    els.inputBrandTagline.value = data.brandTagline || 'Free on App Store';
    
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
    
    // Hero
    els.inputHeroTitle.value = data.heroTitle;
    els.selectTextStyle.value = data.textStyle || "white";
    els.selectHeroImg.value = data.heroImg;
    els.inputHeroZoom.value = data.heroZoom || 100;
    els.inputHeroPosX.value = data.heroPosX || 50;
    els.inputHeroPosY.value = data.heroPosY || 50;
    els.inputHeroOpacity.value = data.heroOpacity || 65;
    els.inputHeroOverlay.value = data.heroOverlay || 60;
    
    // Secondary
    els.selectImg2.value = data.img2;
    els.inputImg2Zoom.value = data.img2Zoom || 100;
    els.inputImg2PosX.value = data.img2PosX || 50;
    els.inputImg2PosY.value = data.img2PosY || 50;
    els.inputImg2Opacity.value = data.img2Opacity || 90;
    els.inputImg2Overlay.value = data.img2Overlay || 30;
    els.inputImg2Title.value = data.img2Title || "";
    els.selectImg2TitleStyle.value = data.img2TitleStyle || "white";
    
    // Stats
    els.inputStat1Value.value = data.stat1Value;
    els.inputStat1Label.value = data.stat1Label;
    els.inputStat1Desc.value = data.stat1Desc || "";
    els.selectStat1Color.value = data.stat1Color || "green";
    
    els.inputStat2Value.value = data.stat2Value;
    els.inputStat2Label.value = data.stat2Label;
    els.inputStat2Desc.value = data.stat2Desc || "";
    els.selectStat2Color.value = data.stat2Color || "pink";
    
    // Feature
    els.inputFeatTitle.value = data.featTitle;
    els.inputFeatDesc.value = data.featDesc;
    els.selectFeatImg.value = data.featImg || "";
    els.inputFeatZoom.value = data.featZoom || 100;
    els.inputFeatPosX.value = data.featPosX || 50;
    els.inputFeatPosY.value = data.featPosY || 50;
    els.inputFeatOpacity.value = data.featOpacity || 40;
    els.inputFeatOverlay.value = data.featOverlay || 70;
    els.selectFeatIcon.value = data.featIcon || "";
    
    // Brand
    els.inputBrandName.value = data.brandName || "FC Clubs Stats";
    els.inputBrandTagline.value = data.brandTagline || "Free on App Store";
    
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
    const featOverlay = parseFloat(els.inputFeatOverlay.value) / 100;
    els.featOverlayVal.textContent = els.inputFeatOverlay.value;
    if (els.featGradient) {
        els.featGradient.style.background = `linear-gradient(to top, rgba(0,0,0,${featOverlay}) 0%, rgba(0,0,0,${featOverlay * 0.6}) 100%)`;
    }
    
    // Hero text style
    const textStyle = els.selectTextStyle.value;
    els.heroTextOverlay.className = `hero-text-overlay text-style-${textStyle}`;
    
    // Img2 title style
    els.img2TextOverlay.className = `img2-text-overlay img2-title-style-${els.selectImg2TitleStyle.value}`;
    
    // Stat colors
    els.boxStat1.className = `bento-box box-stat-1 stat-style-${els.selectStat1Color.value}`;
    els.boxStat2.className = `bento-box box-stat-2 stat-style-${els.selectStat2Color.value}`;
    
    // Hero zoom + position - use background-size and background-position
    const heroZoom = parseFloat(els.inputHeroZoom.value);
    const heroPosX = parseFloat(els.inputHeroPosX.value);
    const heroPosY = parseFloat(els.inputHeroPosY.value);
    els.zoomHeroVal.textContent = heroZoom;
    
    // Use background-size for zoom (percentage > 100 = zoomed in)
    els.dispHeroImg.style.backgroundSize = `${heroZoom}%`;
    els.dispHeroImg.style.backgroundPosition = `${heroPosX}% ${heroPosY}%`;
    
    // Hero opacity and overlay
    const heroOpacity = parseFloat(els.inputHeroOpacity.value) / 100;
    const heroOverlay = parseFloat(els.inputHeroOverlay.value) / 100;
    els.heroOpacityVal.textContent = els.inputHeroOpacity.value;
    els.heroOverlayVal.textContent = els.inputHeroOverlay.value;
    els.dispHeroImg.style.opacity = heroOpacity;
    if (els.heroGradient) {
        els.heroGradient.style.background = `linear-gradient(to top, rgba(0,0,0,${heroOverlay}) 0%, rgba(0,0,0,${heroOverlay * 0.3}) 50%, rgba(0,0,0,${heroOverlay * 0.5}) 100%)`;
    }
    
    // Img2 zoom + position - use background-size and background-position
    const img2Zoom = parseFloat(els.inputImg2Zoom.value);
    const img2PosX = parseFloat(els.inputImg2PosX.value);
    const img2PosY = parseFloat(els.inputImg2PosY.value);
    els.zoomImg2Val.textContent = img2Zoom;
    
    els.dispImg2.style.backgroundSize = `${img2Zoom}%`;
    els.dispImg2.style.backgroundPosition = `${img2PosX}% ${img2PosY}%`;
    
    // Img2 opacity and overlay
    const img2Opacity = parseFloat(els.inputImg2Opacity.value) / 100;
    const img2Overlay = parseFloat(els.inputImg2Overlay.value) / 100;
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
    const scale = Math.min(
        (container.clientWidth - 60) / canvas.offsetWidth,
        (container.clientHeight - 60) / canvas.offsetHeight,
        1
    );
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
        // X Landscape: H left 5 cols, B top-right corner, I2 expands, S1/S2, F
        'x-landscape': {
            areas: `"H H H B B B I2 I2" "H H H B B B I2 I2" "H H H I2 I2 I2 I2 I2" "H H H S1 S1 S2 S2 S2" "H H H F F F F F"`,
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
    els.selectStat1Color.addEventListener('change', applyToCanvas);
    els.selectStat2Color.addEventListener('change', applyToCanvas);
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
        const data = {
            heroTitle: els.inputHeroTitle.value,
            textStyle: els.selectTextStyle.value,
            heroImg: els.selectHeroImg.value,
            heroZoom: els.inputHeroZoom.value,
            heroPosX: els.inputHeroPosX.value,
            heroPosY: els.inputHeroPosY.value,
            heroOpacity: els.inputHeroOpacity.value,
            heroOverlay: els.inputHeroOverlay.value,
            img2: els.selectImg2.value,
            img2Zoom: els.inputImg2Zoom.value,
            img2PosX: els.inputImg2PosX.value,
            img2PosY: els.inputImg2PosY.value,
            img2Opacity: els.inputImg2Opacity.value,
            img2Overlay: els.inputImg2Overlay.value,
            img2Title: els.inputImg2Title.value,
            img2TitleStyle: els.selectImg2TitleStyle.value,
            stat1Value: els.inputStat1Value.value,
            stat1Label: els.inputStat1Label.value,
            stat1Desc: els.inputStat1Desc.value,
            stat1Color: els.selectStat1Color.value,
            stat2Value: els.inputStat2Value.value,
            stat2Label: els.inputStat2Label.value,
            stat2Desc: els.inputStat2Desc.value,
            stat2Color: els.selectStat2Color.value,
            featTitle: els.inputFeatTitle.value,
            featDesc: els.inputFeatDesc.value,
            featImg: els.selectFeatImg.value,
            featZoom: els.inputFeatZoom.value,
            featPosX: els.inputFeatPosX.value,
            featPosY: els.inputFeatPosY.value,
            featOpacity: els.inputFeatOpacity.value,
            featOverlay: els.inputFeatOverlay.value,
            featIcon: els.selectFeatIcon.value,
            brandName: els.inputBrandName.value,
            brandTagline: els.inputBrandTagline.value
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${els.themeSelect.value}.json`;
        a.click();
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
