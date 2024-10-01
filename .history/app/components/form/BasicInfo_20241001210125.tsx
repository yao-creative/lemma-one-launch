import React, { useState } from 'react';
import { FormData } from '../WaitListForm';

interface BasicInfoProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const [selectedCountry, setSelectedCountry] = useState<string>('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleCountryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const country = e.target.value;
    setSelectedCountry(country);
    setFormData({ country, region: '' }); // Reset region when country changes
  };

  // You'll need to define these arrays or import them from a data file
  const southEastAsianCountries = [
    'Brunei', 'Cambodia', 'Indonesia', 'Laos', 'Malaysia', 'Myanmar', 
    'Philippines', 'Singapore', 'Thailand', 'Vietnam', 'Timor-Leste', 'Hong Kong'
  ];
  
  // Ensure statesByCountry is properly typed
  const statesByCountry: StatesByCountry = {
    'Brunei': ['Belait', 'Brunei-Muara', 'Temburong', 'Tutong'],
    'Cambodia': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Preah Sihanouk', 'Kampong Cham', 'Kandal'],
    'Indonesia': [
      'Aceh', 'Bali', 'Banten', 'Central Java', 'East Java', 'Jakarta', 
      'West Java', 'Yogyakarta', 'East Kalimantan', 'North Sumatra', 'West Sumatra', 'Papua'
    ],
  const southEastAsianCountries = ['Malaysia', 'Singapore', 'Indonesia', 'Thailand', 'Vietnam', 'Philippines'];
  const statesByCountry: { [key: string]: string[] } = {
    Malaysia: ['Selangor', 'Kuala Lumpur', 'Penang'],
    Singapore: ['Central Region', 'East Region', 'North Region'],
    // ... add other countries and their regions
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
        value={formData.country}
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
        value={formData.region}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 bg-black/50 text-white rounded"
        required
        disabled={!formData.country}
      >
        <option value="">Select Region</option>
        {formData.country && statesByCountry[formData.country]?.map(region => (
          <option key={region} value={region}>{region}</option>
        ))}
      </select>
    </div>
  );
};

export default BasicInfo;