/**
 * Bento Generator v10 - Marketing Overhaul (Brand Cards + Visual Features)
 */

const els = {
    canvas: document.getElementById('bentoCanvas'),
    formatSelect: document.getElementById('formatSelect'),
    themeSelect: document.getElementById('themeSelect'),
    exportBtn: document.getElementById('exportBtn'),
    saveBtn: document.getElementById('saveBtn'),
    
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
    inputFeatOpacity: document.getElementById('inputFeatOpacity'),
    featOpacityVal: document.getElementById('featOpacityVal'),
    
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
        featImg: "/assets/screenshots/iphone-scout.png"
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
        featImg: "/assets/screenshots/iphone-dashboard.png"
    },
    
    // V103: Widgets Focus
    v103: {
        heroTitle: "Stats at\na Glance.",
        textStyle: "neon-green",
        heroImg: "/assets/screenshots/Widgets - Simulator Screenshot - iPhone 17 Pro Max - 2025-12-22 at 01.25.12.png",
        heroZoom: 100,
        heroPosX: 50,
        heroPosY: 30,
        
        img2: "/assets/screenshots/iphone-sessions.png",
        img2Zoom: 105,
        img2PosX: 50,
        img2PosY: 15,
        img2Title: "",
        img2TitleStyle: "neon-green",
        
        // STAT 1: Widget feature
        stat1Value: "1-Tap",
        stat1Label: "Widgets",
        stat1Desc: "Stats on your home screen",
        stat1Color: "green",
        
        // STAT 2: Live updates
        stat2Value: "Live",
        stat2Label: "Activity",
        stat2Desc: "Real-time lock screen",
        stat2Color: "blue",
        
        // FEATURE: Session tracking
        featTitle: "Session History",
        featDesc: "Track every gaming session",
        featImg: "/assets/screenshots/iphone-sessions.png"
    }
};

function init() {
    bindEvents();
    setTheme('overview');
    updateScale();
    window.addEventListener('resize', updateScale);
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
    
    applyToCanvas();
}

function applyToCanvas() {
    // Text content
    els.dispHeroTitle.innerHTML = els.inputHeroTitle.value.replace(/\n/g, '<br>');
    els.dispHeroImg.src = els.selectHeroImg.value;
    els.dispImg2.src = els.selectImg2.value;
    els.dispImg2Title.textContent = els.inputImg2Title.value;
    
    els.dispStat1Value.textContent = els.inputStat1Value.value;
    els.dispStat1Label.textContent = els.inputStat1Label.value;
    els.dispStat1Desc.textContent = els.inputStat1Desc.value;
    
    els.dispStat2Value.textContent = els.inputStat2Value.value;
    els.dispStat2Label.textContent = els.inputStat2Label.value;
    els.dispStat2Desc.textContent = els.inputStat2Desc.value;
    
    els.dispFeatTitle.textContent = els.inputFeatTitle.value;
    els.dispFeatDesc.textContent = els.inputFeatDesc.value;
    
    // Feature Image logic
    const featImgSrc = els.selectFeatImg.value;
    if (featImgSrc) {
        els.dispFeatImg.src = featImgSrc;
        els.dispFeatImg.style.display = 'block';
    } else {
        els.dispFeatImg.style.display = 'none';
        els.dispFeatImg.src = '';
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
    
    // Hero zoom + position
    const heroZoom = parseFloat(els.inputHeroZoom.value);
    const heroPosX = parseFloat(els.inputHeroPosX.value);
    const heroPosY = parseFloat(els.inputHeroPosY.value);
    els.zoomHeroVal.textContent = heroZoom;
    
    // Use transform for zoom, object-position for pan
    els.dispHeroImg.style.transform = `scale(${heroZoom / 100})`;
    els.dispHeroImg.style.objectPosition = `${heroPosX}% ${heroPosY}%`;
    
    // Img2 zoom + position
    const img2Zoom = parseFloat(els.inputImg2Zoom.value);
    const img2PosX = parseFloat(els.inputImg2PosX.value);
    const img2PosY = parseFloat(els.inputImg2PosY.value);
    els.zoomImg2Val.textContent = img2Zoom;
    
    els.dispImg2.style.transform = `scale(${img2Zoom / 100})`;
    els.dispImg2.style.objectPosition = `${img2PosX}% ${img2PosY}%`;
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
        'inputFeatTitle', 'inputFeatDesc', 'inputFeatOpacity'
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
    els.selectFeatImg.addEventListener('change', applyToCanvas); // New binding
    
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
            featImg: els.selectFeatImg.value
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const a = document.createElement('a');
        a.href = URL.createObjectURL(blob);
        a.download = `${els.themeSelect.value}.json`;
        a.click();
    });
    
    els.exportBtn.addEventListener('click', async () => {
        els.exportBtn.textContent = '⏳ Exporting...';
        els.exportBtn.disabled = true;
        
        const canvas = els.canvas;
        const orig = canvas.style.transform;
        canvas.style.transform = 'none';
        
        // Get naming components
        const preset = els.themeSelect.value; // overview, v102, v103
        const format = els.formatSelect.value; // ig-square, li-landscape, etc.
        const date = new Date().toISOString().slice(0,10); // YYYY-MM-DD
        
        // Get dimensions from canvas
        const width = canvas.offsetWidth;
        const height = canvas.offsetHeight;
        
        try {
            const rendered = await html2canvas(canvas, {
                backgroundColor: null,
                scale: 2, // 2x for retina quality
                useCORS: true,
                allowTaint: true,
                logging: false,
                imageTimeout: 0,
                width: width,
                height: height
            });
            
            const link = document.createElement('a');
            // Better naming: FCClubs-overview-ig-square-1080x1080-2024-12-22.png
            link.download = `FCClubs-${preset}-${format}-${width}x${height}-${date}.png`;
            link.href = rendered.toDataURL('image/png', 1.0);
            link.click();
        } catch (err) {
            console.error('Export error:', err);
            alert('Export failed: ' + err.message);
        } finally {
            canvas.style.transform = orig;
            els.exportBtn.textContent = '📸 Export PNG';
            els.exportBtn.disabled = false;
        }
    });
}

document.addEventListener('DOMContentLoaded', init);
