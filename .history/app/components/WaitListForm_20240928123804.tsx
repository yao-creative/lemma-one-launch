import React, { useState } from 'react';

interface WaitListFormProps {
  formData: {
    name: string;
    sports: string[];
    otherSports: string[];
    interestLevel: string;
    features: string;
    interestedFeatures: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    sports: string[];
    otherSports: string[];
    interestLevel: string;
    features: string;
    interestedFeatures: string[];
  }>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSignUp: (method: 'google' | 'facebook' | 'phone') => Promise<void>;
  showPlayerForm: boolean;
}

const WaitListForm: React.FC<WaitListFormProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  handleSignUp,
  showPlayerForm
}) => {
  const [showOtherSports, setShowOtherSports] = useState(false);
  const [otherSportInput, setOtherSportInput] = useState('');

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
  const handleSportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && sportInput.trim() !== '' && formData.sports.length < 3) {
      e.preventDefault();
      setFormData(prevData => ({
        ...prevData,
        sports: [...prevData.sports, sportInput.trim()].slice(0, 3)
      }));
      setSportInput('');
    }
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && featureInput.trim() !== '' && formData.interestedFeatures.length < 3) {
      e.preventDefault();
      setFormData(prevData => ({
        ...prevData,
        interestedFeatures: [...prevData.interestedFeatures, featureInput.trim()].slice(0, 3)
      }));
      setFeatureInput('');
    }
  };

  const removeSport = (sport: string) => {
    setFormData(prevData => ({
      ...prevData,
      sports: prevData.sports.filter(s => s !== sport)
    }));
  };

  const removeFeature = (feature: string) => {
    setFormData(prevData => ({
      ...prevData,
      interestedFeatures: prevData.interestedFeatures.filter(f => f !== feature)
    }));
  };

  const toggleSport = (sport: string) => {
    setFormData(prevData => {
      if (prevData.sports.includes(sport)) {
        return { ...prevData, sports: prevData.sports.filter(s => s !== sport) };
      } else {
        return { ...prevData, sports: [...prevData.sports, sport] };
      }
    });
  };

  const toggleFeature = (feature: string) => {
    setFormData(prevData => {
      if (prevData.interestedFeatures.includes(feature)) {
        return { ...prevData, interestedFeatures: prevData.interestedFeatures.filter(f => f !== feature) };
      } else {
        return { ...prevData, interestedFeatures: [...prevData.interestedFeatures, feature] };
      }
    });
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={showPlayerForm ? "Name" : "Organization Name"}
          className="w-full p-2 mb-4 bg-black/50 text-white rounded"
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Sports (Multiple)</label>
          <div className="bg-black/50 rounded-lg p-4">
            {['basketball', 'football', 'futsal', 'badminton', 'volleyball'].map((sport) => (
              <div key={sport} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={sport}
                  checked={formData.sports.includes(sport)}
                  onChange={() => toggleSport(sport)}
                  className="mr-2"
                />
                <label htmlFor={sport} className="text-white">{sport}</label>
              </div>
            ))}
          </div>
          <p className="text-sm mt-2">Selected: {formData.sports.join(', ')}</p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Interested Features (Select multiple)</label>
          <div className="bg-black/50 rounded-lg p-4">
            {(showPlayerForm ? [
              'social media', 'pre-tournament previews', 'merchandize sales', 'ticketing',
              'in-tournament features and updates', 'rankings', 'tournament earnings'
            ] : [
              'tournament hosting', 'ticketing', 'tournament monetization', 'merchandize sales',
              'in-tournament features and updates', 'social media', 'pre-tournament previews'
            ]).map((feature) => (
              <div key={feature} className="flex items-center mb-2">
                <input
                  type="checkbox"
                  id={feature}
                  checked={formData.interestedFeatures.includes(feature)}
                  onChange={() => toggleFeature(feature)}
                  className="mr-2"
                />
                <label htmlFor={feature} className="text-white">{feature}</label>
              </div>
            ))}
          </div>
          <p className="text-sm mt-2">Selected: {formData.interestedFeatures.join(', ')}</p>
        </div>
        <div className="flex flex-col space-y-2">
          <button type="button" onClick={() => handleSignUp('google')} className="bg-blue-600 text-white p-2 rounded">
            Sign up with Google
          </button>
          <button type="button" onClick={() => handleSignUp('facebook')} className="bg-blue-800 text-white p-2 rounded">
            Sign up with Facebook
          </button>
          <button type="button" onClick={() => handleSignUp('phone')} className="bg-green-600 text-white p-2 rounded">
            Sign up with Mobile
          </button>
        </div>
        <button type="submit" className="w-full mt-4 bg-purple-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WaitListForm;