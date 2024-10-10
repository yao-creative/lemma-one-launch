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
    expect(screen.getByText('Player Features:')).toBeInTheDocument();
    expect(screen.getByText('Organizer Features:')).toBeInTheDocument();
  });

  it('allows selecting up to 5 player features', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    const playerFeatureElements = playerFeatures.map((feature: string) => screen.getByText(feature));
    playerFeatureElements.slice(0, 5).forEach((element: HTMLElement) => fireEvent.click(element));
    expect(mockSetFormData).toHaveBeenCalledTimes(5);
    fireEvent.click(playerFeatureElements[5]);
    expect(mockSetFormData).toHaveBeenCalledTimes(5); // Should not increase
  });

  it('allows selecting up to 5 organizer features', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    const organizerFeatureElements = organizerFeatures.map((feature: string) => screen.getByText(feature));
    organizerFeatureElements.slice(0, 5).forEach((element: HTMLElement) => fireEvent.click(element));
    expect(mockSetFormData).toHaveBeenCalledTimes(5);
    fireEvent.click(organizerFeatureElements[5]);
    expect(mockSetFormData).toHaveBeenCalledTimes(5); // Should not increase
  });

  it('allows adding custom player features', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    fireEvent.click(screen.getByText('Other'));
    const input = screen.getByPlaceholderText('Enter other player feature and press Enter to add');
    fireEvent.change(input, { target: { value: 'Custom Player Feature' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetFormData).toHaveBeenCalled();
  });

  it('allows adding custom organizer features', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    fireEvent.click(screen.getAllByText('Other')[1]);
    const input = screen.getByPlaceholderText('Enter other organizer feature and press Enter to add');
    fireEvent.change(input, { target: { value: 'Custom Organizer Feature' } });
    fireEvent.keyDown(input, { key: 'Enter', code: 'Enter' });
    expect(mockSetFormData).toHaveBeenCalled();
  });

  it('displays an error when less than 3 features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText('Selected Player Features (2/5): Feature 1, Feature 2')).toBeInTheDocument();
    // You might want to add an error message in the component for this case
  });

  // New test case to check for minimum feature selection
  it('displays an error message when fewer than 3 player features are selected', () => {
    const formDataWithLessFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2'],
    };
    render(<InterestedFeatures formData={formDataWithLessFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText('Please select at least 3 player features.')).toBeInTheDocument();
  });

  // New test case to check for maximum feature selection
  it('displays a message when the maximum number of player features is reached', () => {
    const formDataWithMaxFeatures = {
      ...defaultFormData,
      playerInterestedFeatures: ['Feature 1', 'Feature 2', 'Feature 3', 'Feature 4', 'Feature 5'],
    };
    render(<InterestedFeatures formData={formDataWithMaxFeatures} setFormData={mockSetFormData} />);
    expect(screen.getByText('Selected Player Features (5/5): Feature 1, Feature 2, Feature 3, Feature 4, Feature 5')).toBeInTheDocument();
  });
});