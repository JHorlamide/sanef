import { render, screen, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import ForgotPassword from "./ForgotPassword";

const MockForgotPassword = () => {
  return (
    <BrowserRouter>
      <ForgotPassword />
    </BrowserRouter>
  );
};

describe("the ForgotPassword component", () => {
  it("should render the component correctly", () => {
    render(<MockForgotPassword />);

    const headingElement = screen.getByRole("heading", { level: 1 });
    const paragraphElement = screen.getByText(/let us help you/i);

    expect(headingElement).toHaveTextContent(/forgot password?/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  it("should render the input correctly", () => {
    render(<MockForgotPassword />);

    const inputElement = screen.getByTestId("email-input");
    expect(inputElement).toBeInTheDocument();
  });

  it("should be able to type in the input", () => {
    const inputValue = "user@gmail.com";
    render(<MockForgotPassword />);

    const inputElement = screen.getByTestId(
      "email-input"
    ) as unknown as HTMLInputElement;

    fireEvent.change(inputElement, {
      target: { value: inputValue }
    });

    expect(inputElement.value).toBe(inputValue);
  });

  it("should show error message when the input is empty and the button is clicked", async () => {
    render(<MockForgotPassword />);
    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const errorMessage = await screen.findByText(/email is required/i);

    expect(errorMessage).toBeInTheDocument();
  });
});
