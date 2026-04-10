// Language switcher for index page
let currentLang = 'en';

function applyLanguage(lang) {
    const t = translations[lang];
    if (!t) return;
    document.getElementById('content').innerHTML = t.instructions_html;
    // update active button
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('active');
        if (btn.id === `lang-${lang}`) btn.classList.add('active');
    });
    currentLang = lang;
    localStorage.setItem('mindcanvas_lang', lang);
}

function initLanguage() {
    const saved = localStorage.getItem('mindcanvas_lang');
    const browserLang = navigator.language.split('-')[0];
    let defaultLang = 'en';
    if (saved && translations[saved]) defaultLang = saved;
    else if (['nl','fr','de'].includes(browserLang)) defaultLang = browserLang;
    applyLanguage(defaultLang);
    
    document.getElementById('lang-en').onclick = () => applyLanguage('en');
    document.getElementById('lang-nl').onclick = () => applyLanguage('nl');
    document.getElementById('lang-fr').onclick = () => applyLanguage('fr');
    document.getElementById('lang-de').onclick = () => applyLanguage('de');
}

initLanguage();
