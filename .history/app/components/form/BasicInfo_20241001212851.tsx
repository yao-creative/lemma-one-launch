import React from 'react';
import * as Form from '@radix-ui/react-form';
import * as Select from '@radix-ui/react-select';
import { FormData } from '../WaitListForm';

interface BasicInfoProps {
  formData: FormData;
  setFormData: (updater: Partial<FormData> | ((prevData: FormData) => FormData)) => void;
}

const BasicInfo: React.FC<BasicInfoProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ [name]: value });
  };

  const handleCountryChange = (value: string) => {
    setFormData({ country: value, region: '' });
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
  const statesByCountry: { [key: string]: string[] } = {
    'Brunei': ['Belait', 'Brunei-Muara', 'Temburong', 'Tutong'],
    'Cambodia': ['Phnom Penh', 'Siem Reap', 'Battambang', 'Preah Sihanouk', 'Kampong Cham', 'Kandal'],
    'Indonesia': [
      'Aceh', 'Bali', 'Banten', 'Central Java', 'East Java', 'Jakarta', 
      'West Java', 'Yogyakarta', 'East Kalimantan', 'North Sumatra', 'West Sumatra', 'Papua'
    ],
    'Laos': ['Vientiane', 'Savannakhet', 'Champasak', 'Luang Prabang', 'Oudomxay', 'Xieng Khouang'],
    'Malaysia': [
      'Kuala Lumpur', 'Selangor', 'Penang', 'Johor', 'Perak', 'Kelantan', 'Sabah', 'Sarawak', 
      'Pahang', 'Terengganu', 'Negeri Sembilan', 'Melaka', 'Kedah', 'Perlis'
    ],
    'Myanmar': [
      'Yangon', 'Mandalay', 'Naypyidaw', 'Bago', 'Sagaing', 'Shan', 'Rakhine', 'Kachin', 'Chin'
    ],
    'Philippines': [
      'Metro Manila', 'Cebu', 'Davao', 'Iloilo', 'Quezon City', 'Makati', 
      'Zamboanga', 'Baguio', 'Cagayan de Oro'
    ],
    'Singapore': ['Central Region', 'East Region', 'North Region', 'North-East Region', 'West Region'],
    'Thailand': [
      'Bangkok', 'Chiang Mai', 'Chiang Rai', 'Phuket', 'Pattaya', 'Khon Kaen', 
      'Nakhon Ratchasima', 'Krabi', 'Surat Thani'
    ],
    'Vietnam': [
      'Ho Chi Minh City', 'Hanoi', 'Da Nang', 'Nha Trang', 'Hai Phong', 
      'Can Tho', 'Hue', 'Vung Tau', 'Quang Ninh'
    ],
    'Timor-Leste': ['Dili', 'Baucau', 'Bobonaro', 'Viqueque', 'Lautém', 'Liquiçá'],
    'Hong Kong': ['Hong Kong Island', 'Kowloon', 'New Territories']
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