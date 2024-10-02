import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { submitWaitListEntry, WaitListEntry } from './firestore';


export async function signUpWithGoogle(formData: any) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await checkExistingUser(result.user.uid, result.user.email || undefined, result.user.phoneNumber || undefined);
    await storeUserData(result.user.uid, formData, 'google', result.user.email || undefined, result.user.phoneNumber || undefined);
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
    const facebookId = result.user.providerData[0]?.uid;
    await checkExistingUser(result.user.uid, result.user.email || undefined, result.user.phoneNumber || undefined, facebookId);
    await storeUserData(result.user.uid, formData, 'facebook', result.user.email || undefined, result.user.phoneNumber || undefined, facebookId);
    return result.user;
  } catch (error) {
    console.error('Error signing up with Facebook:', error);
    throw error;
  }
}

export async function initiatePhoneSignUp(phoneNumber: string, formData: any) {
  try {
    // Check if phone number is already in use before initiating sign-up
    await checkExistingUser('', undefined, phoneNumber);
    const appVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      size: 'invisible',
      callback: (r: any) => {
        console.log('recaptcha callback', r);
      }
    });
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
    await checkExistingUser(result.user.uid, result.user.email || undefined, result.user.phoneNumber || undefined);
    await storeUserData(result.user.uid, formData, 'phone', result.user.email || undefined, result.user.phoneNumber || undefined);
    return result.user;
  } catch (error) {
    console.error('Error confirming phone sign-up:', error);
    throw error;
  }
}

