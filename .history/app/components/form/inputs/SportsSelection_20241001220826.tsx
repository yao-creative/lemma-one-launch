import React, { useState } from 'react';
import * as Form from '@radix-ui/react-form';
import { FormData } from '../../WaitListForm';
import CustomCheckbox from '../ui/CustomCheckbox';

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

  const predefinedSports = ['basketball', 'football', 'futsal', 'badminton', 'volleyball'];

  return (
    <Form.Field name="sports" className="mb-4">
      <Form.Label className="block text-sm font-medium mb-2">Select Sports (Max 3)</Form.Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {predefinedSports.map((sport) => (
          <CustomCheckbox
            key={sport}
            checked={formData.sports.includes(sport)}
            onCheckedChange={() => toggleSport(sport)}
            label={sport.charAt(0).toUpperCase() + sport.slice(1)}
            disabled={!formData.sports.includes(sport) && formData.sports.length >= 3}
          />
        ))}
        {formData.sports.length < 3 && (
          <button
            type="button"
            onClick={() => setShowOtherSports(!showOtherSports)}
            className={`px-3 py-2 rounded-full text-sm font-medium ${
              showOtherSports ? 'bg-purple-600 text-white' : 'bg-black/20 text-white hover:bg-black/30'
            }`}
          >
            Other
          </button>
        )}
      </div>
      {showOtherSports && (
        <Form.Field name="otherSport">
          <Form.Control asChild>
            <input
              type="text"
              value={otherSportInput}
              onChange={(e) => setOtherSportInput(e.target.value)}
              onKeyDown={handleOtherSportKeyDown}
              placeholder="Enter other sport and press Enter to add"
              className="w-full p-2 mb-2 bg-black/50 text-white rounded"
            />
          </Form.Control>
        </Form.Field>
      )}
      <p className="text-sm mt-2">Selected ({formData.sports.length}/3): {formData.sports.join(', ')}</p>
      <Form.Message match="valueMissing" className="text-red-500 text-sm mt-1">
        Please select at least one sport.
      </Form.Message>
    </Form.Field>
  );
};

export default SportsSelection;