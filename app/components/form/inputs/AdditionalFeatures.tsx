import React from 'react';
import { FormData } from '../../WaitListForm';

interface AdditionalFeaturesProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Any other features you'd like to see? (Optional)</label>
      <textarea
        name="additionalFeatures"
        value={formData.additionalFeatures}
        onChange={handleInputChange}
        placeholder="Give us ideas we'll turn them into reality."
        className="w-full p-2 mb-2 bg-black/50 text-white rounded"
        rows={4}
      />
    </div>
  );
};

export default AdditionalFeatures;