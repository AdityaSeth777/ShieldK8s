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

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const githubProvider = new GithubAuthProvider();
export const microsoftProvider = new OAuthProvider('microsoft.com');

// Configure providers
googleProvider.setCustomParameters({
  prompt: 'select_account'
});

githubProvider.setCustomParameters({
  allow_signup: 'true'
});

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