import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  sendEmailVerification,
  UserCredential,
  User
} from 'firebase/auth';
import { app } from './app';

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Configure Google Provider
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication helper functions
export const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithPopup(auth, googleProvider);
};

export const signInWithEmail = (email: string, password: string): Promise<UserCredential> => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const createUser = async (email: string, password: string): Promise<UserCredential> => {
  const userCredential = await createUserWithEmailAndPassword(auth, email, password);
  await sendEmailVerification(userCredential.user);
  return userCredential;
};

export const verifyEmail = (user: User): Promise<void> => {
  return sendEmailVerification(user);
};

// Demo account setup
export const setupDemoAccount = async (): Promise<void> => {
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
setupDemoAccount().catch(console.error);