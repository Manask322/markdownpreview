# Firebase Setup Guide

Follow these steps to complete the Firebase integration for your Markdown Preview app.

## Step 1: Create Firebase Project

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Click **"Add project"** or **"Create a project"**
3. Enter project name: `markdown-preview` (or your preferred name)
4. Disable Google Analytics (not needed for this project)
5. Click **"Create project"** and wait for it to finish

## Step 2: Register Web App

1. In your Firebase project dashboard, click the **Web icon** (`</>`)
2. Register your app:
   - App nickname: `Markdown Preview`
   - **Do NOT** check "Also set up Firebase Hosting"
3. Click **"Register app"**
4. You'll see a configuration object that looks like this:

```javascript
const firebaseConfig = {
  apiKey: "AIza...",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abc123"
};
```

5. **Copy this entire configuration object**
6. Click **"Continue to console"**

## Step 3: Update Firebase Configuration File

1. Open `js/firebase-config.js` in your project
2. Replace the placeholder values with your actual Firebase configuration:

```javascript
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",              // Replace with your actual apiKey
  authDomain: "YOUR_PROJECT_ID.firebaseapp.com",  // Replace with your actual authDomain
  projectId: "YOUR_PROJECT_ID",        // Replace with your actual projectId
  storageBucket: "YOUR_PROJECT_ID.appspot.com",   // Replace with your actual storageBucket
  messagingSenderId: "YOUR_MESSAGING_SENDER_ID",  // Replace with your actual messagingSenderId
  appId: "YOUR_APP_ID"                 // Replace with your actual appId
};
```

## Step 4: Create Firestore Database

1. In Firebase Console, click **"Firestore Database"** in the left menu
2. Click **"Create database"**
3. Choose **"Start in production mode"**
4. Select a database location (choose closest to your users, e.g., `us-central` or `europe-west`)
5. Click **"Enable"**

## Step 5: Configure Security Rules

1. Once Firestore is created, go to the **"Rules"** tab
2. Replace the default rules with:

```
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /shares/{shareId} {
      allow read: if true;
      allow create: if true;
      allow update, delete: if false;
    }
  }
}
```

3. Click **"Publish"**

### What these rules do:
- ✅ Anyone can read shared markdown content
- ✅ Anyone can create new shares
- ❌ No one can update or delete shares (prevents tampering)

## Step 6: Test It Out!

1. Open your `index.html` in a browser
2. Type some markdown content
3. Click **"Copy preview link"**
4. You should see: "Copied! (expires in 30 days)"
5. Open the link in a new tab - your content should load!

## Optional: Set up Automatic Cleanup

To automatically delete expired shares and save storage:

1. In Firebase Console, go to **"Extensions"**
2. Install the **"Delete Collections"** extension
3. Configure it to:
   - Collection path: `shares`
   - Document field: `expiresAt`
   - Delete documents where: `expiresAt < now()`

OR use Firebase Functions (requires paid plan):

```javascript
exports.cleanupExpiredShares = functions.pubsub
  .schedule('every 24 hours')
  .onRun(async (context) => {
    const now = admin.firestore.Timestamp.now();
    const expired = await admin.firestore()
      .collection('shares')
      .where('expiresAt', '<', now)
      .get();

    const batch = admin.firestore().batch();
    expired.docs.forEach(doc => batch.delete(doc.ref));
    await batch.commit();
  });
```

## Troubleshooting

**Issue: "Failed to create share link"**
- Check browser console for errors
- Verify Firebase config is correct in `js/firebase-config.js`
- Ensure Firestore is enabled and rules are published

**Issue: "Share not found" when opening link**
- Content may have expired (30 days)
- Share ID may be incorrect
- Check Firestore security rules allow reads

**Issue: Nothing happens when clicking "Copy preview link"**
- Open browser console to see errors
- Verify all Firebase scripts are loading (check Network tab)
- Make sure you're testing on a web server (not `file://` protocol)

## Firebase Costs

- **Free tier includes:**
  - 50,000 reads/day
  - 20,000 writes/day
  - 1 GB storage

For a personal markdown preview tool, you'll likely stay within the free tier indefinitely!

## Next Steps

Once Firebase is set up:
- Your share links will work for any content size (no more "Content too long" errors)
- Links will be shorter and cleaner (`?id=abc123` instead of long compressed strings)
- Shared content expires automatically after 30 days
- Old URL-encoded links (`?md=...`) will continue to work as a fallback
