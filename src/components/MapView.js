import React from "react";
import { data } from "../images-data";
import { Controls } from "./Controls";
import styled from "styled-components";

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

export const MapView = ({ zoom }) => {
  const imagesToLoad = data.filter(imagePath => {
    return imagePath.zoom === zoom;
  });

  console.log("MapView -> imagesToLoad", imagesToLoad);
  const imageDetails = imagesToLoad.length ? imagesToLoad[0].image : "";

  return (
    <>
      <Controls></Controls>
      <div className="image-map">
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
      </div>
    </>
  );
};
