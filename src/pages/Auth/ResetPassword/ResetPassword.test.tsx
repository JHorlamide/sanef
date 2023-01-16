import { fireEvent, render, screen } from "@testing-library/react";
import ResetPassword from "./ResetPassword";

describe("the ResetPassword component", () => {
  it("should render the component correctly", () => {
    render(<ResetPassword />);

    const headingElement = screen.getByRole("heading", { level: 1 });
    const paragraphElement = screen.getByText(/please enter /i);

    expect(headingElement).toHaveTextContent(/reset password/i);
    expect(paragraphElement).toBeInTheDocument();
  });

  it("should render the inputs fields correctly", () => {
    render(<ResetPassword />);

    const passwordInput = screen.getByTestId("password-input");
    const confirmPasswordInput = screen.getByTestId("confirm-password-input");
    const buttonElement = screen.getByRole("button");

    expect(passwordInput).toBeInTheDocument();
    expect(buttonElement).toHaveTextContent("Set Password");
    expect(confirmPasswordInput).toBeInTheDocument();
  });

  it("should be able to type in the inputs fields", () => {
    const passwordInputValue = "pass@1234";
    const confirmPasswordInputValue = "pass@1234";
    render(<ResetPassword />);

    const passwordInput = screen.getByTestId(
      "password-input"
    ) as unknown as HTMLInputElement;

    const confirmPasswordInput = screen.getByTestId(
      "confirm-password-input"
    ) as unknown as HTMLInputElement;

    fireEvent.change(passwordInput, {
      target: { value: passwordInputValue }
    });

    fireEvent.change(confirmPasswordInput, {
      target: { value: confirmPasswordInputValue }
    });

    expect(passwordInput.value).toBe(passwordInputValue);
    expect(confirmPasswordInput.value).toBe(confirmPasswordInputValue);
  });

  it("should show an error message when button is clicked and the input is empty", async () => {
    render(<ResetPassword />);

    const buttonElement = screen.getByRole("button");
    fireEvent.click(buttonElement);

    const passwordErrorMsg = await screen.findByText("Password is required");
    const confirmPasswordErrorMsg = await screen.findByText(
      "Confirm password is required"
    );

    expect(passwordErrorMsg).toBeInTheDocument();
    expect(confirmPasswordErrorMsg).toBeInTheDocument();
  });
});
