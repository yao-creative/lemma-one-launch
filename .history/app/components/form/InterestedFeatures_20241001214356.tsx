import React from 'react';
import * as Form from '@radix-ui/react-form';
import { FormData } from '../WaitListForm';
import CustomCheckbox from './CustomCheckbox';

interface InterestedFeaturesProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const InterestedFeatures: React.FC<InterestedFeaturesProps> = ({ formData, setFormData }) => {
  const toggleFeature = (type: 'player' | 'organizer', feature: string) => {
    setFormData((prevData) => {
      const key = type === 'player' ? 'playerInterestedFeatures' : 'organizerInterestedFeatures';
      if (prevData[key].includes(feature)) {
        return { ...prevData, [key]: prevData[key].filter((f) => f !== feature) };
      } else {
        return { ...prevData, [key]: [...prevData[key], feature] };
      }
    });
  };

  const playerFeatures = ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'];
  const organizerFeatures = ['Feature A', 'Feature B', 'Feature C', 'Feature D', 'Feature E'];

  return (
    <Form.Field name="interestedFeatures" className="mb-4">
      <Form.Label className="block text-sm font-medium mb-2">Interested Features</Form.Label>
      {formData.userTypes.includes('player') && (
        <div className="mb-4">
          <Form.Label className="block text-sm font-medium mb-2">Player Features (Select 3-5)</Form.Label>
          <div className="flex flex-wrap gap-2">
            {playerFeatures.map((feature) => (
              <CustomCheckbox
                key={`player-${feature}`}
                checked={formData.playerInterestedFeatures.includes(feature)}
                onCheckedChange={() => toggleFeature('player', feature)}
                label={feature}
                disabled={!formData.playerInterestedFeatures.includes(feature) && formData.playerInterestedFeatures.length >= 5}
              />
            ))}
          </div>
        </div>
      )}
      {formData.userTypes.includes('organizer') && (
        <div>
          <Form.Label className="block text-sm font-medium mb-2">Organizer Features (Select 3-5)</Form.Label>
          <div className="flex flex-wrap gap-2">
            {organizerFeatures.map((feature) => (
              <CustomCheckbox
                key={`organizer-${feature}`}
                checked={formData.organizerInterestedFeatures.includes(feature)}
                onCheckedChange={() => toggleFeature('organizer', feature)}
                label={feature}
                disabled={!formData.organizerInterestedFeatures.includes(feature) && formData.organizerInterestedFeatures.length >= 5}
              />
            ))}
          </div>
        </div>
      )}
    </Form.Field>
  );
};

export default InterestedFeatures;