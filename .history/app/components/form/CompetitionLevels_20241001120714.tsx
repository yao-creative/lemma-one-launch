import React from 'react';

interface CompetitionLevelsProps {
  formData: {
    competitionLevels: string[];
  };
  setFormData: React.Dispatch<React.SetStateAction<CompetitionLevelsProps['formData']>>;
}

const CompetitionLevels: React.FC<CompetitionLevelsProps> = ({ formData, setFormData }) => {
  const toggleCompetitionLevel = (level: string) => {
    setFormData((prevData) => {
      if (prevData.competitionLevels.includes(level)) {
        return { ...prevData, competitionLevels: prevData.competitionLevels.filter((l) => l !== level) };
      } else {
        return { ...prevData, competitionLevels: [...prevData.competitionLevels, level] };
      }
    });
  };

  return (
    <div className="mb-4">
      <label className="block text-sm font-medium mb-2">Select Competition Levels</label>
      <div className="flex flex-wrap gap-2 mb-2">
        {['amateur', 'semi-professional', 'professional'].map((level) => (
          <button
            key={level}
            type="button"
            onClick={() => toggleCompetitionLevel(level)}
            className={`px-3 py-1 rounded ${
              formData.competitionLevels.includes(level)
                ? 'bg-purple-600 text-white'
                : 'bg-gray-200 text-gray-800'
            }`}
          >
            {level}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CompetitionLevels;