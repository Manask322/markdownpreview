window.MdPreview = window.MdPreview || {};

(function (MdPreview) {
  MdPreview.MAX_ENCODED_LENGTH = 1500;

  function encodeForUrl(text) {
    return btoa(encodeURIComponent(text));
  }

  function decodeFromUrl(encoded) {
    return decodeURIComponent(atob(encoded));
  }

  function loadFromUrl(callback) {
    var params = new URLSearchParams(window.location.search);
    var md = params.get('md');
    if (!md) return;
    try {
      callback(decodeFromUrl(md));
    } catch (e) { /* ignore invalid/corrupt param */ }
  }

  MdPreview.encodeForUrl = encodeForUrl;
  MdPreview.decodeFromUrl = decodeFromUrl;
  MdPreview.loadFromUrl = loadFromUrl;
})(window.MdPreview);
