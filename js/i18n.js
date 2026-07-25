/* ============================================================
   AnnMax Portfolio - i18n Dynamic Loader
   Each language is a separate file under js/i18n/<lang>.js
   Only the detected language is loaded on init.
   ============================================================ */

var I18N = {};

function loadLang(lang) {
  return new Promise(function (resolve) {
    if (I18N[lang]) return resolve(I18N[lang]);
    var script = document.createElement('script');
    script.src = 'js/i18n/' + lang + '.js';
    script.onload = function () {
      I18N[lang] = window['LANG_' + lang] || {};
      resolve(I18N[lang]);
    };
    script.onerror = function () {
      // Fallback to English if the requested language file fails
      if (lang !== 'en') {
        loadLang('en').then(resolve);
      } else {
        resolve({});
      }
    };
    document.head.appendChild(script);
  });
}
