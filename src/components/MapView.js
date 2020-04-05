import React from "react";
import { data } from "../images-data";
import { Controls } from "./Controls";
import styled, { css } from "styled-components";

import { ReactPanZoom } from "./react-pan-zoom-rotate";

const Container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  & img {
    width: 100%;
  }
`;

const Img = styled.img`
  width: ${props =>
    props.zoom === 4
      ? `50%`
      : props.zoom === 3
      ? `75%`
      : props.zoom === 2
      ? `100%`
      : `12.5%`};
  height: 50%;
  max-width: 256px;
  max-height: 256px;
  margin-bottom: -3px;
`;
const StyledReactPanZoom = styled(ReactPanZoom)`
  ${Container};
`;
export const MapView = ({ zoom }) => {
  const [dx, setDx] = React.useState(0);
  const [dy, setDy] = React.useState(0);
  const [rotation] = React.useState(0);

  const imagesToLoad = data.filter(imagePath => {
    return imagePath.zoom === zoom;
  });

  console.log("MapView -> imagesToLoad", imagesToLoad);
  const imageDetails = imagesToLoad.length ? imagesToLoad[0].image : "";

  const onPan = (dx, dy) => {
    setDx(dx);
    setDy(dy);
  };

  return (
    <>
      <Controls zoom={zoom}></Controls>
      <div className="image-map">
        <StyledReactPanZoom
          zoom={zoom}
          pandx={dx}
          pandy={dy}
          onPan={onPan}
          rotation={rotation}
          key={dx}
          enablePan={true}
        >
          {imageDetails.map(image => (
            <div>
              {" "}
              {image.length
                ? image.map((img, index) => (
                    <Img
                      zoom={zoom}
                      src={require(`${img}`)}
                      alt="product"
                      key={index}
                    />
                  ))
                : ""}{" "}
            </div>
          ))}
        </StyledReactPanZoom>
      </div>
    </>
  );
};
