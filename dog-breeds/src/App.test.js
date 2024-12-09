import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

jest.mock("./DogBreeds", () => ({ onClick }) => (
  <ul>
    <li onClick={() => onClick("1")}>Breed 1</li>
    <li onClick={() => onClick("2")}>Breed 2</li>
  </ul>
));
jest.mock("./BreedDetails", () => ({ breedId }) => <div>Breed Details: {breedId}</div>);

describe("App Component Tests", () => {
  test("renders the list of dog breeds", () => {
    render(<App />);
    expect(screen.getByText("Breed 1")).toBeInTheDocument();
    expect(screen.getByText("Breed 2")).toBeInTheDocument();
  });

  test("displays breed details when a breed is selected", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    expect(screen.getByText("Breed Details: 1")).toBeInTheDocument();
  });

  test("does not render BreedDetails when no breed is selected", () => {
    render(<App />);
    expect(screen.queryByText("Breed Details:")).toBeNull();
  });

  test("handles an empty breed list gracefully", () => {
    jest.mock("./DogBreeds", () => ({ onClick }) => <div>No breeds available</div>);
    render(<App />);
    expect(screen.getByText("No breeds available")).toBeInTheDocument();
  });

  test("handles a null or invalid breed ID", () => {
    jest.mock("./BreedDetails", () => ({ breedId }) =>
      breedId ? <div>Breed Details: {breedId}</div> : <div>Breed details not found</div>
    );
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    expect(screen.getByText("Breed Details: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Breed 2"));
    expect(screen.getByText("Breed Details: 2")).toBeInTheDocument();
  });

  test("handles fast consecutive breed selections", () => {
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    fireEvent.click(screen.getByText("Breed 2"));
    expect(screen.getByText("Breed Details: 2")).toBeInTheDocument();
  });
});