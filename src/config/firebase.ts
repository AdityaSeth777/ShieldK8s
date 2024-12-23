import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword as firebaseSignInWithEmail, 
  createUserWithEmailAndPassword as firebaseCreateUser,
  GoogleAuthProvider,
  signInWithRedirect,
  sendEmailVerification,
  Auth,
  UserCredential
} from 'firebase/auth';

// Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth: Auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication helper functions
export const signInWithGoogle = async (): Promise<UserCredential> => {
  return signInWithRedirect(auth, googleProvider);
};

export const signInWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  return firebaseSignInWithEmail(auth, email, password);
};

export const createUserWithEmailAndPassword = async (email: string, password: string): Promise<UserCredential> => {
  const userCredential = await firebaseCreateUser(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

// Demo account setup
export const setupDemoAccount = async (): Promise<void> => {
  try {
    await firebaseCreateUser(auth, 'demo@securitydash.com', 'demo123');
  } catch (error: any) {
    // Ignore if user already exists
    if (error.code !== 'auth/email-already-in-use') {
      console.error('Error setting up demo account:', error);
    }
  }
};

// Initialize demo account
setupDemoAccount().catch(console.error);

export { auth, googleProvider };