(function () {
  var MdPreview = window.MdPreview;
  if (!MdPreview) return;

  var textarea = document.getElementById('md-input');
  var preview = document.getElementById('preview');
  var fileInput = document.getElementById('file-input');
  var shareBtn = document.getElementById('share-btn');
  var shareFeedback = document.getElementById('share-feedback');

  var elements = {
    textarea: textarea,
    preview: preview,
    fileInput: fileInput,
    shareBtn: shareBtn,
    shareFeedback: shareFeedback
  };

  MdPreview.initTheme();
  MdPreview.initFonts();

  MdPreview.loadFromUrl(function (decodedText) {
    if (textarea) textarea.value = decodedText;
  });

  MdPreview.initShare(elements);
  MdPreview.initPreview(elements);

  if (MdPreview.updateShareButtonState) MdPreview.updateShareButtonState();
  if (MdPreview.updatePreview) MdPreview.updatePreview();
})();
