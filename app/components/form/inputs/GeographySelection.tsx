import React from 'react';
import * as Form from '@radix-ui/react-form';
import { FormData } from '../../WaitListForm';
import CustomCheckbox from '../../ui/CustomCheckbox';

interface GeographySelectionProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const GeographySelection: React.FC<GeographySelectionProps> = ({ formData, setFormData }) => {
  const toggleLevel = (type: 'regional' | 'tournament', level: string) => {
    setFormData((prevData) => {
      const key = type === 'regional' ? 'regionalLevels' : 'tournamentLevels';
      if (prevData[key].includes(level)) {
        return { ...prevData, [key]: prevData[key].filter((l) => l !== level) };
      } else {
        return { ...prevData, [key]: [...prevData[key], level] };
      }
    });
  };

  const levels = ['local', 'regional', 'national', 'international'];

  return (
    <Form.Field name="geography" className="mb-4">
      <Form.Label className="block text-sm font-medium mb-2">Interest Geography</Form.Label>
      {formData.userTypes.includes('player') && (
        <div className="mb-4">
          <Form.Label className="block text-sm font-medium mb-2">Player</Form.Label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <CustomCheckbox
                key={`player-${level}`}
                checked={formData.regionalLevels.includes(level)}
                onCheckedChange={() => toggleLevel('regional', level)}
                label={level.charAt(0).toUpperCase() + level.slice(1)}
              />
            ))}
          </div>
        </div>
      )}
      {formData.userTypes.includes('organizer') && (
        <div>
          <Form.Label className="block text-sm font-medium mb-2">Organizer</Form.Label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <CustomCheckbox
                key={`organizer-${level}`}
                checked={formData.tournamentLevels.includes(level)}
                onCheckedChange={() => toggleLevel('tournament', level)}
                label={level.charAt(0).toUpperCase() + level.slice(1)}
              />
            ))}
          </div>
        </div>
      )}
    </Form.Field>
  );
};

export default GeographySelection;