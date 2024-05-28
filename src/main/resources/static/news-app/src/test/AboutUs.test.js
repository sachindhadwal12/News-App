import React from 'react';
import { render, screen } from '@testing-library/react';
import AboutUs from '../components/AboutUs';
import ThemeContext, { ThemeProvider } from '../context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';

describe('AboutUs component', () => {
    it('renders component without crashing', () => {
        // Mock the ThemeProvider to provide the ThemeContext values
        const setMinHeightMock = jest.fn();
        const contextValues = {
            theme: 'food1',
            setTheme: jest.fn(),
            minHeight: 'min-height-100vh',
            setMinHeight: setMinHeightMock,
        };

        render(
            <ThemeProvider>
                <ThemeContext.Provider value={contextValues}>
                    <MemoryRouter>
                        <AboutUs jwt={'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'} />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </ThemeProvider>
        );

        const aboutUsElement = screen.getByText(/About Us/i);
        expect(aboutUsElement).toBeInTheDocument();
    });


    it('displays mission statement', () => {
        // Mock the ThemeProvider to provide the ThemeContext values
        const setMinHeightMock = jest.fn();
        const contextValues = {
            theme: 'food1',
            setTheme: jest.fn(),
            minHeight: 'min-height-100vh',
            setMinHeight: setMinHeightMock,
        };

        render(
            <ThemeProvider>
                <ThemeContext.Provider value={contextValues}>
                    <MemoryRouter>
                        <AboutUs jwt={'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'} />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </ThemeProvider>
        );

        // Find the <h4> element with "Our Mission" text
        const missionHeader = screen.getByRole('heading', { name: /Our Mission/i });

        // Assert that the <h4> element is present
        expect(missionHeader).toBeInTheDocument();
        const missionContent = screen.getByText(/revolutionize the way people discover and consume news/i);
        expect(missionContent).toBeInTheDocument();
    });

    it('displays what we offer', () => {
        // Mock the ThemeProvider to provide the ThemeContext values
        const setMinHeightMock = jest.fn();
        const contextValues = {
            theme: 'food1',
            setTheme: jest.fn(),
            minHeight: 'min-height-100vh',
            setMinHeight: setMinHeightMock,
        };

        render(
            <ThemeProvider>
                <ThemeContext.Provider value={contextValues}>
                    <MemoryRouter>
                        <AboutUs jwt={'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'} />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </ThemeProvider>
        );
        const offerHeader = screen.getByText(/What We Offer/i);
        expect(offerHeader).toBeInTheDocument();
        const offerContent = screen.getByText(/comprehensive coverage:/i);
        expect(offerContent).toBeInTheDocument();
    });

});
