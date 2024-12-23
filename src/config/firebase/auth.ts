import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithRedirect,
  sendEmailVerification,
  UserCredential,
  User
} from 'firebase/auth';
import { app } from './app';

// Initialize auth
export const auth = getAuth(app);

// Initialize providers
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure Google Provider
googleProvider.addScope('email');
googleProvider.addScope('profile');

// Configure GitHub Provider
githubProvider.addScope('user:email');
githubProvider.addScope('read:user');

// Configure Microsoft Provider
microsoftProvider.addScope('user.read');
microsoftProvider.setCustomParameters({
  prompt: 'select_account'
});

// Authentication helper functions
export const signInWithGoogle = (): Promise<UserCredential> => {
  return signInWithRedirect(auth, googleProvider);
};

export const signInWithGithub = (): Promise<UserCredential> => {
  return signInWithRedirect(auth, githubProvider);
};

export const signInWithMicrosoft = (): Promise<UserCredential> => {
  return signInWithRedirect(auth, microsoftProvider);
};

export const signInWithEmail = async (email: string, password: string): Promise<UserCredential> => {
  try {
    return await signInWithEmailAndPassword(auth, email, password);
  } catch (error: any) {
    console.error('Email sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with email');
  }
};

export const createUser = async (email: string, password: string): Promise<UserCredential> => {
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    await sendEmailVerification(userCredential.user);
    return userCredential;
  } catch (error: any) {
    console.error('User creation error:', error);
    throw new Error(error.message || 'Failed to create account');
  }
};

export const verifyEmail = async (user: User): Promise<void> => {
  try {
    await sendEmailVerification(user);
  } catch (error: any) {
    console.error('Email verification error:', error);
    throw new Error(error.message || 'Failed to send verification email');
  }
};