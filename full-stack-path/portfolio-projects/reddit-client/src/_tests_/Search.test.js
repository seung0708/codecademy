import React from 'react'
import {render, screen, fireEvent} from '@testing-library/react'
import '@testing-library/jest-dom';
import Search from '../components/Search';

describe('Search component', () => {
   test('render elements in Search component', () => {
        render(<Search />);
        const form = screen.getByRole('search')
        const input = screen.getByPlaceholderText('Search Reddit')
    
        expect(form).toBeInTheDocument();
        expect(input).toBeInTheDocument();
        expect(input.value).toBe('');
   })
})

