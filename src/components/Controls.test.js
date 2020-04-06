import React from "react";
import { Controls } from "./Controls";
import { render } from "@testing-library/react";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  render(<Controls></Controls>, div);
});
describe("The default UI for ZoomIn", () => {
  it("should renders the Controls", () => {
    const { getByTestId } = render(<Controls zoom="1" />);
    expect(getByTestId("zoomIn")).toBeInTheDocument();
  });

  it("should contain svg element", () => {
    const { getByTestId } = render(<Controls zoom="1" />);
    expect(getByTestId("zoomIn")).toContainHTML("svg");
  });
});

describe("The default UI for zoomOut", () => {
  it("should renders the Controls", () => {
    const { getByTestId } = render(<Controls zoom="1" />);
    expect(getByTestId("zoomOut")).toBeInTheDocument();
  });

  it("should contain svg element", () => {
    const { getByTestId } = render(<Controls zoom="1" />);
    expect(getByTestId("zoomOut")).toContainHTML("svg");
  });
});
