import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import UserPerformance from './UserPerformance';

jest.mock('axios');

const mockPerformanceData = [
  {
    _id: '1',
    userId: '123',
    score: 5,
    totalQuestions: 10,
    date: '2023-01-01T00:00:00.000Z',
  },
  {
    _id: '2',
    userId: '123',
    score: 8,
    totalQuestions: 10,
    date: '2023-02-01T00:00:00.000Z',
  },
];

describe('UserPerformance Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockPerformanceData });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders no performance data available when there is no data', async () => {
    axios.get.mockResolvedValue({ data: [] });

    render(<UserPerformance />);
    await waitFor(() => {
      expect(screen.getByText(/No performance data available/i)).toBeInTheDocument();
    });
  });

  test('renders performance data', async () => {
    render(<UserPerformance />);

    await waitFor(() => {
      expect(screen.getByText(/Date: 1\/1\/2023/i)).toBeInTheDocument();
    });
    expect(screen.getByText(/Score: 5 \/ 10/i)).toBeInTheDocument();
    expect(screen.getByText(/Date: 2\/1\/2023/i)).toBeInTheDocument();
    expect(screen.getByText(/Score: 8 \/ 10/i)).toBeInTheDocument();
  });
});