import React from 'react';

interface FormDataInputProps {
  formData: {
    name: string;
    country: string;
    state: string;
  };
  setFormData: (updater: React.SetStateAction<any>) => void;
}

const FormDataInput: React.FC<FormDataInputProps> = ({ formData, setFormData }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prevData => ({
      ...prevData,
      [name]: value,
    }));
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
        onChange={handleInputChange}
        className="w-full p-2 mb-4 bg-black/50 text-white rounded"
        required
      >
        <option value="">Select Country</option>
        {southEastAsianCountries.map(country => (
          <option key={country} value={country}>{country}</option>
        ))}
      </select>

      <select
        name="state"
        value={formData.state}
        onChange={handleInputChange}
        className="w-full p-2 mb-4 bg-black/50 text-white rounded"
        required
        disabled={!formData.country} // Disable if no country is selected
      >
        <option value="">Select State</option>
        {formData.country && statesByCountry[formData.country]?.map(state => (
          <option key={state} value={state}>{state}</option>
        ))}
      </select>
    </div>
  );
};

export default FormDataInput;