import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { signUpWithGoogle, signUpWithFacebook, initiatePhoneSignUp, confirmPhoneSignUp } from '../lib/auth';
import { isFormValid } from './form/functions/Validation';

// Import components from the correct path
import UserTypeSelection from './form/inputs/UserTypeSelection';
import BasicInfo from './form/inputs/BasicInfo';
import SportsSelection from './form/inputs/SportsSelection';
import InterestedFeatures from './form/inputs/InterestedFeatures';
import GeographySelection from './form/inputs/GeographySelection';
import CompetitionLevels from './form/inputs/CompetitionLevels';
import AdditionalFeatures from './form/inputs/AdditionalFeatures';

// Update FormData interface
export interface FormData {
  name: string;
  country: string;
  region: string; // Changed from 'state' to 'region' for consistency
  sports: string[];
  otherSports: string[];
  playerInterestedFeatures: string[];
  organizerInterestedFeatures: string[];
  competitionLevels: string[];
  regionalLevels: string[];
  tournamentLevels: string[];
  additionalFeatures: string;
  userTypes: ("player" | "organizer")[];
}

// Create a type for the setFormData function
const WaitListForm: React.FC = () => {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    sports: [],
    otherSports: [],
    playerInterestedFeatures: [],
    organizerInterestedFeatures: [],
    country: '',
    region: '',
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
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>, method: 'google' | 'facebook' | 'phone') => {
    event.preventDefault();
    console.log('Form Data:', formData);
    const { isValid, errors } = isFormValid(formData);
    if (isValid) {
      await handleSignUp(method);
    } else {
      alert(`Form is not valid: ${errors.join(', ')}`);
    }
  };

  const getPhoneNumberFromUser = async (): Promise<string> => {
    return new Promise((resolve) => {
      const phoneNumber = prompt('Please enter your phone number with country code (e.g., +1234567890):');
      resolve(phoneNumber || '');
    });
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'phone') => {
    handleSubmit()

    try {
      let user;
      switch (method) {
        case 'google':
          user = await signUpWithGoogle(formData);
          break;
        case 'facebook':
          user = await signUpWithFacebook(formData);
          break;
        case 'phone':
          const phoneNumber = await getPhoneNumberFromUser();
          if (!phoneNumber) {
            alert('Phone number is required for phone sign-up.');
            return;
          }
          setPhoneNumber(phoneNumber);
          const confirmation = await initiatePhoneSignUp(phoneNumber, formData);
          setConfirmationResult(confirmation);
          setShowVerificationInput(true);
          return;
      }
      setSignUpSuccess(method);
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign-up.' + error + 'Please try again');
    }
  };

  const handleVerifyCode = async () => {
    if (!confirmationResult) {
      alert('Please request a verification code first.');
      return;
    }

    try {
      await confirmPhoneSignUp(confirmationResult, verificationCode, formData);
      setSignUpSuccess('phone');
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
      <Form.Root className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <UserTypeSelection formData={formData} setFormData={updateFormData} />
        
        {formData.userTypes.length > 0 && (
          <>
            <BasicInfo formData={formData} setFormData={updateFormData} />
            <SportsSelection formData={formData} setFormData={updateFormData} />
            <InterestedFeatures formData={formData} setFormData={updateFormData} />
            <GeographySelection formData={formData} setFormData={updateFormData} />
            <CompetitionLevels formData={formData} setFormData={updateFormData} />
            <AdditionalFeatures formData={formData} setFormData={updateFormData} />

            {signUpSuccess ? (
              <div className="mt-4 text-center text-green-500">
                You have successfully signed up with {signUpSuccess}. You'll be notified upon launch!
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'google')}
                  className="bg-white/90 text-black p-2 rounded-lg"
                >
                  Join Waitlist with Google
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'facebook')}
                  className="bg-blue-600 text-white p-2 rounded-lg"
                >
                  Join Waitlist with Facebook
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'phone')}
                  className="bg-green-600 text-white p-2 rounded-lg"
                >
                  Join Waitlist with Mobile
                </button>
              </div>
            )}

            {showVerificationInput && !signUpSuccess && (
              <div className="mt-4">
                <Form.Field name="verificationCode">
                  <Form.Control asChild>
                    <input
                      type="text"
                      value={verificationCode}
                      onChange={(e) => setVerificationCode(e.target.value)}
                      placeholder="Enter verification code"
                      className="w-full p-2 mb-2 bg-black/50 text-white rounded"
                    />
                  </Form.Control>
                </Form.Field>
                <Form.Submit asChild>
                  <button type="button" onClick={handleVerifyCode} className="bg-green-600 text-white p-2 rounded-lg w-full">
                    Verify Code
                  </button>
                </Form.Submit>
              </div>
            )}
          </>
        )}
      </Form.Root>
      <div id="recaptcha-container"></div>
    </div>
  );
};

export default WaitListForm;