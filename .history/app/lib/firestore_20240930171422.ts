import { db } from './firebase';
import { doc, setDoc, serverTimestamp } from 'firebase/firestore';

export interface WaitListEntry {
  userType: 'player' | 'organizer';
  location: {
    country: string;
    state: string;
  };
  sports: string[];
  competitionLevels: string[];
  interestedFeatures: string[];
  additionalFeatures?: string;
  signupMethod: 'google' | 'facebook' | 'phone';
  signUpData: string; // email or phone number
}

export async function submitWaitListEntry(userId: string, data: WaitListEntry) {
  try {
    const { userType, location, ...rest } = data;
    const docRef = doc(db, 'waitListEntries', userType, `${location.country}_${location.state}`, userId);

    await setDoc(docRef, {
      ...rest,
      timestamp: serverTimestamp(),
    });

    console.log('Wait list entry submitted successfully');
  } catch (error) {
    console.error('Error submitting wait list entry:', error);
    throw error;
  }
}