import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, createUserWithEmailAndPassword } from 'firebase/auth';
import { checkExistingUser, storeUserData } from '../components/form/functions/Submission';
import { FormData } from '../components/WaitListForm';

// Add this new function for email/password sign-up
export async function signUpWithEmailAndPassword(email: string, password: string, formData: FormData) {
  try {
    console.log('Initiating email/password sign-up');
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    console.log('Email/password sign-up successful', userCredential.user.uid);
    
    console.log('Checking for existing user');
    await checkExistingUser(userCredential.user.uid, email);
    console.log('User check completed');
    
    console.log('Storing user data');
    await storeUserData(userCredential.user.uid, formData, 'email', email);
    console.log('User data stored successfully');
    
    return userCredential.user;
  } catch (error) {
    console.error('Error signing up with email/password:', error);
    throw error;
  }
}

export async function signUpWithGoogle(formData: FormData) {
  const provider = new GoogleAuthProvider();
  try {
    console.log('Initiating Google sign-in');
    const result = await signInWithPopup(auth, provider);
    console.log('Google sign-in successful', result.user.uid);
    
    console.log('Checking for existing user');
    await checkExistingUser(result.user.uid, result.user.email || undefined);
    console.log('User check completed');
    
    console.log('Storing user data');
    await storeUserData(result.user.uid, formData, 'google', result.user.email || undefined);
    console.log('User data stored successfully');
    
    return result.user;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    if (error instanceof Error) {
      console.error('Error details:', error.message);
      if ('code' in error) {
        console.error('Error code:', (error as any).code);
      }
    }
    throw error;
  }
}

export async function signUpWithFacebook(formData: FormData) {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    const facebookId = result.user.providerData[0]?.uid;
    await checkExistingUser(result.user.uid, result.user.email || undefined, facebookId);
    await storeUserData(result.user.uid, formData, 'facebook', result.user.email || undefined, facebookId);
    return result.user;
  } catch (error) {
    console.error('Error signing up with Facebook:', error);
    throw error;
  }
}

// Removed the sendSignInLink function as it is no longer needed

