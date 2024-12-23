import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword,
  GoogleAuthProvider,
  GithubAuthProvider,
  OAuthProvider,
  signInWithPopup,
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

// Authentication helper functions with error handling
export const signInWithGoogle = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, googleProvider);
  } catch (error: any) {
    console.error('Google sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with Google');
  }
};

export const signInWithGithub = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, githubProvider);
  } catch (error: any) {
    console.error('GitHub sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with GitHub');
  }
};

export const signInWithMicrosoft = async (): Promise<UserCredential> => {
  try {
    return await signInWithPopup(auth, microsoftProvider);
  } catch (error: any) {
    console.error('Microsoft sign in error:', error);
    throw new Error(error.message || 'Failed to sign in with Microsoft');
  }
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