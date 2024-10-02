import { db } from '../../../lib/firebase';
import { doc, setDoc, serverTimestamp, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { FormData } from '../../WaitListForm';
import { isFormValid } from './Validation'; // Import the isFormValid function

export interface UserEntry {
  name: string; // Add this line
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
  email: string | null;
  phoneNumber: null; // Change this line
  facebookId: string | null;
  authProvider: string;
  timestamp: any; // Using 'any' for serverTimestamp()
}

export async function checkExistingUser(uid: string, email?: string, facebookId?: string) {
  // Check if user exists by UID
  const userDoc = await getDoc(doc(db, 'users', uid));
  if (userDoc.exists()) {
    throw new Error('User already signed up');
  }

  // Check for existing user by email, phone, or Facebook ID
  const queries = [];
  if (email) queries.push(where('email', '==', email));
  if (facebookId) queries.push(where('facebookId', '==', facebookId));

  for (const condition of queries) {
    const q = query(collection(db, 'users'), condition);
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      throw new Error('User already exists with this email, phone number, or Facebook account');
    }
  }
}

export async function storeUserData(uid: string, formData: FormData, authProvider: string, email?: string, phoneNumber?: string, facebookId?: string) {
  // Validate form data before proceeding
  const { isValid, errors } = isFormValid(formData);
  if (!isValid) {
    throw new Error(`Form is not valid: ${errors.join(', ')}`);
  }

  const UserEntry: UserEntry = {
    name: formData.name, // Add this line
    userTypes: formData.userTypes,
    location: {
      country: formData.country,
      state: formData.region,
    },
    sports: formData.sports,
    competitionLevels: formData.competitionLevels || [],
    interestedFeatures: [...formData.playerInterestedFeatures, ...formData.organizerInterestedFeatures],
    additionalFeatures: formData.additionalFeatures,
    signupMethod: authProvider as 'google' | 'facebook' | 'phone',
    signUpData: email || phoneNumber || facebookId || '',
    regionalLevels: formData.regionalLevels || [],
    tournamentLevels: formData.tournamentLevels || [],
    email: email || null,
    phoneNumber: phoneNumber || null,
    facebookId: facebookId || null,
    authProvider: authProvider,
    timestamp: serverTimestamp(),
  };

  // Store unified user data in 'users' collection
  try {
    await setDoc(doc(db, 'users', uid), UserEntry);
    console.log('User data stored successfully');
  } catch (error) {
    console.error('Error storing user data:', error);
    if (error instanceof Error && error.message.includes('permission-denied')) {
      throw new Error('Unable to save user data due to permission issues. Please try again or contact support.');
    }
    throw error;
  }
}
