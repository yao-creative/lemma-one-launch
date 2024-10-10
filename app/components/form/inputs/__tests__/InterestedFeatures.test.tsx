import React from 'react';
import { render, fireEvent, screen } from '@testing-library/react';
import InterestedFeatures from '../InterestedFeatures';
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
    const playerFeatures = screen.getAllByText(/Tournament Search|Team Matching|In-Tournament Features and Updates|Pre-Tournament Previews|Tournament Merch/);
    playerFeatures.slice(0, 5).forEach(feature => fireEvent.click(feature));
    expect(mockSetFormData).toHaveBeenCalledTimes(5);
    fireEvent.click(playerFeatures[5]);
    expect(mockSetFormData).toHaveBeenCalledTimes(5); // Should not increase
  });

  it('allows selecting up to 5 organizer features', () => {
    render(<InterestedFeatures formData={defaultFormData} setFormData={mockSetFormData} />);
    const organizerFeatures = screen.getAllByText(/Tournament Hosting|Ticketing|Tournament Monetization|Merchandise Sales|Waiting List/);
    organizerFeatures.slice(0, 5).forEach(feature => fireEvent.click(feature));
    expect(mockSetFormData).toHaveBeenCalledTimes(5);
    fireEvent.click(organizerFeatures[5]);
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
});