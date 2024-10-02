import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormData } from '../WaitListForm';

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
              <Form.Field key={`player-${level}`} name={`player-${level}`} className="flex items-center">
                <Checkbox.Root
                  checked={formData.regionalLevels.includes(level)}
                  onCheckedChange={() => toggleLevel('regional', level)}
                  className="w-5 h-5 bg-white rounded mr-2"
                >
                  <Checkbox.Indicator className="text-purple-600">✓</Checkbox.Indicator>
                </Checkbox.Root>
                <Form.Label className="text-sm">{level}</Form.Label>
              </Form.Field>
            ))}
          </div>
        </div>
      )}
      {formData.userTypes.includes('organizer') && (
        <div>
          <Form.Label className="block text-sm font-medium mb-2">Organizer</Form.Label>
          <div className="flex flex-wrap gap-2">
            {levels.map((level) => (
              <Form.Field key={`organizer-${level}`} name={`organizer-${level}`} className="flex items-center">
                <Checkbox.Root
                  checked={formData.tournamentLevels.includes(level)}
                  onCheckedChange={() => toggleLevel('tournament', level)}
                  className="w-5 h-5 bg-white rounded mr-2"
                >
                  <Checkbox.Indicator className="text-purple-600">✓</Checkbox.Indicator>
                </Checkbox.Root>
                <Form.Label className="text-sm">{level}</Form.Label>
              </Form.Field>
            ))}
          </div>
        </div>
      )}
    </Form.Field>
  );
};

export default GeographySelection;