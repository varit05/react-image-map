import React from "react";
import { data } from "../images-data";
import { Controls } from "./Controls";
import styled from "styled-components";

const Img = styled.img`
  width: ${(props) =>
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
  console.log("MapView -> zoom", zoom);
  const [mapZoomState, setMapZoomState] = React.useState(zoom);
  const [imagesToLoad, setImagesToLoad] = React.useState(data.filter((imagePath) => {
    return imagePath.zoom === zoom;
  }));
  const [imageDetails, setImageDetails] = React.useState(imagesToLoad.length ? imagesToLoad[0].image : "");
  // let imagesToLoad = data.filter((imagePath) => {
  //   return imagePath.zoom === zoom;
  // });

  // console.log("MapView -> imagesToLoad", imagesToLoad);
  
  // const imageDetails = imagesToLoad.length ? imagesToLoad[0].image : "";
  //let imageDetails = React.useRef(imagesToLoad.length ? imagesToLoad[0].image : "");

  const onZoomChangeHandler = (zoomValue) => {
    console.log("onZoomChangeHandler zoomValue", zoomValue.toFixed(1));
    setMapZoomState(zoomValue.toFixed(1));
    let comp = zoomValue.toFixed(1);
    console.log("onZoomChangeHandler -> comp", comp)
    
    console.log("onZoomChangeHandler -> mapZoomState", mapZoomState);
    console.log("onZoomChangeHandler -> data", data);
    
    

  };

  React.useEffect(() => {
    console.log("in use Effect", mapZoomState);
    console.log("useEffect -> data", data);
    let images = data.filter((imagePath) => {
    
      return imagePath.zoom == mapZoomState;
    });
    console.log("MapView -> images", images);
    setImagesToLoad(images);
    console.log("useEffect -> imagesToLoad", imagesToLoad);
    
    setImageDetails(images.length ? images[0].image : "");
    console.log('useEffect imageDetails', imageDetails);
  }, [mapZoomState]);

  return (
    <>
      <Controls
        zoom={mapZoomState}
        onZoomChange={onZoomChangeHandler}
      ></Controls>
      <div className="image-map">
        {imageDetails.map((image) => (
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
        ))}
      </div>
    </>
  );
};
