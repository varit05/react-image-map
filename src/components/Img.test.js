import React from "react";
import ReactDOM from "react-dom";
import { Img } from "./Img";

it("should renders without crashing the app", () => {
  const div = document.createElement("div");
  ReactDOM.render(<Img></Img>, div);
});
