import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import WaitListForm from './WaitListForm';
import { signUpWithGoogle, signUpWithFacebook, signUpWithEmailAndPassword } from '../lib/auth';

jest.mock('../lib/auth', () => ({
  signUpWithGoogle: jest.fn(),
  signUpWithFacebook: jest.fn(),
  signUpWithEmailAndPassword: jest.fn(),
}));

describe('WaitListForm', () => {
  beforeEach(() => {
    render(<WaitListForm />);
  });

  const fillForm = async () => {
    await userEvent.click(screen.getByText('Player'));
    await userEvent.type(screen.getByPlaceholderText('Name'), 'John Doe');
    await userEvent.selectOptions(screen.getByLabelText('Country'), 'USA');
    await userEvent.selectOptions(screen.getByLabelText('Region'), 'California');
    await userEvent.click(screen.getByText('Soccer'));
    await userEvent.click(screen.getByText('Amateur'));
    await userEvent.click(screen.getByText('Feature 1'));
    await userEvent.click(screen.getByText('Feature 2'));
    await userEvent.click(screen.getByText('Feature 3'));
    await userEvent.click(screen.getByText('Local'));
  };

  it('should display validation errors on submit with invalid data', async () => {
    await userEvent.click(screen.getByText(/Continue with Email and Password/i));
    expect(await screen.findByText(/Form is not valid/i)).toBeInTheDocument();
  });

  it('should call signUpWithEmailAndPassword on valid form submission', async () => {
    await fillForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'test@example.com');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    
    await userEvent.click(screen.getByText(/Continue with Email and Password/i));
    
    await waitFor(() => {
      expect(signUpWithEmailAndPassword).toHaveBeenCalledWith('test@example.com', 'password123', expect.any(Object));
    });
  });

  it('should call signUpWithGoogle when Google button is clicked', async () => {
    await fillForm();
    await userEvent.click(screen.getByText(/Continue with Google/i));
    
    await waitFor(() => {
      expect(signUpWithGoogle).toHaveBeenCalledWith(expect.any(Object));
    });
  });

  it('should show "Coming soon" for Facebook signup', async () => {
    await fillForm();
    await userEvent.click(screen.getByText(/Continue with Facebook/i));
    
    expect(await screen.findByText('Coming soon!')).toBeInTheDocument();
  });

  it('should validate email format', async () => {
    await fillForm();
    await userEvent.type(screen.getByPlaceholderText('Email'), 'invalid-email');
    await userEvent.type(screen.getByPlaceholderText('Password'), 'password123');
    
    await userEvent.click(screen.getByText(/Continue with Email and Password/i));
    
    expect(await screen.findByText('Please enter a valid email address.')).toBeInTheDocument();
  });

  it('should toggle password visibility', async () => {
    const passwordInput = screen.getByPlaceholderText('Password');
    const toggleButton = screen.getByText('Show');

    expect(passwordInput).toHaveAttribute('type', 'password');

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'text');

    await userEvent.click(toggleButton);
    expect(passwordInput).toHaveAttribute('type', 'password');
  });
});