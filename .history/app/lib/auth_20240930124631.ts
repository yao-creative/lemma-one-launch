import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

async function checkExistingUser(identifier: string) {
  const userDoc = await getDoc(doc(db, 'users', identifier));
  if (userDoc.exists()) {
    throw new Error('User already exists');
  }
}

async function storeUserData(uid: string, formData: any, authProvider: string, email?: string, phoneNumber?: string) {
  await setDoc(doc(db, 'users', uid), {
    ...formData,
    email,
    phoneNumber,
    authProvider,
  });
}

export async function signUpWithGoogle(formData: any) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await checkExistingUser(result.user.email!);
    await storeUserData(result.user.uid, formData, 'google', result.user.email || undefined);
    return result.user;
  } catch (error) {
    console.error('Error signing up with Google:', error);
    throw error;
  }
}

export async function signUpWithFacebook(formData: any) {
  const provider = new FacebookAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await checkExistingUser(result.user.email!);
    await storeUserData(result.user.uid, formData, 'facebook', result.user.email || undefined);
    return result.user;
  } catch (error) {
    console.error('Error signing up with Facebook:', error);
    throw error;
  }
}

export async function initiatePhoneSignUp(phoneNumber: string, formData: any) {
  try {
    await checkExistingUser(phoneNumber);
    const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    return confirmationResult;
  } catch (error) {
    console.error('Error initiating phone sign-up:', error);
    throw error;
  }
}

export async function confirmPhoneSignUp(confirmationResult: any, verificationCode: string, formData: any) {
  try {
    const result = await confirmationResult.confirm(verificationCode);
    await storeUserData(result.user.uid, formData, 'phone', undefined, result.user.phoneNumber);
    return result.user;
  } catch (error) {
    console.error('Error confirming phone sign-up:', error);
    throw error;
  }
}

