import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InterestedFeatures, { playerFeatures, organizerFeatures } from '../InterestedFeatures'; // Import features
import { FormData } from '../../../WaitListForm';

const mockSetFormData = jest.fn();

const defaultFormData: FormData = {
  name: '',
  country: '',
  region: '',
  sports: [],
  otherSports: [],
  playerInterestedFeatures: [],
  organizerInterestedFeatures: [],
  competitionLevels: [],
  regionalLevels: [],
  tournamentLevels: [],
  additionalFeatures: '',
  userTypes: ['player', 'organizer'],
  honeypot: '',
};

describe('InterestedFeatures', () => {
  it('renders player and organizer features when both user types are selected', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Player Features:/i)).toBeInTheDocument();
    expect(screen.getByText(/Organizer Features:/i)).toBeInTheDocument();
  });

  const testFeatureSelection = (userType: 'player' | 'organizer') => {
    const features = userType === 'player' ? playerFeatures : organizerFeatures;
    const formDataKey = userType === 'player' ? 'playerInterestedFeatures' : 'organizerInterestedFeatures';

    it(`allows selecting up to 5 ${userType} features`, () => {
      render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
      
      const featureElements = features.map((feature: string) => 
        screen.getAllByRole('checkbox', { name: feature })
          .find(el => el.closest('div')?.textContent?.includes(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Features`))
      ).filter((el): el is HTMLElement => el !== undefined);

      featureElements.slice(0, 5).forEach((element: HTMLElement) => fireEvent.click(element));
      expect(mockSetFormData).toHaveBeenCalledTimes(5);
      
      if (featureElements[5]) {
        fireEvent.click(featureElements[5]);
        expect(mockSetFormData).toHaveBeenCalledTimes(5); // Should not increase
      }
    });

    it(`allows adding custom ${userType} features`, () => {
      render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
      
      const otherButtons = screen.getAllByRole('button', { name: 'Other' });
      const otherButton = otherButtons.find(button => 
        button.closest('div')?.textContent?.includes(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Features`)
      );
      
      if (otherButton) {
        fireEvent.click(otherButton);
        const input = screen.getByRole('textbox', { name: new RegExp(`Enter other ${userType} feature`, 'i') });
        fireEvent.change(input, { target: { value: `Custom ${userType.charAt(0).toUpperCase() + userType.slice(1)} Feature` } });
        fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
        expect(mockSetFormData).toHaveBeenCalled();
      } else {
        throw new Error(`Could not find 'Other' button for ${userType} features`);
      }
    });

    it(`displays an error when less than 3 ${userType} features are selected`, () => {
      const formDataWithLessFeatures = {
        ...defaultFormData,
        [formDataKey]: ['Feature 1', 'Feature 2'],
      };
      render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
      expect(screen.getByText(new RegExp(`Selected ${userType.charAt(0).toUpperCase() + userType.slice(1)} Features`, 'i'))).toBeInTheDocument();
    });

    it(`displays an error message when fewer than 3 ${userType} features are selected`, () => {
      const formDataWithLessFeatures = {
        ...defaultFormData,
        [formDataKey]: ['Feature 1', 'Feature 2'],
      };
      render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
      expect(screen.getByText(new RegExp(`Please select at least 3 ${userType} features`, 'i'))).toBeInTheDocument();
    });

    it(`displays a message when the maximum number of ${userType} features is reached`, () => {
      const formDataWithMaxFeatures = {
        ...defaultFormData,
        [formDataKey]: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
      };
      render(<InterestedFeatures formData={formDataWithMaxFeatures} setFormData={mockSetFormData} />);
      expect(screen.getByText(new RegExp(`Selected ${userType.charAt(0).toUpperCase() + userType.slice(1)} Features`, 'i'))).toBeInTheDocument();
    });
  };

  describe('Player Features', () => {
    testFeatureSelection('player');
  });

  describe('Organizer Features', () => {
    testFeatureSelection('organizer');
  });


  it('displays an error when less than 3 features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Selected Player Features/i)).toBeInTheDocument();
    // You might want to add an error message in the component for this case
  });

  // New test case to check for minimum feature selection
  it('displays an error message when fewer than 3 player features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Please select at least 3 player features/i)).toBeInTheDocument();
  });

  // New test case to check for maximum feature selection
  it('displays a message when the maximum number of player features is reached', () => {
    const formDataWithMaxFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    };
    render(<InterestedFeatures formData={formDataWithMaxFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Selected Player Features/i)).toBeInTheDocument();
  });

  // New test case for organizer features
  it('displays an error when less than 3 organizer features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      organizerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Selected Organizer Features/i)).toBeInTheDocument();
  });

  // New test case to check for minimum feature selection for organizers
  it('displays an error message when fewer than 3 organizer features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      organizerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Please select at least 3 organizer features/i)).toBeInTheDocument();
  });

  // New test case to check for maximum feature selection for organizers
  it('displays a message when the maximum number of organizer features is reached', () => {
    const formDataWithMaxFeatures = {
      ...defaultFormData,
      organizerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    };
    render(<InterestedFeatures formData={formDataWithMaxFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Selected Organizer Features/i)).toBeInTheDocument();
  });

  // New test case to check for maximum feature selection
  it('displays a message when the maximum number of player features is reached', () => {
    const formDataWithMaxFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    };
    render(<InterestedFeatures formData={formDataWithMaxFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText(/Selected Player Features/i)).toBeInTheDocument();
  });

  // New test case for selecting both player and organizer features
  it('allows selecting features for both player and organizer roles', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);

    const selectFeatures = (userType: 'player' | 'organizer', count: number) => {
      const features = userType === 'player' ? playerFeatures : organizerFeatures;
      const featureElements = features.map((feature: string) => 
        screen.getAllByRole('checkbox', { name: feature })
          .find(el => el.closest('div')?.textContent?.includes(`${userType.charAt(0).toUpperCase() + userType.slice(1)} Features`))
      ).filter((el): el is HTMLElement => el !== undefined);

      featureElements.slice(0, count).forEach((element: HTMLElement) => fireEvent.click(element));
    };

    // Select 3 player features
    selectFeatures('player', 3);
    
    // Select 4 organizer features
    selectFeatures('organizer', 4);

    // Check if the correct number of features are selected for each role
    expect(screen.getByText(/Selected Player Features \(3\/5\)/)).toBeInTheDocument();
    expect(screen.getByText(/Selected Organizer Features \(4\/5\)/)).toBeInTheDocument();

    // Verify that setFormData was called the correct number of times (3 + 4 = 7)
    expect(mockSetFormData).toHaveBeenCalledTimes(7);

    // Try to select one more feature for each role
    selectFeatures('player', 1);
    selectFeatures('organizer', 1);

    // Check if the correct number of features are still selected (should be 4 and 5 now)
    expect(screen.getByText(/Selected Player Features \(4\/5\)/)).toBeInTheDocument();
    expect(screen.getByText(/Selected Organizer Features \(5\/5\)/)).toBeInTheDocument();

    // Verify that setFormData was called only once more (for the player feature)
    expect(mockSetFormData).toHaveBeenCalledTimes(8);
  });
});