import { render, screen } from "@testing-library/react";
import Languages from "./components/pages/languages";

test("renders the learning hub entry points", async () => {
  window.localStorage.clear();

  render(<Languages />);

  expect(await screen.findByRole("button", { name: /Open Darija Studio/i })).toBeInTheDocument();
  expect(await screen.findByRole("button", { name: /Enter Tifinagh Lab/i })).toBeInTheDocument();
});
