import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { submitWaitListEntry, WaitListEntry } from './firestore';

async function checkExistingUser(uid: string, email?: string) {
  // Check if user exists by UID
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    throw new Error('User already signed up');
  }

  // If email is provided, check if it's already in use
  if (email) {
    const emailQuery = query(collection(db, 'users'), where('email', '==', email));
    const emailQuerySnapshot = await getDocs(emailQuery);
    if (!emailQuerySnapshot.empty) {
      throw new Error('Email already in use');
    }
  }
}

async function storeUserData(uid: string, formData: any, authProvider: string, email?: string, phoneNumber?: string) {
  const waitListEntry: WaitListEntry = {
    userType: formData.showPlayerForm ? 'player' : 'organizer',
    location: {
      country: formData.country,
      state: formData.state,
    },
    sports: formData.sports,
    competitionLevels: formData.competitionLevels,
    interestedFeatures: formData.interestedFeatures,
    additionalFeatures: formData.additionalFeatures,
    signupMethod: authProvider as 'google' | 'facebook' | 'phone',
    signUpData: email || phoneNumber || '',
  };

  // Store user data in 'users' collection
  await setDoc(doc(db, 'users', uid), {
    email: email || null,
    phoneNumber: phoneNumber || null,
    authProvider: authProvider,
  });

  // Submit wait list entry
  await submitWaitListEntry(uid, waitListEntry);
}

export async function signUpWithGoogle(formData: any) {
  const provider = new GoogleAuthProvider();
  try {
    const result = await signInWithPopup(auth, provider);
    await checkExistingUser(result.user.uid, result.user.email || undefined);
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
    await checkExistingUser(result.user.uid);
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
    await checkExistingUser(result.user.uid);
    await storeUserData(result.user.uid, formData, 'phone', undefined, result.user.phoneNumber);
    return result.user;
  } catch (error) {
    console.error('Error confirming phone sign-up:', error);
    throw error;
  }
}

