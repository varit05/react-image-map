import React from "react";
import ReactDOM from "react-dom";
import { MapView } from "./MapView";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<MapView></MapView>, div);
});
