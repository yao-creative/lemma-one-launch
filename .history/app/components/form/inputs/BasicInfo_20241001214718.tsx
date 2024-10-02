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
  };

  const handleRegionChange = (value: string) => {
    setFormData({ region: value });
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
    <div className="mb-4 relative z-10">
      <Form.Field name="name">
        <Form.Control asChild>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
            placeholder="Name"
            className="w-full p-2 mb-4 bg-black/50 text-black rounded-full"
            required
          />
        </Form.Control>
      </Form.Field>
      
      <Select.Root onValueChange={handleCountryChange} value={formData.country}>
        <Select.Trigger className="w-full p-2 mb-4 bg-black/50 text-white rounded-full flex justify-between items-center">
          <Select.Value placeholder="Select Country" />
          <Select.Icon className="text-white">▼</Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-black/90 text-white rounded-lg shadow-lg z-50 overflow-hidden">
            <Select.Viewport className="p-1">
              <Select.Group>
                {southEastAsianCountries.map(country => (
                  <Select.Item key={country} value={country} className="p-2 cursor-pointer hover:bg-purple-600 rounded-full">
                    <Select.ItemText>{country}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>

      <Select.Root onValueChange={handleRegionChange} value={formData.region} disabled={!formData.country}>
        <Select.Trigger className="w-full p-2 mb-4 bg-black/50 text-white rounded-full flex justify-between items-center">
          <Select.Value placeholder="Select Region" />
          <Select.Icon className="text-white">▼</Select.Icon>
        </Select.Trigger>
        <Select.Portal>
          <Select.Content className="bg-black/90 text-white rounded-lg shadow-lg z-50 overflow-hidden">
            <Select.Viewport className="p-1">
              <Select.Group>
                {formData.country && statesByCountry[formData.country]?.map(region => (
                  <Select.Item key={region} value={region} className="p-2 cursor-pointer hover:bg-purple-600 rounded-full">
                    <Select.ItemText>{region}</Select.ItemText>
                  </Select.Item>
                ))}
              </Select.Group>
            </Select.Viewport>
          </Select.Content>
        </Select.Portal>
      </Select.Root>
    </div>
  );
};

export default BasicInfo;