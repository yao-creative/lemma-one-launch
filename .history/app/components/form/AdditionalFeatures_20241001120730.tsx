import React from 'react';

interface AdditionalFeaturesProps {
  formData: {
    additionalFeatures: string;
  };
  handleInputChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
}

const AdditionalFeatures: React.FC<AdditionalFeaturesProps> = ({ formData, handleInputChange }) => {
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