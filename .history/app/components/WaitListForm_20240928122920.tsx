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
  const [sportInput, setSportInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');
  const [showOtherSports, setShowOtherSports] = useState(false);
  const [showOtherFeatures, setShowOtherFeatures] = useState(false);

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
      } else if (prevData.sports.length < 3) {
        return { ...prevData, sports: [...prevData.sports, sport] };
      }
      return prevData;
    });
    setFormData(prevData => ({
      ...prevData,
      sports: prevData.sports.includes(sport)
        ? prevData.sports.filter(s => s !== sport)
        : [...prevData.sports, sport]
    }));
  };

  const toggleFeature = (feature: string) => {
    setFormData(prevData => ({
      ...prevData,
      interestedFeatures: prevData.interestedFeatures.includes(feature)
        ? prevData.interestedFeatures.filter(f => f !== feature)
        : [...prevData.interestedFeatures, feature]
    }));
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
          <label className="block text-sm font-medium mb-2">Select Sports (Max 3)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['basketball', 'football', 'futsal', 'badminton', 'volleyball'].map((sport) => (
              <button
                key={sport}
                type="button"
                onClick={() => toggleSport(sport)}
                className={`px-2 py-1 rounded ${
                  formData.sports.includes(sport) ? 'bg-purple-600 text-white' : 'bg-gray-200 text-black'
                }`}
              >
                {sport}
              </button>
            ))}
          </div>
          <input
            type="text"
            value={sportInput}
            onChange={(e) => setSportInput(e.target.value)}
            onKeyDown={handleSportKeyDown}
            placeholder="Enter other sport and press Enter"
            className="w-full p-2 mb-2 bg-black/50 text-white rounded"
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.sports.filter(sport => !['basketball', 'football', 'futsal', 'badminton', 'volleyball'].includes(sport)).map((sport, index) => (
              <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded flex items-center">
                {sport}
                <button type="button" onClick={() => removeSport(sport)} className="ml-2 text-xs">&times;</button>
              </span>
            ))}
          </div>
          <p className="text-sm mt-2">
            Selected: {formData.sports.join(', ')}
          </p>
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Interested Features (Max 3)</label>
          <input
            type="text"
            value={featureInput}
            onChange={(e) => setFeatureInput(e.target.value)}
            onKeyDown={handleFeatureKeyDown}
            placeholder="Enter feature and press Enter"
            className="w-full p-2 mb-2 bg-black/50 text-white rounded"
          />
          <div className="flex flex-wrap gap-2 mb-2">
            {formData.interestedFeatures.map((feature, index) => (
              <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded flex items-center">
                {feature}
                <button type="button" onClick={() => removeFeature(feature)} className="ml-2 text-xs">&times;</button>
              </span>
            ))}
          </div>
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
