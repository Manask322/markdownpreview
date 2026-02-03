window.MdPreview = window.MdPreview || {};

(function (MdPreview) {
  MdPreview.MAX_ENCODED_LENGTH = 8000;

  function encodeForUrl(text) {
    return LZString.compressToEncodedURIComponent(text);
  }

  function decodeFromUrl(encoded) {
    return LZString.decompressFromEncodedURIComponent(encoded);
  }

  function loadFromUrl(callback) {
    var params = new URLSearchParams(window.location.search);
    var md = params.get('md');
    if (!md) return;
    try {
      var decoded = decodeFromUrl(md);
      if (decoded) callback(decoded);
    } catch (e) { /* ignore invalid/corrupt param */ }
  }

  MdPreview.encodeForUrl = encodeForUrl;
  MdPreview.decodeFromUrl = decodeFromUrl;
  MdPreview.loadFromUrl = loadFromUrl;
})(window.MdPreview);
