(function (MdPreview) {
  function initPreview(elements) {
    var textarea = elements.textarea;
    var preview = elements.preview;
    var fileInput = elements.fileInput;

    function updatePreview() {
      var raw = textarea.value || '';
      preview.innerHTML = raw ? marked.parse(raw) : '<p class="muted">Preview will appear here.</p>';
    }

    textarea.addEventListener('input', function () {
      updatePreview();
      if (MdPreview.updateShareButtonState) MdPreview.updateShareButtonState();
    });

    fileInput.addEventListener('change', function () {
      var file = fileInput.files && fileInput.files[0];
      if (!file) return;
      var reader = new FileReader();
      reader.onload = function () {
        textarea.value = reader.result;
        if (MdPreview.updateShareButtonState) MdPreview.updateShareButtonState();
        updatePreview();
      };
      reader.readAsText(file);
      fileInput.value = '';
    });

    MdPreview.updatePreview = updatePreview;
  }

  window.MdPreview.initPreview = initPreview;
})(window.MdPreview);
