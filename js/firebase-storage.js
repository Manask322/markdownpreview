// Ensure MdPreview namespace exists
window.MdPreview = window.MdPreview || {};

(function (MdPreview) {
  // Generate a random short ID
  function generateId(length) {
    length = length || 8;
    var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var result = '';
    for (var i = 0; i < length; i++) {
      result += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return result;
  }

  // Save markdown content to Firebase
  function saveToFirebase(markdown, callback) {
    var shareId = generateId();
    var expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 30); // 30 days from now

    MdPreview.db.collection('shares').doc(shareId).set({
      content: markdown,
      createdAt: firebase.firestore.FieldValue.serverTimestamp(),
      expiresAt: firebase.firestore.Timestamp.fromDate(expiresAt)
    })
    .then(function() {
      callback(null, shareId);
    })
    .catch(function(error) {
      callback(error);
    });
  }

  // Load markdown content from Firebase
  function loadFromFirebase(shareId, callback) {
    MdPreview.db.collection('shares').doc(shareId).get()
      .then(function(doc) {
        if (!doc.exists) {
          callback(new Error('Share not found'));
          return;
        }

        var data = doc.data();

        // Check if expired
        if (data.expiresAt && data.expiresAt.toDate() < new Date()) {
          // Optionally delete expired document
          MdPreview.db.collection('shares').doc(shareId).delete();
          callback(new Error('Share has expired'));
          return;
        }

        callback(null, data.content);
      })
      .catch(function(error) {
        callback(error);
      });
  }

  MdPreview.saveToFirebase = saveToFirebase;
  MdPreview.loadFromFirebase = loadFromFirebase;
})(window.MdPreview);
