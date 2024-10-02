import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';



export interface WaitListEntry {
  userTypes: ('player' | 'organizer')[];
  location: {
    country: string;
    state: string;
  };
  sports: string[];
  competitionLevels: string[];
  interestedFeatures: string[];
  additionalFeatures?: string;
  signupMethod: 'google' | 'facebook' | 'phone';
  signUpData: string;
  regionalLevels?: string[];
  tournamentLevels?: string[];
}

export async function submitWaitListEntry(userId: string, data: WaitListEntry) {
  try {
    const { userTypes, location, ...rest } = data;
    const docRef = doc(db, 'waitListEntries', `${location.country}_${location.state}`, userId);

    await setDoc(docRef, {
      userTypes,
      ...rest,
      timestamp: serverTimestamp(),
    });

    console.log('Wait list entry submitted successfully');
  } catch (error) {
    console.error('Error submitting wait list entry:', error);
    throw error;
  }
}

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
    userTypes: formData.userTypes,
    location: {
      country: formData.country,
      state: formData.state,
    },
    sports: formData.sports,
    competitionLevels: formData.competitionLevels || [],
    interestedFeatures: formData.interestedFeatures,
    additionalFeatures: formData.additionalFeatures,
    signupMethod: authProvider as 'google' | 'facebook' | 'phone',
    signUpData: email || phoneNumber || facebookId || '',
    regionalLevels: formData.regionalLevels || [],
    tournamentLevels: formData.tournamentLevels || [],
  };

  // Store user data in 'users' collection
  await setDoc(doc(db, 'users', uid), {
    email: email || null,
    phoneNumber: phoneNumber || null,
    facebookId: facebookId || null,
    authProvider: authProvider,
    userTypes: formData.userTypes,
  });

  // Submit wait list entry
  await submitWaitListEntry(uid, waitListEntry);
}
