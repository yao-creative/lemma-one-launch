import React, { useState } from 'react';
import React from 'react';

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
  const handleOtherSportChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const otherSports = e.target.value.split(',').map(sport => sport.trim());
    setFormData(prevData => ({
      ...prevData,
      otherSports
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
            onChange={handleInputChange}
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
            <input
              type="text"
              name="otherSports"
              value={formData.otherSports.join(', ')}
              onChange={handleOtherSportChange}
              placeholder="Please specify other sports (comma-separated)"
              className="w-full p-2 mb-4 bg-black/50 text-white rounded"
              required
            />
          )}
          <p className="text-sm mt-2">
            Selected: {[...formData.sports.filter(sport => sport !== 'other'), ...formData.otherSports].join(', ')}
          </p>
        </div>
        {/* ... rest of the form fields ... */}
        <div className="flex flex-col space-y-2">
          <button type="button" onClick={() => handleSignUp('google')} className="bg-blue-600 text-white p-2 rounded">
            Sign up with Google
          </button>
          <button type="button" onClick={() => handleSignUp('facebook')} className="bg-blue-800 text-white p-2 rounded">
            Sign up with Facebook
          </button>
          <button type="button" onClick={() => handleSignUp('phone')} className="bg-green-600 text-white p-2 rounded">
            Sign up with Mobile
          </button>
        </div>
        <button type="submit" className="w-full mt-4 bg-purple-600 text-white p-2 rounded">
          Submit
        </button>
      </form>
    </div>
  );
};

export default WaitListForm;
export default WaitListForm;