import React from "react";
import { Img } from "./Img";
import { render } from "@testing-library/react";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  render(<Img></Img>, div);
});

it("should renders the Image", () => {
  const { getByAltText } = render(<Img image="url.png" altText="alt text" />);
  expect(getByAltText(/alt text/)).toBeInTheDocument();
});
