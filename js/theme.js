(function () {
  var STORAGE_KEY = 'mdpreview-theme';

  function getSystemTheme() {
    return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  function applyTheme(theme) {
    var resolved = theme === 'system' ? getSystemTheme() : theme;
    document.documentElement.setAttribute('data-theme', resolved);
  }

  function initTheme() {
    var select = document.getElementById('theme-select');
    var saved = localStorage.getItem(STORAGE_KEY);
    var initial = saved || 'system';
    if (select) {
      select.value = initial;
      select.addEventListener('change', function () {
        var value = select.value;
        localStorage.setItem(STORAGE_KEY, value);
        applyTheme(value);
      });
    }
    applyTheme(initial);

    if (window.matchMedia) {
      window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function () {
        if (localStorage.getItem(STORAGE_KEY) === 'system') applyTheme('system');
      });
    }
  }

  window.MdPreview = window.MdPreview || {};
  window.MdPreview.initTheme = initTheme;
})();
