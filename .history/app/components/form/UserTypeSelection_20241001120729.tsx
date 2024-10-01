import React from 'react';

interface UserTypeSelectionProps {
  formData: {
    userTypes: ('player' | 'organizer')[];
  };
  setFormData: React.Dispatch<React.SetStateAction<UserTypeSelectionProps['formData']>>;
}

const UserTypeSelection: React.FC<UserTypeSelectionProps> = ({ formData, setFormData }) => {
  const toggleUserType = (type: 'player' | 'organizer') => {
    setFormData((prevData) => ({
      ...prevData,
      userTypes: prevData.userTypes.includes(type)
        ? prevData.userTypes.filter(t => t !== type)
        : [...prevData.userTypes, type]
    }));
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">I am a (select all which apply):</label>
      <div className="flex gap-4">
        <button
          type="button"
          onClick={() => toggleUserType('player')}
          className={`px-4 py-2 rounded-full ${
            formData.userTypes.includes('player')
              ? 'bg-purple-600 text-white'
              : 'bg-transparent text-purple-600 border border-purple-600'
          }`}
        >
          Player
        </button>
        <button
          type="button"
          onClick={() => toggleUserType('organizer')}
          className={`px-4 py-2 rounded-full ${
            formData.userTypes.includes('organizer')
              ? 'bg-purple-600 text-white'
              : 'bg-transparent text-purple-600 border border-purple-600'
          }`}
        >
          Organizer
        </button>
      </div>
    </div>
  );
};

export default UserTypeSelection;