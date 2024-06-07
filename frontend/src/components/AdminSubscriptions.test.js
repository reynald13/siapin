import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AdminSubscriptions from './AdminSubscriptions';

jest.mock('axios');

test('admin can create and delete subscription plans', async () => {
  const subscriptions = [
    { _id: '1', name: 'Basic', benefits: ['Benefit 1', 'Benefit 2'], price: 10, duration: 30 },
  ];

  axios.get.mockResolvedValue({ data: subscriptions });
  axios.post.mockResolvedValue({
    data: { _id: '2', name: 'Premium', benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'], price: 20, duration: 60 }
  });
  axios.delete.mockResolvedValue({});

  render(<AdminSubscriptions />);

  // Check initial subscription plans
  await waitFor(() => {
    expect(screen.getByText(/Basic/)).toBeInTheDocument();
  });

  // Create a new subscription plan
  fireEvent.change(screen.getByPlaceholderText(/Name/), { target: { value: 'Premium' } });
  fireEvent.change(screen.getByPlaceholderText(/Benefits/), { target: { value: 'Benefit 1, Benefit 2, Benefit 3' } });
  fireEvent.change(screen.getByPlaceholderText(/Price/), { target: { value: '20' } });
  fireEvent.change(screen.getByPlaceholderText(/Duration/), { target: { value: '60' } });
  fireEvent.click(screen.getByText(/Add Subscription/));

  // Check if the new subscription plan is added
  await waitFor(() => {
    expect(screen.getByText(/Premium/)).toBeInTheDocument();
  });

  // Delete a subscription plan
  fireEvent.click(screen.getAllByText(/Delete/)[0]);

  // Check if the subscription plan is removed
  await waitFor(() => {
    expect(screen.queryByText(/Basic/)).not.toBeInTheDocument();
  });
});