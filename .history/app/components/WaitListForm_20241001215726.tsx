import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { signUpWithGoogle, signUpWithFacebook, initiatePhoneSignUp, confirmPhoneSignUp } from '../lib/auth';

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

  const isFormValid = () => {
    const errors: string[] = [];

    if (formData.name.trim() === '') errors.push('Name is required');
    if (formData.country === '') errors.push('Country is required');
    if (formData.region === '') errors.push('Region is required');
    if (formData.sports.length === 0) errors.push('At least one sport must be selected');
    if (formData.competitionLevels.length === 0) errors.push('At least one competition level must be selected');
    if (formData.userTypes.length === 0) errors.push('At least one user type must be selected');

    if (formData.userTypes.includes('player')) {
      if (formData.playerInterestedFeatures.length < 3 || formData.playerInterestedFeatures.length > 5) {
        errors.push('Players must select 3-5 interested features');
      }
      if (formData.regionalLevels.length === 0) errors.push('Players must select at least one regional level');
    }

    if (formData.userTypes.includes('organizer')) {
      if (formData.organizerInterestedFeatures.length < 3 || formData.organizerInterestedFeatures.length > 5) {
        errors.push('Organizers must select 3-5 interested features');
      }
      if (formData.tournamentLevels.length === 0) errors.push('Organizers must select at least one tournament level');
    }

    if (errors.length > 0) {
      alert('Please correct the following errors:\n\n' + errors.join('\n'));
      return false;
    }

    return true;
  };

  const getPhoneNumberFromUser = async (): Promise<string> => {
    return new Promise((resolve) => {
      const phoneNumber = prompt('Please enter your phone number with country code (e.g., +1234567890):');
      resolve(phoneNumber || '');
    });
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'phone') => {
    if (!isFormValid()) return;

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

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (isFormValid()) {
      // Proceed with form submission
      handleSignUp('google'); // or whichever method you want to use
    }
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <Form.Root onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
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
              <Form.Submit asChild>
                <div className="flex flex-col space-y-2 mt-4">
                  <button type="submit" className="bg-blue-600 text-white p-2 rounded-lg">
                    Join Waitlist
                  </button>
                </div>
              </Form.Submit>
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