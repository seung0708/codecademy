import {render, screen } from '@testing-library/react'
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
    test('renders reddit logo', () => {
        render(<Header />)
        const logo = screen.getByAltText('/reddit/i');
        expect(logo).toBeInTheDocument();
    })
    test('renders search component', () => {
        render(<Header />);
        expect(screen.getByRole('search')).toBeInTheDocument();
    })
})