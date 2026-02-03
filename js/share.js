(function (MdPreview) {
  function initShare(elements) {
    var shareBtn = elements.shareBtn;
    var shareFeedback = elements.shareFeedback;

    function showShareFeedback(msg, isError) {
      shareFeedback.textContent = msg;
      shareFeedback.className = 'share-feedback' + (isError ? ' error' : '');
      if (shareFeedback._timer) clearTimeout(shareFeedback._timer);
      if (!isError) {
        shareFeedback._timer = setTimeout(function () { shareFeedback.textContent = ''; }, 2000);
      }
    }

    function updateShareButtonState() {
      var textarea = document.getElementById('md-input');
      shareBtn.disabled = !textarea || !textarea.value.trim();
    }

    shareBtn.addEventListener('click', function () {
      var textarea = document.getElementById('md-input');
      var raw = textarea ? textarea.value || '' : '';
      if (!raw.trim()) {
        showShareFeedback('Add some markdown first', true);
        return;
      }

      // Try Firebase first if available
      if (MdPreview.saveToFirebase) {
        shareBtn.disabled = true;
        showShareFeedback('Creating share link...', false);

        MdPreview.saveToFirebase(raw, function(error, shareId) {
          shareBtn.disabled = false;
          if (error) {
            console.error('Firebase save error:', error);
            showShareFeedback('Failed to create share link: ' + error.message, true);
            return;
          }
          var url = location.origin + location.pathname + '?id=' + shareId;
          navigator.clipboard.writeText(url).then(function () {
            showShareFeedback('Copied! (expires in 30 days)', false);
          }).catch(function () {
            showShareFeedback('Could not copy to clipboard', true);
          });
        });
      } else {
        // Fallback to URL encoding if Firebase not available
        var encoded = MdPreview.encodeForUrl(raw);
        if (encoded.length > MdPreview.MAX_ENCODED_LENGTH) {
          showShareFeedback('Content too long to share via link; consider shortening.', true);
          return;
        }
        var url = location.origin + location.pathname + '?md=' + encodeURIComponent(encoded);
        navigator.clipboard.writeText(url).then(function () {
          showShareFeedback('Copied!', false);
        }).catch(function () {
          showShareFeedback('Could not copy to clipboard', true);
        });
      }
    });

    MdPreview.updateShareButtonState = updateShareButtonState;
  }

  window.MdPreview.initShare = initShare;
})(window.MdPreview);
