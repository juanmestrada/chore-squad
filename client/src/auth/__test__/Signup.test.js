import { render, screen, fireEvent } from "@testing-library/react";
import '@testing-library/jest-dom';
import Session from "../Sessions";

// mocked component header
const mockedComponentHeader = (
    <>
    </>
);

// mocked component alternate link
const mockedAltLink = (
    <>
    </>
);

// mocked functions from useAuth
jest.mock('../../context/UserContext', () => {
    const originalModule = jest.requireActual('../../context/UserContext');

    return {
        __esModule: true,
        ...originalModule,
        useAuth: () => ({
            login: jest.fn(),
            signup: jest.fn(() => {return {isLoading: false}}),
            seErrorMessage: jest.fn()
        }),
    }
});

// test signup component
describe("Signup Component", () => {

    // sessions component should render only input elements for signup
    it("should render correct input elements", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Sign Up" altLink={mockedAltLink} isLogin={false} />);

        const usernameInputElement = screen.getByPlaceholderText(/Username/i);
        const fullNameInputElement = screen.getByPlaceholderText(/Full Name/i);
        const passwordInputElement = screen.getByPlaceholderText(/Password.../i);
        const confirmPasswordInputElement = screen.getByPlaceholderText(/Confirm password/i);
        
        expect(usernameInputElement).toBeInTheDocument();
        expect(fullNameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
        expect(confirmPasswordInputElement).toBeInTheDocument();
    });

    // should show username typed by user for username input element
    it("should show username when user types in username input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Sign Up" altLink={mockedAltLink} isLogin={false} />);

        const usernameInputElement = screen.getByPlaceholderText(/Username/i);

        fireEvent.change(usernameInputElement, {target: {value: "juan-username"}});

        expect(usernameInputElement.value).toBe("juan-username");
    });

    // should show full name typed by user for full name input element
    it("should show full namee when user types in full name input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Sign Up" altLink={mockedAltLink} isLogin={false} />);

        const fullNameInputElement = screen.getByPlaceholderText(/Full Name/i);

        fireEvent.change(fullNameInputElement, {target: {value: "juan estrada"}});

        expect(fullNameInputElement.value).toBe("juan estrada");
    });

    // should show password typed by user for password input element
    it("should show password when user types in password input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Sign Up" altLink={mockedAltLink} isLogin={false} />);

        const passwordInputElement = screen.getByPlaceholderText(/Password.../i);

        fireEvent.change(passwordInputElement, {target: {value: "Password123!"}});

        expect(passwordInputElement.value).toBe("Password123!");
    });

    // should show password confirmation typed by user for password confirmation input element
    it("should show password confirmation when user types in password confirmation input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Sign Up" altLink={mockedAltLink} isLogin={false} />);

        const confirmPasswordInputElement = screen.getByPlaceholderText(/Confirm password/i);

        fireEvent.change(confirmPasswordInputElement, {target: {value: "Password123!"}});

        expect(confirmPasswordInputElement.value).toBe("Password123!");
    });
});