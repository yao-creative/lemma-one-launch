import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormData } from '../WaitListForm';

interface SportsSelectionProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const SportsSelection: React.FC<SportsSelectionProps> = ({ formData, setFormData }) => {
  const [showOtherSports, setShowOtherSports] = useState(false);
  const [otherSportInput, setOtherSportInput] = useState('');

  const toggleSport = (sport: string) => {
    setFormData((prevData: FormData) => {
      if (prevData.sports.includes(sport)) {
        return { ...prevData, sports: prevData.sports.filter(s => s !== sport) };
      } else if (prevData.sports.length < 3) {
        return { ...prevData, sports: [...prevData.sports, sport] };
      }
      return prevData;
    });
  };

  const handleOtherSportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherSportInput.trim() !== '' && formData.sports.length < 3) {
      e.preventDefault();
      setFormData((prevData: FormData) => {
        const newSports = [...prevData.sports, otherSportInput.trim()].slice(0, 3);
        return { ...prevData, sports: newSports };
      });
      setOtherSportInput('');
    }
  };

  return (
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
  );
};

export default SportsSelection;