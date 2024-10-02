import { FormData } from '../../WaitListForm';

export const isFormValid = (formData: FormData): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];
  
  if (formData.name.trim() === '') errors.push('Name is required');
  if (formData.country === '') errors.push('Country is required');
  if (formData.region === '') errors.push('Region is required');
  if (formData.sports.length === 0) errors.push('At least one sport must be selected');
  if (formData.competitionLevels.length === 0) errors.push('At least one competition level must be selected');
  if (formData.userTypes.length === 0) errors.push('At least one user type must be selected');

  if (formData.userTypes.includes('player')) {
    if (formData.playerInterestedFeatures.length < 3 || formData.playerInterestedFeatures.length > 5) {
      errors.push('Players must select 3-5 interested features');
    }
    if (formData.regionalLevels.length === 0) errors.push('Players must select at least one regional level');
  }

  if (formData.userTypes.includes('organizer')) {
    if (formData.organizerInterestedFeatures.length < 3 || formData.organizerInterestedFeatures.length > 5) {
      errors.push('Organizers must select 3-5 interested features');
    }
    if (formData.tournamentLevels.length === 0) errors.push('Organizers must select at least one tournament level');
  }

  return { isValid: errors.length === 0, errors };
};
