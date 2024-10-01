import React, { useState } from 'react';
import { FormData } from '../WaitListForm';

interface BasicInfoProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');
  const [selectedRegion, setSelectedRegion] = useState<string>('');

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setSelectedRegion(''); // Reset region when country changes
    setFormData({ country }); // Update formData with selected country
  };

  const handleRegionChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const region = e.target.value;
    setSelectedRegion(region);
    setFormData({ region }); // Update formData with selected region
  };

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
      
      <select
        name="country"
        value={selectedCountry}
        onChange={handleCountryChange}
        className="w-full p-2 mb-4 bg-black/50 text-white rounded"
        required
      >
        <option value="">Select Country</option>
        {southEastAsianCountries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select
        name="region"
        value={selectedRegion}
      {/* Add country and state selection here */}
    </div>
  );
};

export default BasicInfo;