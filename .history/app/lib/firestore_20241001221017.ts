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
