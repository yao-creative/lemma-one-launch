import { checkExistingUser, storeUserData } from '../Submission';
import { db } from '../../../../lib/firebase';
import { doc, setDoc, getDoc, collection, query, where, getDocs } from 'firebase/firestore';
import { isFormValid } from '../Validation';

jest.mock('firebase/firestore');
jest.mock('./Validation');

describe('Submission Functions', () => {
  const mockUid = 'testUid';
  const mockFormData = {
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
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('checkExistingUser', () => {
    it('should throw an error if user already exists by UID', async () => {
      jest.mocked(getDoc).mockResolvedValueOnce({ exists: () => true } as any);
      
      await expect(checkExistingUser(mockUid)).rejects.toThrow('User already signed up');
    });

    it('should throw an error if user exists by email', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      (getDocs as jest.Mock).mockResolvedValueOnce({ empty: false });

      await expect(checkExistingUser(mockUid, 'test@example.com')).rejects.toThrow('User already exists with this email or Facebook account');
    });

    it('should not throw an error if user does not exist', async () => {
      (getDoc as jest.Mock).mockResolvedValueOnce({ exists: () => false });
      (getDocs as jest.Mock).mockResolvedValueOnce({ empty: true });

      await expect(checkExistingUser(mockUid, 'test@example.com')).resolves.not.toThrow();
    });
  });

  describe('storeUserData', () => {
    it('should store user data successfully', async () => {
      (isFormValid as jest.Mock).mockReturnValueOnce({ isValid: true, errors: [] });
      (setDoc as jest.Mock).mockResolvedValueOnce(undefined);

      await storeUserData(mockUid, mockFormData, 'email', 'test@example.com');

      expect(setDoc).toHaveBeenCalledWith(doc(db, 'users', mockUid), expect.objectContaining({
        name: 'John Doe',
        userTypes: ['player'],
        location: { country: 'USA', state: 'California' },
        sports: ['Soccer'],
        competitionLevels: ['Amateur'],
        interestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3'],
        signupMethod: 'email',
        signUpData: 'test@example.com',
        email: 'test@example.com',
        authProvider: 'email',
      }));
    });

    it('should throw an error if form data is invalid', async () => {
      (isFormValid as jest.Mock).mockReturnValueOnce({ isValid: false, errors: ['Invalid data'] });

      await expect(storeUserData(mockUid, mockFormData, 'email', 'test@example.com')).rejects.toThrow('Form is not valid: Invalid data');
    });

    it('should handle permission-denied error', async () => {
      (isFormValid as jest.Mock).mockReturnValueOnce({ isValid: true, errors: [] });
      (setDoc as jest.Mock).mockRejectedValueOnce(new Error('permission-denied'));

      await expect(storeUserData(mockUid, mockFormData, 'email', 'test@example.com')).rejects.toThrow('Unable to save user data due to permission issues. Please try again or contact support.');
    });
  });
});