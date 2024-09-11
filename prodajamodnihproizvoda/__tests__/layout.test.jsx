import React from "react";
import { render } from "@testing-library/react";
import '@testing-library/jest-dom'; // Add this import
import Layout from "@/components/Layout";

// Mocking the external modules
jest.mock("react-redux", () => ({
  Provider: ({ children }) => <div>{children}</div>,
}));

jest.mock("redux-persist/integration/react", () => ({
  PersistGate: ({ children }) => <div>{children}</div>,
}));

jest.mock("next-auth/react", () => ({
  SessionProvider: ({ children }) => <div>{children}</div>,
}));

jest.mock("../src/redux/store", () => ({
  store: {},
  persistor: {},
}));

describe("Layout Component", () => {
  it("renders children within Provider, PersistGate, and SessionProvider", () => {
    const { getByText } = render(
      <Layout>
        <div>Test Content</div>
      </Layout>
    );

    // Check that the child content is rendered
    expect(getByText("Test Content")).toBeInTheDocument();
  });
});
