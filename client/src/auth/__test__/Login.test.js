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
            login: jest.fn(() => {return {isLoading: false}}),
            signup: jest.fn(),
            seErrorMessage: jest.fn()
        }),
    }
});

// test login component
describe("Login Component", () =>{

    // sessions component should render only input elements for login
    it("should render correct input elements for login component", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Log In" altLink={mockedAltLink} isLogin={true} />);

        const usernameInputElement = screen.getByPlaceholderText(/Username/i);
        const passwordInputElement = screen.getByPlaceholderText(/Password.../i);

        expect(usernameInputElement).toBeInTheDocument();
        expect(passwordInputElement).toBeInTheDocument();
    });

    // should show username typed by user for username input element
    it("should show username when user types in username input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Log In" altLink={mockedAltLink} isLogin={true} />);

        const usernameInputElement = screen.getByPlaceholderText(/Username/i);

        fireEvent.change(usernameInputElement, {target: {value: "juan-username"}});

        expect(usernameInputElement.value).toBe("juan-username");
    });

    // should show password typed by user for password input element
    it("should show password when user types in password input element", async () => {
        render(<Session componentHeader={mockedComponentHeader} btnText="Log In" altLink={mockedAltLink} isLogin={true} />);

        const passwordInputElement = screen.getByPlaceholderText(/Password.../i);

        fireEvent.change(passwordInputElement, {target: {value: "Password123!"}});

        expect(passwordInputElement.value).toBe("Password123!");
    });
});