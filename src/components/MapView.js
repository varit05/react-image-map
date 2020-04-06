import React, { useEffect, useState } from "react";
import { data } from "../images-data";
import styled, { css } from "styled-components";

import { PanZoom } from "./PanZoom";

const ControlsContainer = styled.div`
  position: absolute;
  left: 10px;
  z-index: 2;
  bottom: 10px;
  user-select: none;
  border-radius: 2px;
  background: #fff;
  box-shadow: 0px 2px 6px rgba(53, 67, 93, 0.32);
  & div {
    text-align: center;
    cursor: pointer;
    height: 40px;
    width: 40px;
    border-bottom: 1px solid #ccc;
    & svg {
      height: 100%;
      width: 100%;
      padding: 10px;
      box-sizing: border-box;
    }
    &:last-child {
      border: none;
    }
    &:active {
      box-shadow: 0px 0px 5px 1px #0c0c0c;
    }
  }
`;

const Container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const Img = styled.img`
  width: ${props =>
    props.zoom === 4
      ? `12.50%`
      : props.zoom === 3
      ? `75%`
      : props.zoom === 2
      ? `100%`
      : `100%`};
  height: 50%;
  max-width: 256px;
  max-height: 256px;
  margin-bottom: -3px;
`;

const StyledPanZoom = styled(PanZoom)`
  ${Container};
`;

export const MapView = ({ zoom }) => {
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

  useEffect(() => {
    let images = data.filter(imagePath => {
      return imagePath.zoom === mapZoomState;
    });
    setImagesToLoad(images);

    setImageDetails(images.length ? images[0].image : "");
  }, [mapZoomState, imageDetails]);

  const zoomIn = () => {
    if (mapZoomState < 4) {
      setMapZoomState(mapZoomState + 1);
    } else {
      setMapZoomState(mapZoomState);
    }
  };

  const zoomOut = () => {
    if (mapZoomState > 1) {
      setMapZoomState(mapZoomState - 1);
    } else {
      setMapZoomState(mapZoomState);
    }
  };

  const onPan = (dx, dy) => {
    setDx(dx);
    setDy(dy);
  };

  return (
    <>
      <ControlsContainer>
        <div onClick={zoomIn}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M12 4L12 20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
        <div onClick={zoomOut}>
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M4 12H20"
              stroke="#4C68C1"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
        </div>
      </ControlsContainer>
      <StyledPanZoom
        className="image-map"
        zoom={mapZoomState}
        pandx={dx}
        pandy={dy}
        onPan={onPan}
        key={dx}
        enablePan={true}
      >
        {imageDetails
          ? imageDetails.map((image, index) => (
              <div key={index}>
                {image.length
                  ? image.map((img, i) => (
                      <Img
                        zoom={mapZoomState}
                        src={require(`${img}`)}
                        altText={img}
                        key={Math.random()}
                      />
                    ))
                  : ""}
              </div>
            ))
          : ""}
      </StyledPanZoom>
    </>
  );
};
