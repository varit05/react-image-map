import React, { useEffect, useState } from "react";
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
  console.log("MapView -> zoom", zoom);
  const [mapZoomState, setMapZoomState] = useState(zoom);
  const [imagesToLoad, setImagesToLoad] = useState(
    data.filter(imagePath => {
      return imagePath.zoom === zoom;
    })
  );
  const [imageDetails, setImageDetails] = useState(
    imagesToLoad.length ? imagesToLoad[0].image : ""
  );
  const [dx, setDx] = useState(0);
  const [dy, setDy] = useState(0);
  const [rotation] = useState(0);

  const onZoomChangeHandler = zoomValue => {
    console.log("onZoomChangeHandler zoomValue", zoomValue.toFixed(1));
    setMapZoomState(zoomValue.toFixed(1));
    let comp = zoomValue.toFixed(1);
    console.log("onZoomChangeHandler -> comp", comp);

    console.log("onZoomChangeHandler -> mapZoomState", mapZoomState);
    console.log("onZoomChangeHandler -> data", data);
  };

  useEffect(() => {
    console.log("in use Effect", mapZoomState);
    console.log("useEffect -> data", data);
    let images = data.filter(imagePath => {
      return imagePath.zoom === mapZoomState;
    });
    console.log("MapView -> images", images);
    setImagesToLoad(images);
    console.log("useEffect -> imagesToLoad", imagesToLoad);

    setImageDetails(images.length ? images[0].image : "");
    console.log("useEffect imageDetails", imageDetails);
  }, [mapZoomState]);

  const onPan = (dx, dy) => {
    setDx(dx);
    setDy(dy);
  };

  return (
    <>
      <Controls
        zoom={mapZoomState}
        onZoomChange={onZoomChangeHandler}
      ></Controls>
      <div className="image-map">
        <StyledReactPanZoom>
          zoom={zoom}
          pandx={dx}
          pandy={dy}
          onPan={onPan}
          rotation={rotation}
          key={dx}
          enablePan={true}>
          {imageDetails
            ? imageDetails.map(image => (
                <div>
                  {" "}
                  {image.length
                    ? image.map((img, index) => (
                        <Img
                          zoom={mapZoomState}
                          src={require(`${img}`)}
                          alt="product"
                          key={index}
                        />
                      ))
                    : ""}{" "}
                </div>
              ))
            : ""}
        </StyledReactPanZoom>
      </div>
    </>
  );
};
