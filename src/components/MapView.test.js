import React from "react";
import { MapView } from "./MapView";
import { render, fireEvent } from "@testing-library/react";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  render(<MapView></MapView>, div);
});

describe("Event Listeners", () => {
  it("should call ZoomIn click event", async () => {
    const { getByTestId } = render(<MapView zoom="2" />);
    const called = await fireEvent.click(getByTestId("zoomIn"));
    expect(called).toBe(true);
  });

  it("should call ZoomOut click event", async () => {
    const { getByTestId } = render(<MapView zoom="2" />);
    const called = await fireEvent.click(getByTestId("zoomOut"));
    expect(called).toBe(true);
  });
});
