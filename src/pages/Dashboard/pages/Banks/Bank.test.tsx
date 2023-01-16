import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Banks from "./index";

const MockBanks = () => {
  return (
    <BrowserRouter>
      <Banks />
    </BrowserRouter>
  );
};

describe("the Bank component", () => {
  it("should render the Bank component correctly", () => {
    render(<MockBanks />);

    const headingElement = screen.getByTestId("banks");
    const downloadButton = screen.getByTestId("download-button");
    const createNewBankButton = screen.getByTestId(/new bank/i);
    const inputElement = screen.getByPlaceholderText(/search/i);

    expect(headingElement).toBeInTheDocument();
    expect(inputElement).toBeInTheDocument();
    expect(createNewBankButton).toBeInTheDocument();
    expect(downloadButton).toBeInTheDocument();
  });
});
