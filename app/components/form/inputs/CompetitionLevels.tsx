import React from 'react';
import * as Form from '@radix-ui/react-form';
import { FormData } from '../../WaitListForm';
import CustomCheckbox from '../ui/CustomCheckbox';

interface CompetitionLevelsProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const CompetitionLevels: React.FC<CompetitionLevelsProps> = ({ formData, setFormData }) => {
  const toggleCompetitionLevel = (level: string) => {
    setFormData((prevData) => {
      if (prevData.competitionLevels.includes(level)) {
        return { ...prevData, competitionLevels: prevData.competitionLevels.filter((l) => l !== level) };
      } else {
        return { ...prevData, competitionLevels: [...prevData.competitionLevels, level] };
      }
    });
  };

  const levels = ['amateur', 'semi-professional', 'professional'];

  return (
    <Form.Field name="competitionLevels" className="mb-4">
      <Form.Label className="block text-sm font-medium mb-2">Select Competition Levels</Form.Label>
      <div className="flex flex-wrap gap-2 mb-2">
        {levels.map((level) => (
          <CustomCheckbox
            key={level}
            checked={formData.competitionLevels.includes(level)}
            onCheckedChange={() => toggleCompetitionLevel(level)}
            label={level.charAt(0).toUpperCase() + level.slice(1)}
          />
        ))}
      </div>
      <Form.Message match="valueMissing" className="text-red-500 text-sm mt-1">
        Please select at least one competition level.
      </Form.Message>
    </Form.Field>
  );
};

export default CompetitionLevels;