import {render, screen, fireEvent} from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Search from '../components/Search';

describe('Search component', () => {
  const mockSetQuery = jest.fn();
  const mockHandleSubmit = jest.fn(e => e.preventDefault());

  beforeEach(() => {
    jest.clearAllMocks();
  })

  test('renders search input with placeholder', () => {
    render(<Search query="" setQuery={mockSetQuery} handleSubmit={mockHandleSubmit} />);
    expect(screen.getByPlaceholderText('Search Reddit')).toBeInTheDocument();
  })
  
  test('updates query on input change', async () => {
    render(<Search query="" setQuery={mockSetQuery} handleSubmit={mockHandleSubmit} />);
    const input = screen.getByPlaceholderText('Search Reddit');
    await userEvent.type(input, 'test search');
    expect(mockSetQuery).toHaveBeenCalledWith('test search');
  });

  test('submits search on form submission', () => {
    render(<Search query="test" setQuery={mockSetQuery} handleSubmit={mockHandleSubmit} />);
    const form = screen.getByRole('search');
    fireEvent.submit(form);
    expect(mockHandleSubmit).toHaveBeenCalled();
  });
})

