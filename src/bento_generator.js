/**
 * Bento Generator v5 - Full Feature Release
 * 
 * Features:
 * - Export to PNG with proper image rendering
 * - Copy to clipboard for quick sharing
 * - Autosave to localStorage (auto-restores on reload)
 * - Keyboard shortcuts: Cmd+E (export), Cmd+S (save), Cmd+Shift+C (copy)
 * - Multiple formats: Instagram, LinkedIn, Twitter/X
 * - Icon/emoji selector for feature box
 * - Image zoom and position controls
 */

const els = {
    canvas: document.getElementById('bentoCanvas'),
    formatSelect: document.getElementById('formatSelect'),
    themeSelect: document.getElementById('themeSelect'),
    exportBtn: document.getElementById('exportBtn'),
    copyBtn: document.getElementById('copyBtn'),
    saveBtn: document.getElementById('saveBtn'),
    toast: document.getElementById('toast'),
    
    // Hero
    inputHeroTitle: document.getElementById('inputHeroTitle'),
    selectHeroImg: document.getElementById('selectHeroImg'),
    selectTextStyle: document.getElementById('selectTextStyle'),
    inputHeroZoom: document.getElementById('inputHeroZoom'),
    inputHeroPosX: document.getElementById('inputHeroPosX'),
    inputHeroPosY: document.getElementById('inputHeroPosY'),
    zoomHeroVal: document.getElementById('zoomHeroVal'),
    
    // Secondary
    selectImg2: document.getElementById('selectImg2'),
    inputImg2Zoom: document.getElementById('inputImg2Zoom'),
    inputImg2PosX: document.getElementById('inputImg2PosX'),
    inputImg2PosY: document.getElementById('inputImg2PosY'),
    inputImg2Title: document.getElementById('inputImg2Title'),
    selectImg2TitleStyle: document.getElementById('selectImg2TitleStyle'),
    zoomImg2Val: document.getElementById('zoomImg2Val'),
    
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
    selectFeatIcon: document.getElementById('selectFeatIcon'),
    clearFeatIcon: document.getElementById('clearFeatIcon'),
    dispFeatIcon: document.querySelector('.feature-icon'),
    
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
        
        img2: "/assets/screenshots/iphone-matches.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 20,
        img2Title: "",
        img2TitleStyle: "white",
        
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
        featIcon: "🎯"
    },
    
    // V102: Scout Mode Focus
    v102: {
        heroTitle: "Know Your\nOpponent.",
        textStyle: "gradient-blue",
        heroImg: "/assets/screenshots/iphone-scout.png",
        heroZoom: 115,
        heroPosX: 50,
        heroPosY: 20,
        
        img2: "/assets/screenshots/iphone-club.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 15,
        img2Title: "",
        img2TitleStyle: "gradient-blue",
        
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
        featIcon: "📊"
    },
    
    // V103: Widgets & AI Focus - v1.0.3 Release
    v103: {
        heroTitle: "Stats at\na Glance.\nw/ Widgets.",
        textStyle: "neon-green",
        heroImg: "/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png",
        heroZoom: 100,
        heroPosX: 50,
        heroPosY: 30,
        
        img2: "/assets/screenshots/iphone-scout.png",
        img2Zoom: 110,
        img2PosX: 50,
        img2PosY: 20,
        img2Title: "",
        img2TitleStyle: "neon-green",
        
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
        featIcon: "🎯"
    }
};

function init() {
    bindEvents();
    restoreFromLocalStorage() || setTheme('overview');
    updateScale();
    window.addEventListener('resize', updateScale);
    bindKeyboardShortcuts();
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
        img2: els.selectImg2.value,
        img2Zoom: els.inputImg2Zoom.value,
        img2PosX: els.inputImg2PosX.value,
        img2PosY: els.inputImg2PosY.value,
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
        featIcon: els.selectFeatIcon.value,
        format: els.formatSelect.value
    };
}

