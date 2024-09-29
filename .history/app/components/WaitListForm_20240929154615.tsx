import React, { useState } from 'react';

interface WaitListFormProps {
  showPlayerForm: boolean;
}

const WaitListForm: React.FC<WaitListFormProps> = ({ showPlayerForm }) => {
  const [formData, setFormData] = useState({
    name: '',
    sports: [] as string[],
    otherSports: [] as string[],
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
  const [tournamentLevels, setTournamentLevels] = useState<string[]>([]);
  const [regionalLevels, setRegionalLevels] = useState<string[]>([]);
  const [otherLevels, setOtherLevels] = useState<string[]>([]);
  const [additionalFeatures, setAdditionalFeatures] = useState('');

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

  return (
    <div className="mt-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={showPlayerForm ? "Name" : "Organizer/Organization Name"}
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
          <div className="flex flex-wrap gap-2">
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
          </div>
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