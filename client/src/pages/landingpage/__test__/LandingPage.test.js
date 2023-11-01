import { render, screen } from "@testing-library/react";
import '@testing-library/jest-dom';
import LandingPage from "../LandingPage";
import { BrowserRouter } from "react-router-dom";
import { useAuth } from "../../../context/UserContext";

// mocked BrowserRouter
const MockedLandingPage = () => {
    return (
        <BrowserRouter>
            <LandingPage />
        </BrowserRouter>
    )
}

// mock useAuth hook
jest.mock('../../../context/UserContext', () => ({
    useAuth: jest.fn()
}));


// test LandingPage
describe("LandingPage", () => {
    // should display default greeting
    it("should render default greeting", async () => {
        // mock user to be null
        useAuth.mockImplementation(() => ({
            user: null    
        }));
        
        render(<MockedLandingPage />);

        const signedInGreeting = screen.queryByTestId('landingpage-greeting');

        expect(signedInGreeting).not.toBeInTheDocument();
    });

    // should display personal greeting for signed in user
    it("should render greeting for logged in user", async () => {
        // mock user to juan estrada
        useAuth.mockImplementation(() => ({
            user: {
                fullName: "juan estrada"
            }
        }));

        render(<MockedLandingPage />);

        const signedInGreeting = screen.queryByTestId('landingpage-greeting');

        expect(signedInGreeting).toBeInTheDocument();    
    });
});
