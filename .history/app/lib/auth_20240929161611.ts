import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, ApplicationVerifier } from 'firebase/auth';
import { doc, setDoc, getDoc } from 'firebase/firestore';

async function checkExistingUser(identifier: string) {
  const userDoc = await getDoc(doc(db, 'users', identifier));
  if (userDoc.exists()) {
    throw new Error('User already exists');
  }
}

export async function signUpWithGoogle(formData: any) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await checkExistingUser(result.user.email!);
    await setDoc(doc(db, 'users', result.user.uid), {
      ...formData,
      email: result.user.email,
      authProvider: 'google',
    });
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
    await setDoc(doc(db, 'users', result.user.uid), {
      ...formData,
      email: result.user.email,
      authProvider: 'facebook',
    });
    return result.user;
  } catch (error) {
    console.error('Error signing up with Facebook:', error);
    throw error;
  }
}

export async function signUpWithPhone(phoneNumber: string, appVerifier: ApplicationVerifier, formData: any) {
  try {
    const confirmationResult = await signInWithPhoneNumber(auth, phoneNumber, appVerifier);
    // You'll need to implement a way to get the verification code from the user
    // For this example, we'll assume you have a way to get the code
    const verificationCode = await getVerificationCodeFromUser();
    const result = await confirmationResult.confirm(verificationCode);
    await setDoc(doc(db, 'users', result.user.uid), {
      ...formData,
      phoneNumber: result.user.phoneNumber,
      authProvider: 'phone',
    });
    return result.user;
  } catch (error) {
    console.error('Error signing up with phone:', error);
    throw error;
  }
}

// This function is a placeholder. You'll need to implement this based on your UI.
async function getVerificationCodeFromUser(): Promise<string> {
  // Implement your logic to get the verification code from the user
  return '123456'; // This is just a placeholder
}