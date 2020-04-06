import React from "react";
import ReactDOM from "react-dom";
import { PanZoom } from "./PanZoom";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<PanZoom></PanZoom>, div);
});
