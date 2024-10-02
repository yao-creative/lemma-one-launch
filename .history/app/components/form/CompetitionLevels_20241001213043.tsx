import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormData } from '../WaitListForm';

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
          <Form.Field key={level} name={level} className="flex items-center">
            <Checkbox.Root
              checked={formData.competitionLevels.includes(level)}
              onCheckedChange={() => toggleCompetitionLevel(level)}
              className="w-5 h-5 bg-white rounded mr-2"
            >
              <Checkbox.Indicator className="text-purple-600">✓</Checkbox.Indicator>
            </Checkbox.Root>
            <Form.Label className="text-sm capitalize">{level}</Form.Label>
          </Form.Field>
        ))}
      </div>
      <Form.Message match="valueMissing" className="text-red-500 text-sm mt-1">
        Please select at least one competition level.
      </Form.Message>
    </Form.Field>
  );
};

export default CompetitionLevels;