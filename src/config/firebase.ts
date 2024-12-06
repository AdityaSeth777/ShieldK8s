import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

// Demo account setup
export const setupDemoAccount = async () => {
  try {
    await createUserWithEmailAndPassword(auth, 'demo@securitydash.com', 'demo123');
  } catch (error: any) {
    // Ignore if user already exists
    if (error.code !== 'auth/email-already-in-use') {
      console.error('Error setting up demo account:', error);
    }
  }
};

// Initialize demo account
setupDemoAccount();

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword };