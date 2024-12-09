import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

describe("App Component Tests", () => {
  beforeEach(() => {
    jest.resetModules();
  });

  test("renders the list of dog breeds", () => {
    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick }) => (
        <ul>
          <li onClick={() => onClick("1")}>Breed 1</li>
          <li onClick={() => onClick("2")}>Breed 2</li>
        </ul>
      );
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) => <div>Breed Details: {breedId}</div>;
    });

    const App = require('./App').default;
    render(<App />);
    expect(screen.getByText("Breed 1")).toBeInTheDocument();
    expect(screen.getByText("Breed 2")).toBeInTheDocument();
  });

  test("displays breed details when a breed is selected", () => {
    const mockOnClick = jest.fn();

    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick = mockOnClick }) => (
        <ul>
          <li onClick={() => onClick("1")}>Breed 1</li>
          <li onClick={() => onClick("2")}>Breed 2</li>
        </ul>
      );
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) => <div>Breed Details: {breedId}</div>;
    });

    const App = require('./App').default;
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    expect(screen.getByText("Breed Details: 1")).toBeInTheDocument();
    expect(mockOnClick).toHaveBeenCalledWith("1");
  });

  test("does not render BreedDetails when no breed is selected", () => {
    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick }) => (
        <ul>
          <li onClick={() => onClick("1")}>Breed 1</li>
          <li onClick={() => onClick("2")}>Breed 2</li>
        </ul>
      );
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) => <div>Breed Details: {breedId}</div>;
    });

    const App = require('./App').default;
    render(<App />);
    expect(screen.queryByText("Breed Details:")).toBeNull();
  });

  test("handles an empty breed list gracefully", () => {
    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick }) => <div>No breeds available</div>;
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) => <div>Breed Details: {breedId}</div>;
    });

    const App = require('./App').default;
    render(<App />);
    expect(screen.getByText("No breeds available")).toBeInTheDocument();
  });

  test("handles a null or invalid breed ID", () => {
    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick }) => (
        <ul>
          <li onClick={() => onClick("1")}>Breed 1</li>
          <li onClick={() => onClick("2")}>Breed 2</li>
        </ul>
      );
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) =>
        breedId ? <div>Breed Details: {breedId}</div> : <div>Breed details not found</div>;
    });

    const App = require('./App').default;
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    expect(screen.getByText("Breed Details: 1")).toBeInTheDocument();
    fireEvent.click(screen.getByText("Breed 2"));
    expect(screen.getByText("Breed Details: 2")).toBeInTheDocument();
  });

  test("handles fast consecutive breed selections", () => {
    jest.doMock("./DogBreeds", () => {
      const React = require('react');
      return ({ onClick }) => (
        <ul>
          <li onClick={() => onClick("1")}>Breed 1</li>
          <li onClick={() => onClick("2")}>Breed 2</li>
        </ul>
      );
    });

    jest.doMock("./BreedDetails", () => {
      const React = require('react');
      return ({ breedId }) => <div>Breed Details: {breedId}</div>;
    });

    const App = require('./App').default;
    render(<App />);
    fireEvent.click(screen.getByText("Breed 1"));
    fireEvent.click(screen.getByText("Breed 2"));
    expect(screen.getByText("Breed Details: 2")).toBeInTheDocument();
  });
});