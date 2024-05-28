import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import ContactUs from '../components/ContactUs';
import ThemeContext, { ThemeProvider } from '../context/ThemeContext';
import { MemoryRouter } from 'react-router-dom';
import Adapter from 'enzyme-adapter-react-16';
import { render, screen } from '@testing-library/react';

Enzyme.configure({ adapter: new Adapter() });

describe('ContactUs component', () => {

    it('renders component without crashing', () => {
        const wrapper = shallow(
            <ThemeProvider>
                <ThemeContext.Provider value={{ theme: 'food1', setTheme: jest.fn(), minHeight: 'min-height-100vh', setMinHeight: jest.fn() }}>
                    <MemoryRouter>
                        <ContactUs jwt="Bearer token" />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </ThemeProvider>
        );
        expect(wrapper.exists()).toBe(true);
    });


    it('renders general inquiries section', () => {
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
                        <ContactUs jwt={'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.'} />
                    </MemoryRouter>
                </ThemeContext.Provider>
            </ThemeProvider>
        );
        const generalInquiriesHeader = screen.getByText('General Inquiries');
        expect(generalInquiriesHeader).toBeInTheDocument();

        const generalInquiriesEmail = screen.getByRole('link', { name: /furygeneralinquiries@furynewsapp.com/i });
        expect(generalInquiriesEmail).toBeInTheDocument();

        const generalInquiriesPhone = screen.getByText(/[(][+]1[)] 555[-]555[-]5555/i);
        expect(generalInquiriesPhone).toBeInTheDocument();
    });

});
