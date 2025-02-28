import React from 'react'
import {render, screen, fireEvent, getByPlaceholderText} from '@testing-library/react'
import '@testing-library/jest-dom';
import Header from '../components/Header';

describe('Header Component', () => {
    test('should render header component', () => {
        render(<Header />)
        const header = screen.getByRole('banner');
        expect(header).toBeInTheDocument();
    })
    test('should render logo', () => {
        render(<Header />)
        const image = screen.getByAltText('logo')
        expect(image).toBeInTheDocument();
        expect(image).toHaveAttribute('src', '/assets/icons8-reddit.svg')
    })
})