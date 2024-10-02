import { auth } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, RecaptchaVerifier } from 'firebase/auth';
import { checkExistingUser, storeUserData } from '../components/form/functions/Submission';
import { FormData } from '../components/WaitListForm';

export async function signUpWithGoogle(formData: FormData) {
  const provider = new GoogleAuthProvider();
  try {
    console.log('Initiating Google sign-in');
    const result = await signInWithPopup(auth, provider);
    console.log('Google sign-in successful', result.user.uid);
    
    console.log('Checking for existing user');
    await checkExistingUser(result.user.uid, result.user.email || undefined, result.user.phoneNumber || undefined);
    console.log('User check completed');
    
    console.log('Storing user data');
    await storeUserData(result.user.uid, formData, 'google', result.user.email || undefined, result.user.phoneNumber || undefined);
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
    await checkExistingUser(result.user.uid, result.user .email || undefined, result.user.phoneNumber || undefined, facebookId);
    await storeUserData(result.user.uid, formData, 'facebook', result.user.email || undefined, result.user.phoneNumber || undefined, facebookId);
    return result.user;
  } catch (error) {
    console.error('Error signing up with Facebook:', error);
    throw error;
  }
}

export async function signUpWithEmail(email: string, password: string, formData: FormData) {
  // Implement email/password sign-up logic here
  // This function should create a user with email and password
  // and store user data using storeUserData
}

export async function initiatePhoneSignUp(phoneNumber: string, formData: FormData) {
  try {
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

export async function confirmPhoneSignUp(confirmationResult: any, verificationCode: string, formData: FormData) {
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

