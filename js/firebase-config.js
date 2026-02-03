// Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyDgswshmRC128JziOr0gvXDfY_iVOpgWuI",
  authDomain: "markdownpreviewer-6e562.firebaseapp.com",
  projectId: "markdownpreviewer-6e562",
  storageBucket: "markdownpreviewer-6e562.firebasestorage.app",
  messagingSenderId: "891363906038",
  appId: "1:891363906038:web:bb45d0118296cb7497f7d7",
  measurementId: "G-YBDZQJYNS2"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firestore
window.MdPreview.db = firebase.firestore();
