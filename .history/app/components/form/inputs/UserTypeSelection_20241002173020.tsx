import React from 'react';
import * as Form from '@radix-ui/react-form';
import { FormData } from '../../WaitListForm';
import CustomCheckbox from '../ui/CustomCheckbox';

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
      <Form.Label className="block text-lg font-medium mb-2">I am a (select all which apply):</Form.Label>
      <div className="flex justify-center gap-4">
        {['player', 'organizer'].map((type) => (
          <CustomCheckbox
            key={type}
            checked={formData.userTypes.includes(type as 'player' | 'organizer')}
            onCheckedChange={() => toggleUserType(type as 'player' | 'organizer')}
            label={type.charAt(0).toUpperCase() + type.slice(1)}
          />
        ))}
      </div>
      <Form.Message match="valueMissing" className="text-red-500 text-sm mt-1">
        Please select at least one user type.
      </Form.Message>
    </Form.Field>
  );
};

export default UserTypeSelection;