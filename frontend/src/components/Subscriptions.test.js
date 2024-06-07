import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import Subscriptions from './Subscriptions';

jest.mock('axios');

test('renders subscription plans', async () => {
  const subscriptions = [
    { _id: '1', name: 'Basic', benefits: ['Benefit 1', 'Benefit 2'], price: 10, duration: 30 },
    { _id: '2', name: 'Premium', benefits: ['Benefit 1', 'Benefit 2', 'Benefit 3'], price: 20, duration: 60 },
  ];

  axios.get.mockResolvedValue({ data: subscriptions });

  render(<Subscriptions />);

  await waitFor(() => {
    expect(screen.getByText(/Basic/)).toBeInTheDocument();
    expect(screen.getByText(/Premium/)).toBeInTheDocument();
  });
});