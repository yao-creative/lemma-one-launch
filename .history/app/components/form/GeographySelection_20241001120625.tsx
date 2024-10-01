import React from 'react';

interface GeographySelectionProps {
  formData: {
    userTypes: string[];
    regionalLevels: string[];
    tournamentLevels: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<GeographySelectionProps['formData']>>;
}

const GeographySelection: React.FC<GeographySelectionProps> = ({ formData, setFormData }) => {
  const toggleRegionalLevel = (level: string) => {
    setFormData((prevData) => {
      if (prevData.regionalLevels.includes(level)) {
        return { ...prevData, regionalLevels: prevData.regionalLevels.filter((l) => l !== level) };
      } else {
        return { ...prevData, regionalLevels: [...prevData.regionalLevels, level] };
      }
    });
  };

  const toggleTournamentLevel = (level: string) => {
    setFormData((prevData) => {
      if (prevData.tournamentLevels.includes(level)) {
        return { ...prevData, tournamentLevels: prevData.tournamentLevels.filter((l) => l !== level) };
      } else {
        return { ...prevData, tournamentLevels: [...prevData.tournamentLevels, level] };
      }
    });
  };

  return (
    <div className="mb-4">
      {formData.userTypes.includes('player') && (
        <>
          <label className="block text-sm font-medium mb-2">Interest Geography (Player)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['local', 'regional', 'national', 'international'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleRegionalLevel(level)}
                className={`px-3 py-1 rounded ${
                  formData.regionalLevels.includes(level)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </>
      )}

      {formData.userTypes.includes('organizer') && (
        <>
          <label className="block text-sm font-medium mb-2 mt-4">Interest Geography (Organizer)</label>
          <div className="flex flex-wrap gap-2 mb-2">
            {['local', 'regional', 'national', 'international'].map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => toggleTournamentLevel(level)}
                className={`px-3 py-1 rounded ${
                  formData.tournamentLevels.includes(level)
                    ? 'bg-purple-600 text-white'
                    : 'bg-gray-200 text-gray-800'
                }`}
              >
                {level}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default GeographySelection;