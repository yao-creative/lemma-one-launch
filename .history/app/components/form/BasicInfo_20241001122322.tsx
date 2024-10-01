import React from 'react';
import { FormData } from '../WaitListForm';

interface BasicInfoProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        name="name"
        value={formData.name}
        onChange={handleInputChange}
        placeholder="Name"
        className="w-full p-2 mb-4 bg-black/50 text-white rounded"
        required
      />
      {/* Add country and state selection here */}
    </div>
  );
};

export default BasicInfo;