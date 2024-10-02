import React, { useState } from 'react';
import { FormData } from '../../WaitListForm';
import CustomCheckbox from '../ui/CustomCheckbox';

interface InterestedFeaturesProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const InterestedFeatures: React.FC<InterestedFeaturesProps> = ({ formData, setFormData }) => {
  const [showOtherPlayerFeatures, setShowOtherPlayerFeatures] = useState(false);
  const [showOtherOrganizerFeatures, setShowOtherOrganizerFeatures] = useState(false);
  const [otherPlayerFeatureInput, setOtherPlayerFeatureInput] = useState('');
  const [otherOrganizerFeatureInput, setOtherOrganizerFeatureInput] = useState('');

  const playerFeatures = [
    'Tournament Search', 'Team Matching', 'In-Tournament Features and Updates', 'Pre-Tournament Previews', 
    'Tournament Merch', 'Ticketing', 'Cancellation Policy', 'Rankings', 'Social Media', 
    'Tournament Earnings', 'Player Profiles', 'Fan Space'
  ];

  const organizerFeatures = [
    'Tournament Hosting', 'Ticketing', 'Tournament Monetization', 'Merchandise Sales', 'Waiting List', 
    'Cancellation Policy', 'In-Tournament Features and Updates', 'Social Media', 'Pre-Tournament Previews', 
    'Fan Engagement'
  ];

  const toggleFeature = (feature: string, type: 'player' | 'organizer') => {
    const key = type === 'player' ? 'playerInterestedFeatures' : 'organizerInterestedFeatures';
    setFormData((prevData) => {
      if (prevData[key].includes(feature)) {
        return { ...prevData, [key]: prevData[key].filter((f: string) => f !== feature) };
      } else if (prevData[key].length < 5) {
        return { ...prevData, [key]: [...prevData[key], feature] };
      }
      return prevData;
    });
  };

  const handleOtherFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>, type: 'player' | 'organizer') => {
    const key = type === 'player' ? 'playerInterestedFeatures' : 'organizerInterestedFeatures';
    const input = type === 'player' ? otherPlayerFeatureInput : otherOrganizerFeatureInput;
    if (e.key === 'Enter' && input.trim() !== '' && formData[key].length < 5) {
      e.preventDefault();
      setFormData((prevData) => {
        const newFeatures = [...prevData[key], input.trim()].slice(0, 5);
        return { ...prevData, [key]: newFeatures };
      });
      if (type === 'player') {
        setOtherPlayerFeatureInput('');
      } else {
        setOtherOrganizerFeatureInput('');
      }
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Interested Features (Min 3, Max 5 for each type)</label>
      {formData.userTypes.includes('player') && (
        <>
          <p className="text-sm mb-2">Player Features:</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {playerFeatures.map((feature) => (
              <CustomCheckbox
                key={feature}
                checked={formData.playerInterestedFeatures.includes(feature)}
                onCheckedChange={() => toggleFeature(feature, 'player')}
                label={feature}
                disabled={!formData.playerInterestedFeatures.includes(feature) && formData.playerInterestedFeatures.length >= 5}
              />
            ))}
          </div>
          {formData.playerInterestedFeatures.length < 5 && (
            <button
              type="button"
              onClick={() => setShowOtherPlayerFeatures(!showOtherPlayerFeatures)}
              className={`px-3 py-1 rounded-full mt-2 bg-b ${
                showOtherPlayerFeatures ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Other
            </button>
          )}
          {showOtherPlayerFeatures && (
            <input
              type="text"
              value={otherPlayerFeatureInput}
              onChange={(e) => setOtherPlayerFeatureInput(e.target.value)}
              onKeyDown={(e) => handleOtherFeatureKeyDown(e, 'player')}
              placeholder="Enter other player feature and press Enter to add"
              className="w-full p-2 mt-2 bg-black/50 text-white rounded"
            />
          )}
          <p className="text-sm mt-2">Selected Player Features ({formData.playerInterestedFeatures.length}/5): {formData.playerInterestedFeatures.join(', ')}</p>
        </>
      )}
      {formData.userTypes.includes('organizer') && (
        <>
          <p className="text-sm mb-2 mt-4">Organizer Features:</p>
          <div className="flex flex-wrap gap-2 mb-2">
            {organizerFeatures.map((feature) => (
              <CustomCheckbox
                key={feature}
                checked={formData.organizerInterestedFeatures.includes(feature)}
                onCheckedChange={() => toggleFeature(feature, 'organizer')}
                label={feature}
                disabled={!formData.organizerInterestedFeatures.includes(feature) && formData.organizerInterestedFeatures.length >= 5}
              />
            ))}
          </div>
          {formData.organizerInterestedFeatures.length < 5 && (
            <button
              type="button"
              onClick={() => setShowOtherOrganizerFeatures(!showOtherOrganizerFeatures)}
              className={`px-3 py-1 rounded-full mt-2 ${
                showOtherOrganizerFeatures ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-800'
              }`}
            >
              Other
            </button>
          )}
          {showOtherOrganizerFeatures && (
            <input
              type="text"
              value={otherOrganizerFeatureInput}
              onChange={(e) => setOtherOrganizerFeatureInput(e.target.value)}
              onKeyDown={(e) => handleOtherFeatureKeyDown(e, 'organizer')}
              placeholder="Enter other organizer feature and press Enter to add"
              className="w-full p-2 mt-2 bg-black/50 text-white rounded"
            />
          )}
          <p className="text-sm mt-2">Selected Organizer Features ({formData.organizerInterestedFeatures.length}/5): {formData.organizerInterestedFeatures.join(', ')}</p>
        </>
      )}
    </div>
  );
};

export default InterestedFeatures;