# Vercel Environment Variables Setup

## Required Environment Variables

You need to add the following environment variables to your Vercel project:

### Steps:

1. Go to your Vercel Dashboard: https://vercel.com/dashboard
2. Select your project (`Safe-Ummah`)
3. Go to **Settings** → **Environment Variables**
4. Add each of the following variables:

```
NEXT_PUBLIC_FIREBASE_API_KEY=AIzaSyABixMGbnHZt2EdgZzF88-OOwjpoHfPbGY
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=safe-ummaha.firebaseapp.com
NEXT_PUBLIC_FIREBASE_PROJECT_ID=safe-ummaha
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=safe-ummaha.firebasestorage.app
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=732151225424
NEXT_PUBLIC_FIREBASE_APP_ID=1:732151225424:web:b881c2679d9b6b82ed855

NEXTAUTH_URL=https://your-deployment-url.vercel.app
NEXTAUTH_SECRET=a5ecab6265b42721d35a2ebe80d6325a79fcccd2f935867114e701978436ae6c
BACKEND_API_URL=https://safe-ummah-server.vercel.app
```

5. For each variable, set the **Environment** to:
   - ✅ Production
   - ✅ Preview
   - ✅ Development

6. Click **Save**

7. Redeploy your project

## What Changed in Code

### Fixed Files:
- ✅ `src/app/login/page.jsx` - Fixed Firebase initialization
- ✅ `src/app/register/page.jsx` - Fixed Firebase initialization

### Changes Made:
1. **Lazy Firebase Initialization**: Firebase now initializes only on the client side
2. **Added `export const dynamic = 'force-dynamic'`**: Prevents static rendering during build
3. **Client-side check**: Added `typeof window === 'undefined'` check to prevent server-side initialization

## After Setup

Once you've added the environment variables to Vercel:
1. Trigger a new deployment (or it will auto-deploy if connected to GitHub)
2. The build should complete successfully
3. Your app will be live!

## Note

The error occurred because Vercel was trying to prerender your `/login` page during the build process, but the Firebase environment variables weren't available at build time. The fix prevents server-side rendering for these pages and ensures Firebase only initializes in the browser.
