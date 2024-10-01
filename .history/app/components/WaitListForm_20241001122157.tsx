import React, { useState } from 'react';
import { signUpWithGoogle, signUpWithFacebook, initiatePhoneSignUp, confirmPhoneSignUp } from '../lib/auth';
import { auth } from '../lib/firebase';
// Remove unused import
// import { RecaptchaVerifier } from 'firebase/auth';

// Import components from the correct path
import UserTypeSelection from '../components/form/UserTypeSelection';
import BasicInfo from '../components/form/BasicInfo';
import SportsSelection from '../components/form/SportsSelection';
import InterestedFeatures from '../components/form/InterestedFeatures';
import GeographySelection from '../components/form/GeographySelection';
import CompetitionLevels from '../components/form/CompetitionLevels';
import AdditionalFeatures from '../components/form/AdditionalFeatures';

// Update FormData interface
export interface FormData {
  name: string;
  sports: string[];
  otherSports: string[];
  playerInterestedFeatures: string[];
  organizerInterestedFeatures: string[];
  country: string;
  state: string;
  competitionLevels: string[];
  regionalLevels: string[];
  tournamentLevels: string[];
  additionalFeatures: string;
  userTypes: ("player" | "organizer")[];
}

// Create a type for the setFormData function
type SetFormData = React.Dispatch<React.SetStateAction<FormData>>;

const WaitListForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sports: [],
    otherSports: [],
    playerInterestedFeatures: [],
    organizerInterestedFeatures: [],
    country: '',
    state: '',
    competitionLevels: [],
    regionalLevels: [],
    tournamentLevels: [],
    additionalFeatures: '',
    userTypes: []
  });
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationCode, setVerificationCode] = useState('');
  const [showVerificationInput, setShowVerificationInput] = useState(false);
  const [confirmationResult, setConfirmationResult] = useState<any>(null);

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      formData.country !== '' &&
      formData.state !== '' &&
      formData.sports.length > 0 &&
      formData.competitionLevels.length > 0 &&
      formData.userTypes.length > 0 &&
      (formData.userTypes.includes('player') ? 
        (formData.playerInterestedFeatures.length >= 3 && formData.playerInterestedFeatures.length <= 5 && formData.regionalLevels.length > 0) : true) &&
      (formData.userTypes.includes('organizer') ? 
        (formData.organizerInterestedFeatures.length >= 3 && formData.organizerInterestedFeatures.length <= 5 && formData.tournamentLevels.length > 0) : true)
    );
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
  };

  const getPhoneNumberFromUser = async (): Promise<string> => {
    return new Promise((resolve) => {
      const phoneNumber = prompt('Please enter your phone number with country code (e.g., +1234567890):');
      resolve(phoneNumber || '');
    });
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'phone') => {
    if (!isFormValid()) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    const completeFormData = {
      ...formData,
      userTypes: formData.userTypes,
    };

    try {
      let user;
      switch (method) {
        case 'google':
          user = await signUpWithGoogle(completeFormData);
          break;
        case 'facebook':
          user = await signUpWithFacebook(completeFormData);
          break;
        case 'phone':
          const phoneNumber = await getPhoneNumberFromUser();
          if (!phoneNumber) {
            alert('Phone number is required for phone sign-up.');
            return;
          }
          setPhoneNumber(phoneNumber);
          const confirmation = await initiatePhoneSignUp(phoneNumber, completeFormData);
          setConfirmationResult(confirmation);
          setShowVerificationInput(true);
          return;
      }
      console.log('User signed up:', user);
      // Handle successful sign-up (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign-up authentification. Please try again.');
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult) {
      alert('Please request a verification code first.');
      return;
    }

    try {
      const completeFormData = {
        ...formData,
        userTypes: formData.userTypes,
      };
      const user = await confirmPhoneSignUp(confirmationResult, verificationCode, completeFormData);
      console.log('User signed up with phone:', user);
      // Handle successful sign-up (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error verifying code:', error);
      alert('Invalid verification code. Please try again.');
    }
  };

  const updateFormData = (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => {
    setFormData(prevData => {
      const newData = typeof updater === 'function' ? updater(prevData) : updater;
      return { ...prevData, ...newData };
    });
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <form className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <UserTypeSelection 
          formData={formData} 
          setFormData={updateFormData}
        />
        
        {formData.userTypes.length > 0 && (
          <>
            <BasicInfo formData={formData} handleInputChange={handleInputChange} />
            <SportsSelection 
              formData={formData} 
              setFormData={updateFormData}
            />
            <InterestedFeatures 
              formData={formData} 
              setFormData={updateFormData}
            />
            <GeographySelection 
              formData={formData} 
              setFormData={updateFormData} 
            />
            <CompetitionLevels 
              formData={formData} 
              setFormData={updateFormData} 
            />
            <AdditionalFeatures
             formData={formData}
             setFormData={updateFormData}
            />

            <div className="flex flex-col space-y-2 mt-4">
              <button type="button" onClick={() => handleSignUp('google')} className="bg-blue-600 text-white p-2 rounded-lg">
                Join Waitlist with Google
              </button>
              <button type="button" onClick={() => handleSignUp('facebook')} className="bg-blue-800 text-white p-2 rounded-lg">
                Join Waitlist with Facebook
              </button>
              <button type="button" onClick={() => handleSignUp('phone')} className="bg-green-600 text-white p-2 rounded-lg">
                Join Waitlist with Mobile
              </button>
            </div>

            {showVerificationInput && (
              <div className="mt-4">
                <input
                  type="text"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  placeholder="Enter verification code"
                  className="w-full p-2 mb-2 bg-black/50 text-white rounded"
                />
                <button type="button" onClick={handleVerifyCode} className="bg-green-600 text-white p-2 rounded-lg w-full">
                  Verify Code
                </button>
              </div>
            )}
          </>
        )}
      </form>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default WaitListForm;