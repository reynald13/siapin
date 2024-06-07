import React from 'react';
import { render, screen, fireEvent, waitFor, act } from '@testing-library/react';
import '@testing-library/jest-dom';
import axios from 'axios';
import TakeExam from './TakeExam';

jest.mock('axios');

const mockQuestions = [
  {
    _id: '1',
    question: 'What is 2 + 2?',
    options: ['3', '4', '5', '6'],
    correctAnswer: '4',
  },
  {
    _id: '2',
    question: 'What is the capital of France?',
    options: ['Berlin', 'Madrid', 'Paris', 'Rome'],
    correctAnswer: 'Paris',
  },
];

describe('TakeExam Component', () => {
  beforeEach(() => {
    axios.get.mockResolvedValue({ data: mockQuestions });
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  test('renders loading state initially', () => {
    render(<TakeExam />);
    expect(screen.getByText(/Loading questions.../i)).toBeInTheDocument();
  });

  test('renders questions after loading', async () => {
    await act(async () => {
      render(<TakeExam />);
    });

    await waitFor(() => {
      expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
    });
    fireEvent.click(screen.getByText(/Next/i));
    await waitFor(() => {
      expect(screen.getByText(/What is the capital of France\?/i)).toBeInTheDocument();
    });
  });

  test('allows navigating between questions and submitting answers', async () => {
    await act(async () => {
      render(<TakeExam />);
    });

    await waitFor(() => {
      expect(screen.getByText(/What is 2 \+ 2\?/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('4'));
    fireEvent.click(screen.getByText(/Next/i));

    await waitFor(() => {
      expect(screen.getByText(/What is the capital of France\?/i)).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('Paris'));
    fireEvent.click(screen.getByText(/Submit/i));

    await waitFor(() => {
      expect(screen.getByText(/Your score/i)).toBeInTheDocument();
    });
  });
});