import React, { useState } from 'react';

interface WaitListFormProps {
  formData: {
    name: string;
    sports: string[];
    otherSports: string[];
    interestLevel: string;
    features: string;
    interestedFeatures: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<{
    name: string;
    sports: string[];
    otherSports: string[];
    interestLevel: string;
    features: string;
    interestedFeatures: string[];
  }>>;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => void;
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  handleSignUp: (method: 'google' | 'facebook' | 'phone') => Promise<void>;
  showPlayerForm: boolean;
}

const WaitListForm: React.FC<WaitListFormProps> = ({
  formData,
  setFormData,
  handleInputChange,
  handleSubmit,
  handleSignUp,
  showPlayerForm
}) => {
  const [otherSportInput, setOtherSportInput] = useState('');
  const [featureInput, setFeatureInput] = useState('');

  const handleSportChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedSports = Array.from(e.target.selectedOptions, option => option.value);
    setFormData(prevData => ({
      ...prevData,
      sports: selectedSports
    }));
  };

  const handleOtherSportKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && otherSportInput.trim() !== '' && formData.otherSports.length < 3) {
      e.preventDefault();
      setFormData(prevData => ({
        ...prevData,
        otherSports: [...prevData.otherSports, otherSportInput.trim()]
      }));
      setOtherSportInput('');
    }
  };

  const handleFeatureKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && featureInput.trim() !== '' && formData.interestedFeatures.length < 3) {
      e.preventDefault();
      setFormData(prevData => ({
        ...prevData,
        interestedFeatures: [...prevData.interestedFeatures, featureInput.trim()]
      }));
      setFeatureInput('');
    }
  };

  const removeOtherSport = (sport: string) => {
    setFormData(prevData => ({
      ...prevData,
      otherSports: prevData.otherSports.filter(s => s !== sport)
    }));
  };

  const removeFeature = (feature: string) => {
    setFormData(prevData => ({
      ...prevData,
      interestedFeatures: prevData.interestedFeatures.filter(f => f !== feature)
    }));
  };

  return (
    <div className="mt-8 w-full max-w-md">
      <form onSubmit={handleSubmit} className="bg-white/10 backdrop-blur-md p-6 rounded-lg">
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder={showPlayerForm ? "Name" : "Organization Name"}
          className="w-full p-2 mb-4 bg-black/50 text-white rounded"
          required
        />
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Select Sports (Multiple)</label>
          <select
            name="sports"
            value={formData.sports}
            onChange={handleSportChange}
            className="w-full p-2 mb-4 bg-black/50 text-white rounded"
            multiple
            required
          >
            <option value="basketball">Basketball</option>
            <option value="football">Football</option>
            <option value="futsal">Futsal</option>
            <option value="badminton">Badminton</option>
            <option value="volleyball">Volleyball</option>
            <option value="other">Other</option>
          </select>
          {formData.sports.includes('other') && (
            <div>
              <input
                type="text"
                value={otherSportInput}
                onChange={(e) => setOtherSportInput(e.target.value)}
                onKeyDown={handleOtherSportKeyDown}
                placeholder="Enter other sport and press Enter (max 3)"
                className="w-full p-2 mb-2 bg-black/50 text-white rounded"
              />
              <div className="flex flex-wrap gap-2 mb-2">
                {formData.otherSports.map((sport, index) => (
                  <span key={index} className="bg-purple-600 text-white px-2 py-1 rounded flex items-center">
                    {sport}
                    <button type="button" onClick={() => removeOtherSport(sport)} className="ml-2 text-xs
export default WaitListForm;