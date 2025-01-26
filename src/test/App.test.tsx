import '@testing-library/jest-dom';

import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';


test('renders the app and interacts with a button', async () => {
  render(<App />);

  // Check if the main header renders
  const headerElement = screen.getByText(/Julian PMS/i); // Replace with actual text in your App
  expect(headerElement).toBeInTheDocument();

  // Interact with a button and verify behavior
  const dashboardButton = screen.getByRole('button', { name: /Dashboard/i });
  expect(dashboardButton).toBeInTheDocument();

  // Simulate clicking the button
  userEvent.click(dashboardButton);

  // Verify that something related to the Dashboard renders
  const dashboardHeading = await screen.findByText(/Welcome to Dashboard/i); // Adjust text based on your Dashboard
  expect(dashboardHeading).toBeInTheDocument();
});
