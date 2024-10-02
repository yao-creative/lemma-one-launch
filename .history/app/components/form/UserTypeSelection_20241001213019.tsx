import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Checkbox from '@radix-ui/react-checkbox';
import { FormData } from '../WaitListForm';

interface UserTypeSelectionProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ formData, setFormData }) => {
  const toggleUserType = (type: 'player' | 'organizer') => {
    setFormData((prevData) => ({
      ...prevData,
      userTypes: prevData.userTypes.includes(type)
        ? prevData.userTypes.filter(t => t !== type)
        : [...prevData.userTypes, type]
    }));
  };

  return (
    <Form.Field name="userTypes" className="mb-4">
      <Form.Label className="block text-sm font-medium mb-2">I am a (select all which apply):</Form.Label>
      <div className="flex gap-4">
        {['player', 'organizer'].map((type) => (
          <Form.Field key={type} name={type} className="flex items-center">
            <Checkbox.Root
              checked={formData.userTypes.includes(type as 'player' | 'organizer')}
              onCheckedChange={() => toggleUserType(type as 'player' | 'organizer')}
              className="w-5 h-5 bg-white rounded mr-2"
            >
              <Checkbox.Indicator className="text-purple-600">✓</Checkbox.Indicator>
            </Checkbox.Root>
            <Form.Label className="text-sm capitalize">{type}</Form.Label>
          </Form.Field>
        ))}
      </div>
      <Form.Message match="valueMissing" className="text-red-500 text-sm mt-1">
        Please select at least one user type.
      </Form.Message>
    </Form.Field>
  );
};

export default UserTypeSelection;