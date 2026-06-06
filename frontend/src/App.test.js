import { render, screen } from "@testing-library/react";
import Languages from "./components/pages/languages";

test("renders the learning hub entry points", async () => {
  window.localStorage.clear();

  render(<Languages />);

  expect(await screen.findByText(/Immersion Darija/i)).toBeInTheDocument();
  expect(await screen.findByText(/Tifinagh/i)).toBeInTheDocument();
});
