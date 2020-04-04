import React from "react";
import { PinchZoomPan } from "./PinchZoomPan";

export const Usage = ({ width, height }) => (
  <div>
    <PinchZoomPan width={width} height={height}>
      {(x, y, scale) => (
        <img
          src={`https://placekitten.com/${width}/${height}`}
          alt=""
          style={{
            pointerEvents: scale === 1 ? "auto" : "none",
            transform: `translate3d(${x}px, ${y}px, 0) scale(${scale})`,
            transformOrigin: "0 0"
          }}
        />
      )}
    </PinchZoomPan>
  </div>
);

export default Usage;
