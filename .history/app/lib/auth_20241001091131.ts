import { auth, db } from './firebase';
import { signInWithPopup, GoogleAuthProvider, FacebookAuthProvider, signInWithPhoneNumber, ApplicationVerifier, RecaptchaVerifier } from 'firebase/auth';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { submitWaitListEntry, WaitListEntry } from './firestore';

async function checkExistingUser(uid: string, email?: string, phoneNumber?: string, facebookId?: string) {
  // Check if user exists by UID
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    throw new Error('User already signed up');
  }

  // Check for existing user by email, phone, or Facebook ID
  const queries = [];
  if (email) queries.push(where('email', '==', email));
  if (phoneNumber) queries.push(where('phoneNumber', '==', phoneNumber));
  if (facebookId) queries.push(where('facebookId', '==', facebookId));

  for (const condition of queries) {
    const q = query(collection(db, 'users'), condition);
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error('User already exists with this email, phone number, or Facebook account');
    }
  }
}

async function storeUserData(uid: string, formData: any, authProvider: string, email?: string, phoneNumber?: string, facebookId?: string) {
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
    signUpData: email || phoneNumber || facebookId || '',
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
    await checkExistingUser(result.user.uid, result.user.email || undefined, result.user.phoneNumber || undefined);
    await storeUserData(result.user.uid, formData, 'facebook', result.user.email || undefined, result.user.phoneNumber || undefined);
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

