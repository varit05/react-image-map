import React, { useEffect, useState } from "react";
import { data } from "../images-data";
import styled, { css } from "styled-components";
import { Controls } from "./Controls.js";
import { PanZoom } from "./PanZoom";

const Container = css`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
  overflow: scroll;
`;

const Img = styled.img`
  width: ${props =>
    props.zoom === 4
      ? `12.50%`
      : props.zoom === 3
      ? `50%`
      : props.zoom === 2
      ? `75%`
      : `100%`};
  height: 50%;
  max-width: ${props => (props.zoom === 1 ? `256px` : `128px`)};
  max-height: ${props => (props.zoom === 1 ? `256px` : `128px`)};
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
      <Controls zoomIn={zoomIn} zoomOut={zoomOut}></Controls>
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