function applyStateData(data) {
    if (!data) return;
    
    // Format
    if (data.format) {
        els.formatSelect.value = data.format;
        els.canvas.className = `bento-canvas format-${data.format}`;
    }
    
    // Hero
    els.inputHeroTitle.value = data.heroTitle || '';
    els.selectTextStyle.value = data.textStyle || 'white';
    els.selectHeroImg.value = data.heroImg || '';
    els.inputHeroZoom.value = data.heroZoom || 100;
    els.inputHeroPosX.value = data.heroPosX || 50;
    els.inputHeroPosY.value = data.heroPosY || 50;
    
    // Secondary
    els.selectImg2.value = data.img2 || '';
    els.inputImg2Zoom.value = data.img2Zoom || 100;
    els.inputImg2PosX.value = data.img2PosX || 50;
    els.inputImg2PosY.value = data.img2PosY || 50;
    els.inputImg2Title.value = data.img2Title || '';
    els.selectImg2TitleStyle.value = data.img2TitleStyle || 'white';
    
    // Stats
    els.inputStat1Value.value = data.stat1Value || '';
    els.inputStat1Label.value = data.stat1Label || '';
    els.inputStat1Desc.value = data.stat1Desc || '';
    els.selectStat1Color.value = data.stat1Color || 'green';
    
    els.inputStat2Value.value = data.stat2Value || '';
    els.inputStat2Label.value = data.stat2Label || '';
    els.inputStat2Desc.value = data.stat2Desc || '';
    els.selectStat2Color.value = data.stat2Color || 'pink';
    
    // Feature
    els.inputFeatTitle.value = data.featTitle || '';
    els.inputFeatDesc.value = data.featDesc || '';
    els.selectFeatImg.value = data.featImg || '';
    els.inputFeatZoom.value = data.featZoom || 100;
    els.inputFeatPosX.value = data.featPosX || 50;
    els.inputFeatPosY.value = data.featPosY || 50;
    els.selectFeatIcon.value = data.featIcon || '';
    
    applyToCanvas();
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
    });
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
    
    // Secondary
    els.selectImg2.value = data.img2;
    els.inputImg2Zoom.value = data.img2Zoom || 100;
    els.inputImg2PosX.value = data.img2PosX || 50;
    els.inputImg2PosY.value = data.img2PosY || 50;
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
    els.selectFeatIcon.value = data.featIcon || "";
    
    applyToCanvas();
}

function applyToCanvas() {
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
    } else {
        els.dispFeatImg.style.display = 'none';
        els.dispFeatImg.style.backgroundImage = '';
    }
    
    // Feature overlay opacity
    const featOpacity = parseFloat(els.inputFeatOpacity.value) / 100;
    els.featOpacityVal.textContent = els.inputFeatOpacity.value;
    if (els.featGradient) {
        els.featGradient.style.background = `linear-gradient(to top, rgba(0,0,0,${featOpacity * 1.2}) 0%, rgba(0,0,0,${featOpacity}) 100%)`;
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
    
    // Img2 zoom + position - use background-size and background-position
    const img2Zoom = parseFloat(els.inputImg2Zoom.value);
    const img2PosX = parseFloat(els.inputImg2PosX.value);
    const img2PosY = parseFloat(els.inputImg2PosY.value);
    els.zoomImg2Val.textContent = img2Zoom;
    
    els.dispImg2.style.backgroundSize = `${img2Zoom}%`;
    els.dispImg2.style.backgroundPosition = `${img2PosX}% ${img2PosY}%`;
    
    // Autosave on every change
    saveToLocalStorage();
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

function bindEvents() {
    els.formatSelect.addEventListener('change', (e) => {
        els.canvas.className = `bento-canvas format-${e.target.value}`;
        setTimeout(updateScale, 50);
    });
    
    els.themeSelect.addEventListener('change', (e) => setTheme(e.target.value));
    
    const liveInputs = [
        'inputHeroTitle', 'inputHeroZoom', 'inputHeroPosX', 'inputHeroPosY',
        'inputImg2Zoom', 'inputImg2PosX', 'inputImg2PosY', 'inputImg2Title',
        'inputStat1Value', 'inputStat1Label', 'inputStat1Desc',
        'inputStat2Value', 'inputStat2Label', 'inputStat2Desc',
        'inputFeatTitle', 'inputFeatDesc', 'inputFeatOpacity',
        'inputFeatZoom', 'inputFeatPosX', 'inputFeatPosY'
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
    
    // Clear icon button
    els.clearFeatIcon.addEventListener('click', () => {
        els.selectFeatIcon.value = '';
        applyToCanvas();
    });
    
    els.saveBtn.addEventListener('click', () => {
        const data = {
            heroTitle: els.inputHeroTitle.value,
            textStyle: els.selectTextStyle.value,
            heroImg: els.selectHeroImg.value,
            heroZoom: els.inputHeroZoom.value,
            heroPosX: els.inputHeroPosX.value,
            heroPosY: els.inputHeroPosY.value,
            img2: els.selectImg2.value,
            img2Zoom: els.inputImg2Zoom.value,
            img2PosX: els.inputImg2PosX.value,
            img2PosY: els.inputImg2PosY.value,
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
            featIcon: els.selectFeatIcon.value
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${els.themeSelect.value}.json`;
        a.click();
    });
    
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
}

document.addEventListener('DOMContentLoaded', init);
