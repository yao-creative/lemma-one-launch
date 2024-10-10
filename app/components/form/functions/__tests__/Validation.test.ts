import { isFormValid } from '../Validation';
import { FormData } from '../../../WaitListForm';

describe('isFormValid', () => {
  const validFormData: FormData = {
    name: 'John Doe',
    country: 'USA',
    region: 'California',
    sports: ['Soccer'],
    otherSports: [],
    competitionLevels: ['Amateur'],
    userTypes: ['player'],
    playerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
    organizerInterestedFeatures: [],
    regionalLevels: ['Local'],
    tournamentLevels: [],
    additionalFeatures: '',
    honeypot: '',
  };

  it('should return valid for a complete player form', () => {
    const { isValid, errors } = isFormValid(validFormData);
    expect(isValid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it('should return valid for a complete organizer form', () => {
    const organizerForm = {
      ...validFormData,
      userTypes: ['organizer'],
      organizerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
      tournamentLevels: ['Local'],
      regionalLevels: [],
    };
    const { isValid, errors } = isFormValid(organizerForm as FormData);
    expect(isValid).toBe(true);
    expect(errors).toHaveLength(0);
  });

  it('should return invalid for missing required fields', () => {
    const invalidForm: FormData = {
      name: '',
      country: '',
      region: '',
      sports: [],
      otherSports: [],
      competitionLevels: [],
      userTypes: [],
      playerInterestedFeatures: [],
      organizerInterestedFeatures: [],
      regionalLevels: [],
      tournamentLevels: [],
      additionalFeatures: '',
      honeypot: '',
    };
    const { isValid, errors } = isFormValid(invalidForm);
    expect(isValid).toBe(false);
    expect(errors).toContain('Name is required');
    expect(errors).toContain('Country is required');
    expect(errors).toContain('Region is required');
    expect(errors).toContain('At least one sport must be selected');
    expect(errors).toContain('At least one competition level must be selected');
    expect(errors).toContain('At least one user type must be selected');
  });

  it('should validate player-specific fields', () => {
    const playerForm = {
      ...validFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
      regionalLevels: [],
    };
    const { isValid, errors } = isFormValid(playerForm);
    expect(isValid).toBe(false);
    expect(errors).toContain('Players must select 3-5 interested features');
    expect(errors).toContain('Players must select at least one regional level');
  });

  it('should validate organizer-specific fields', () => {
    const organizerForm = {
      ...validFormData,
      userTypes: ['organizer'],
      organizerInterestedFeatures: ['Feature 1', 'Feature 2'],
      tournamentLevels: [],
    };
    const { isValid, errors } = isFormValid(organizerForm as FormData);
    expect(isValid).toBe(false);
    expect(errors).toContain('Organizers must select 3-5 interested features');
    expect(errors).toContain('Organizers must select at least one tournament level');
  });

  it('should validate both player and organizer fields when both types are selected', () => {
    const bothTypesForm = {
      ...validFormData,
      userTypes: ['player', 'organizer'],
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
      organizerInterestedFeatures: ['Feature 1', 'Feature 2'],
      tournamentLevels: [],
    };
    const { isValid, errors } = isFormValid(bothTypesForm as FormData);
    expect(isValid).toBe(false);
    expect(errors).toContain('Players must select 3-5 interested features');
    expect(errors).toContain('Organizers must select 3-5 interested features');
    expect(errors).toContain('Organizers must select at least one tournament level');
  });
});