import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders currency ticker app", () => {
  render(<App />);

  const linkElement = screen.getByText(/Currency Ticker/i);
  expect(linkElement).toBeInTheDocument();
});
