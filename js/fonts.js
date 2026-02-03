(function () {
  var STORAGE_KEY = 'mdpreview-font';

  var FONT_LIST = [
    { id: 'inter', label: 'Inter', fontFamily: '"Inter", system-ui, sans-serif' },
    { id: 'source-sans', label: 'Source Sans 3', fontFamily: '"Source Sans 3", system-ui, sans-serif' },
    { id: 'literata', label: 'Literata', fontFamily: '"Literata", Georgia, serif' },
    { id: 'system', label: 'System', fontFamily: 'system-ui, -apple-system, sans-serif' }
  ];

  function applyFont(fontId) {
    var option = FONT_LIST.find(function (f) { return f.id === fontId; }) || FONT_LIST[0];
    document.body.style.fontFamily = option.fontFamily;
  }

  function initFonts() {
    var select = document.getElementById('font-select');
    if (select) {
      FONT_LIST.forEach(function (f) {
        var opt = document.createElement('option');
        opt.value = f.id;
        opt.textContent = f.label;
        select.appendChild(opt);
      });
      var saved = localStorage.getItem(STORAGE_KEY);
      var initial = saved && FONT_LIST.some(function (f) { return f.id === saved; }) ? saved : 'inter';
      select.value = initial;
      select.addEventListener('change', function () {
        var value = select.value;
        localStorage.setItem(STORAGE_KEY, value);
        applyFont(value);
      });
      applyFont(initial);
    } else {
      applyFont('inter');
    }
  }

  window.MdPreview = window.MdPreview || {};
  window.MdPreview.initFonts = initFonts;
})();
