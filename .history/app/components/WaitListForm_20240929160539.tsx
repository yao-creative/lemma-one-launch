import React, { useState, useEffect } from 'react';

interface WaitListFormProps {
  showPlayerForm: boolean;
}

// Define the type for statesByCountry
type StatesByCountry = {
  Brunei: string[];
  Cambodia: string[];
  Indonesia: string[];
  Laos: string[];
  Malaysia: string[];
  Myanmar: string[];
  Philippines: string[];
  Singapore: string[];
  Thailand: string[];
  Vietnam: string[];
  'Timor-Leste': string[];
  'Hong Kong': string[];
};

const WaitListForm: React.FC<WaitListFormProps> = ({ showPlayerForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    sports: [] as string[],
    otherSports: [] as string[],
    interestLevel: '',
    features: '',
    interestedFeatures: [] as string[],
  });
  const [showOtherSports, setShowOtherSports] = useState(false);
  const [otherSportInput, setOtherSportInput] = useState('');
  const [tournamentLevels, setTournamentLevels] = useState<string[]>([]);
  const [regionalLevels, setRegionalLevels] = useState<string[]>([]);
  const [otherLevels, setOtherLevels] = useState<string[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [showOtherFeatures, setShowOtherFeatures] = useState(false);
  const [otherFeatureInput, setOtherFeatureInput] = useState('');

  const southEastAsianCountries = [
    'Brunei', 'Cambodia', 'Indonesia', 'Laos', 'Malaysia', 'Myanmar', 
    'Philippines', 'Singapore', 'Thailand', 'Vietnam', 'Timor-Leste', 'Hong Kong'
  ];
  
  // Ensure statesByCountry is properly typed
  const statesByCountry: StatesByCountry = {
    'Brunei': ['Belait', 'Brunei-Muara', 'Temburong', 'Tutong'],
    'Cambodia': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Preah Sihanouk', 'Kampong Cham', 'Kandal'],
    'Indonesia': [
      'Aceh', 'Bali', 'Banten', 'Central Java', 'East Java', 'Jakarta', 
      'West Java', 'Yogyakarta', 'East Kalimantan', 'North Sumatra', 'West Sumatra', 'Papua'
    ],
    'Laos': ['Vientiane', 'Savannakhet', 'Champasak', 'Luang Prabang', 'Oudomxay', 'Xieng Khouang'],
    'Malaysia': [
      'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak', 'Kelantan', 'Sabah', 'Sarawak', 
      'Pahang', 'Terengganu', 'Negeri Sembilan', 'Melaka', 'Kedah', 'Perlis'
    ],
    'Myanmar': [
      'Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Sagaing', 'Shan', 'Rakhine', 'Kachin', 'Chin'
    ],
    'Philippines': [
      'Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Quezon City', 'Makati', 
      'Zamboanga', 'Baguio', 'Cagayan de Oro'
    ],
    'Singapore': ['Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region'],
    'Thailand': [
      'Bangkok', 'Chiang Mai', 'Chiang Rai', 'Phuket', 'Pattaya', 'Khon Kaen', 
      'Nakhon Ratchasima', 'Krabi', 'Surat Thani'
    ],
    'Vietnam': [
      'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Nha Trang', 'Hai Phong', 
      'Can Tho', 'Hue', 'Vung Tau', 'Quang Ninh'
    ],
    'Timor-Leste': ['Dili', 'Baucau', 'Bobonaro', 'Viqueque', 'Lautém', 'Liquiçá'],
    'Hong Kong': ['Hong Kong Island', 'Kowloon', 'New Territories']
  };
  

  useEffect(() => {
    // Reset state when country changes
    setState('');
  }, [country]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value, type } = e.target;

    if (type === 'select-multiple') {
      const select = e.target as HTMLSelectElement;
      const selectedOptions = Array.from(select.selectedOptions).map(option => option.value);
      setFormData(prevData => ({
        ...prevData,
        [name]: selectedOptions,
      }));
    } else {
      setFormData(prevData => ({
        ...prevData,
        [name]: value,
      }));
    }
  };

  const isFormValid = () => {
    return (
      formData.name.trim() !== '' &&
      country !== '' &&
      state !== '' &&
      formData.sports.length > 0 &&
      formData.interestedFeatures.length > 0 &&
      regionalLevels.length > 0 &&
      otherLevels.length > 0
    );
  };

  const handleSignUp = async (method: 'google' | 'facebook' | 'phone') => {
    if (!isFormValid()) {
      alert('Please fill in all required fields before submitting.');
      return;
    }

    try {
      let user;
      const completeFormData = {
        ...formData,
        country,
        state,
        regionalLevels,
        otherLevels,
        additionalFeatures,
      };

      switch (method) {
        case 'google':
          user = await signUpWithGoogle(completeFormData);
          break;
        case 'facebook':
          user = await signUpWithFacebook(completeFormData);
          break;
        case 'phone':
          // For phone sign-up, you'll need to implement a way to get the phone number and handle verification
          // This is a placeholder and needs to be implemented
          const phoneNumber = await getPhoneNumberFromUser();
          const appVerifier = new RecaptchaVerifier('recaptcha-container', {}, auth);
          user = await signUpWithPhone(phoneNumber, appVerifier, completeFormData);
          break;
      }
      console.log('User signed up:', user);
      // Handle successful sign-up (e.g., show a success message, redirect, etc.)
    } catch (error) {
      console.error('Error signing up:', error);
      // Handle sign-up error (e.g., show an error message)
    }
  };

  const toggleSport = (sport: string) => {
    setFormData(prevData => {
      if (prevData.sports.includes(sport)) {
        return { ...prevData, sports: prevData.sports.filter(s => s !== sport) };
      } else if (prevData.sports.length < 3) {
        return { ...prevData, sports: [...prevData.sports, sport] };
      }
      return prevData;
    });
  };

  const toggleFeature = (feature: string) => {
    setFormData(prevData => {
      if (prevData.interestedFeatures.includes(feature)) {
        return { ...prevData, interestedFeatures: prevData.interestedFeatures.filter(f => f !== feature) };
      } else if (prevData.interestedFeatures.length < 3) {
        return { ...prevData, interestedFeatures: [...prevData.interestedFeatures, feature] };
      }
      return prevData;
    });
  };

  const toggleTournamentLevel = (level: string) => {
    setTournamentLevels(prevLevels => {
      // Ensure at least one of amateur, semi-professional, or professional is selected
      const isAmateur = level === 'amateur';
      const isSemiProfessional = level === 'semi-professional';
      const isProfessional = level === 'professional';

      if (isAmateur || isSemiProfessional || isProfessional) {
        const hasRegional = prevLevels.includes('regional');
        if (!hasRegional) {
          return [...prevLevels, 'regional', level]; // Add regional and the selected level
        }
        return prevLevels.includes(level) 
          ? prevLevels.filter(l => l !== level) // Remove if already selected
          : [...prevLevels, level]; // Add the selected level
      }

      return prevLevels; // Return unchanged if not a valid level
    });
  };

  const toggleRegionalLevel = (level: string) => {
    setRegionalLevels(prevLevels => 
      prevLevels.includes(level) 
        ? prevLevels.filter(l => l !== level) 
        : [...prevLevels, level]
    );
  };

  const toggleOtherLevel = (level: string) => {
    setOtherLevels(prevLevels => 
      prevLevels.includes(level) 
        ? prevLevels.filter(l => l !== level) 
        : [...prevLevels, level]
    );
  };

  const handleOtherSportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherSportInput.trim() !== '' && formData.sports.length < 3) {
      e.preventDefault();
      setFormData(prevData => {
        const newSports = [...prevData.sports, otherSportInput.trim()].slice(0, 3);
        return { ...prevData, sports: newSports };
      });
      setOtherSportInput('');
    }
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setCountry(e.target.value);
  };

  const handleStateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setState(e.target.value);
  };

  const handleOtherFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherFeatureInput.trim() !== '' && formData.interestedFeatures.length < 3) {
      e.preventDefault();
      setFormData(prevData => {
        const newFeatures = [...prevData.interestedFeatures, otherFeatureInput.trim()].slice(0, 3);
        return { ...prevData, interestedFeatures: newFeatures };
      });
      setOtherFeatureInput('');
    }
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <form className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={showPlayerForm ? "Name" : "Organizer/Organization Name"}
          className="w-full p-2 mb-4 bg-black/50 text-white rounded"
          required
        />
        
        {/* Country Selection */}
        <div className="mb-4">
          <label htmlFor="country" className="block text-sm font-medium mb-2">Country</label>
          <select
            id="country"
            value={country}
            onChange={handleCountryChange}
            className="w-full p-2 bg-black/50 text-white rounded"
            required
          >
            <option value="">Select a country</option>
            {southEastAsianCountries.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>

        {/* State Selection */}
        {country && (
          <div className="mb-4">
            <label htmlFor="state" className="block text-sm font-medium mb-2">State/Region</label>
            <select
              id="state"
              value={state}
              onChange={handleStateChange}
              className="w-full p-2 bg-black/50 text-white rounded"
              required
            >
              <option value="">Select a state/region</option>
              {(statesByCountry[country as keyof StatesByCountry] || []).map((s) => (
                <option key={s} value={s}>{s}</option>
              ))}
            </select>
          </div>
        )}

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Sports (Max 3)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['basketball', 'football', 'futsal', 'badminton', 'volleyball'].map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
                className={`px-3 py-1 rounded ${
                  formData.sports.includes(sport)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {sport}
              </button>
            ))}
            {formData.sports.length < 3 && (
              <button
                type="button"
                onClick={() => setShowOtherSports(!showOtherSports)}
                className={`px-3 py-1 rounded ${
                  showOtherSports ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                Other
              </button>
            )}
          </div>
          {showOtherSports && (
            <input
              type="text"
              value={otherSportInput}
              onChange={(e) => setOtherSportInput(e.target.value)}
              onKeyDown={handleOtherSportKeyDown}
              placeholder="Enter other sport and press Enter to add"
              className="w-full p-2 mb-2 bg-black/50 text-white rounded"
            />
          )}
          <p className="text-sm mt-2">Selected ({formData.sports.length}/3): {formData.sports.join(', ')}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Interested Features (Max 3)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {(showPlayerForm ? [
              'social media', 'pre-tournament previews', 'merchandize sales', 'ticketing',
              'in-tournament features and updates', 'rankings', 'tournament earnings', 'player profiles', 'fan space'
            ] : [
              'tournament hosting', 'ticketing', 'tournament monetization', 'merchandize sales',
              'in-tournament features and updates', 'social media', 'pre-tournament previews', 'fan engagement'
            ]).map((feature) => (
              <button
                key={feature}
                type="button"
                onClick={() => toggleFeature(feature)}
                className={`px-3 py-1 rounded ${
                  formData.interestedFeatures.includes(feature)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {feature}
              </button>
            ))}
            {formData.interestedFeatures.length < 3 && (
              <button
                type="button"
                onClick={() => setShowOtherFeatures(!showOtherFeatures)}
                className={`px-3 py-1 rounded ${
                  showOtherFeatures ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
                }`}
              >
                Other
              </button>
            )}
          </div>
          {showOtherFeatures && (
            <input
              type="text"
              value={otherFeatureInput}
              onChange={(e) => setOtherFeatureInput(e.target.value)}
              onKeyDown={handleOtherFeatureKeyDown}
              placeholder="Enter other feature and press Enter to add"
              className="w-full p-2 mb-2 bg-black/50 text-white rounded"
            />
          )}
          <p className="text-sm mt-2">Selected ({formData.interestedFeatures.length}/3): {formData.interestedFeatures.join(', ')}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Target Reach</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['local', 'regional', 'national', 'international'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleRegionalLevel(level)}
                className={`px-3 py-1 rounded ${
                  regionalLevels.includes(level)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-sm mt-2">Selected Target Reach: {regionalLevels.join(', ')}</p>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Levels</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['amateur', 'semi-professional', 'professional'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleOtherLevel(level)}
                className={`px-3 py-1 rounded ${
                  otherLevels.includes(level)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
          <p className="text-sm mt-2">Selected Other Levels: {otherLevels.join(', ')}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Any other features you'd like to see? (Optional)</label>
          <textarea
            value={additionalFeatures}
            onChange={(e) => setAdditionalFeatures(e.target.value)}
            placeholder="Give us ideas we'll turn them into reality."
            className="w-full p-2 mb-2 bg-black/50 text-white rounded"
            rows={4}
          />
        </div>
        {isFormValid() && (
          <>
            <h4 className="text-lg font-semibold mb-2 mt-4">Submit and Sign Up:</h4>
        <div className="flex flex-col space-y-2">
        <button type="button" onClick={() => handleSignUp('google')} className="bg-blue-600 text-white p-2 rounded-lg">
          Sign up with Google
        </button>
        <button type="button" onClick={() => handleSignUp('facebook')} className="bg-blue-800 text-white p-2 rounded-lg">
          Sign up with Facebook
        </button>
        <button type="button" onClick={() => handleSignUp('phone')} className="bg-green-600 text-white p-2 rounded-lg">
          Sign up with Mobile
        </button>
        </div>
        <button type="submit" className="w-full mt-4 bg-purple-600 text-white p-2 rounded-lg">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WaitListForm;