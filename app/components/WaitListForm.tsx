import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { signUpWithGoogle, signUpWithFacebook, sendSignInLink, signUpWithEmailAndPassword } from '../lib/auth';
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
  const [signUpSuccess, setSignUpSuccess] = useState<string | null>(null);
  const [isFacebookComingSoon, setIsFacebookComingSoon] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);

  const validateEmail = (email: string) => {
    const re = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return re.test(String(email).toLowerCase());
  };

  const handleSubmit = async (event: React.MouseEvent<HTMLButtonElement>, method: 'google' | 'facebook' | 'email' | 'emailLink') => {
    event.preventDefault();
    console.log('Form Data:', formData);
    const { isValid, errors } = isFormValid(formData);
    if (isValid) {
      if (method === 'facebook') {
        setIsFacebookComingSoon(true);
        return;
      }
      await handleSignUp(method);
    } else {
      alert(`Form is not valid: ${errors.join(', ')}`);
    }
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'email' | 'emailLink') => {
    try {
      let result;
      switch (method) {
        case 'google':
          result = await signUpWithGoogle(formData);
          break;
        case 'facebook':
          result = await signUpWithFacebook(formData);
          break;
        case 'email':
          if (!email || !password) {
            alert('Email and password are required for email sign-up.');
            return;
          }
          if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
          }
          result = await signUpWithEmailAndPassword(email, password, formData);
          break;
        case 'emailLink':
          if (!email) {
            alert('Email is required for email link sign-up.');
            return;
          }
          if (!validateEmail(email)) {
            alert('Please enter a valid email address.');
            return;
          }
          result = await sendSignInLink(email, formData);
          break;
      }
      if (method === 'emailLink') {
        setSignUpSuccess('email-link-sent');
      } else {
        setSignUpSuccess(method);
      }
    } catch (error) {
      console.error('Error signing up:', error);
      alert('An error occurred during sign-up. ' + error + ' Please try again.');
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
              <div className="mt-4 text-center text-green-600 bg-green-100 p-4 rounded-lg shadow">
                <h3 className="text-lg font-semibold">Sign-up Successful!</h3>
                {signUpSuccess === 'email-link-sent' ? (
                  <p>A sign-in link has been sent to your email. Please check your inbox to complete the sign-up process.</p>
                ) : (
                  <p>You have successfully signed up with {signUpSuccess}. You'll be notified upon launch! :D</p>
                )}
              </div>
            ) : (
              <div className="flex flex-col space-y-2 mt-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  className="w-full p-2 rounded-full bg-black/50 text-white"
                />
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Password"
                    className="w-full p-2 rounded-full bg-black/50 text-white"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'email')}
                  className="bg-green-500 text-white p-2 rounded-lg flex items-center justify-center"
                >
                  Sign up with Email and Password
                </button>
                
                <div className="text-center">or</div>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'emailLink')}
                  className="bg-blue-500 text-white p-2 rounded-lg flex items-center justify-center"
                >
                  <img src="/icons/email.svg" alt="Email" className="w-6 h-6 mr-2" />
                  Sign up with Email Link
                </button>
                <button
                  type="button"
                  onClick={(e) => handleSubmit(e, 'google')}
                  className="bg-white/90 text-black p-2 rounded-lg flex items-center justify-center"
                >
                  <img src="/icons/google.svg" alt="Google" className="w-7 h-7 mr-2" /> Continue with Google
                </button>
                {isFacebookComingSoon ? (
                  <div className="bg-gray-300 text-black p-2 rounded-lg text-center">
                    Coming soon!
                  </div>
                ) : (
                  <button
                    type="button"
                    onClick={(e) => handleSubmit(e, 'facebook')}
                    className="bg-blue-600 text-white p-2 rounded-lg flex items-center justify-center"
                  >
                    <img src="/icons/facebook.svg" alt="Facebook" className="w-6 h-6 mr-2" /> Continue with Facebook
                  </button>
                )}
              </div>
            )}
          </>
        )}
      </Form.Root>
    </div>
  );
};

export default WaitListForm;