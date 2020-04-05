import React from "react";
import { data } from "../images-data";

import styles from './../App.css';
import styled from 'styled-components'

const Img = styled.img`
  width: ${props => props.zoom === 4 ? `50%` : props.zoom === 3 ? `75%` : props.zoom === 2 ? `100%`: `125%` };
  height: 50%;
  max-width: 256px;
  max-height: 256px;
  `


export const MapView = ({ zoom }) => {
  // return <Usage width={200} height={300} />;
  console.log("MapView -> zoom", zoom);
  console.log("MapView -> data", data);
  const imagesToLoad = data.filter(imagePath => {
    return imagePath.zoom === zoom;
  });
  
  
  console.log("MapView -> imagesToLoad", imagesToLoad);

  
  

  return (
    <section className="image-map">
      {imagesToLoad.length
        ? imagesToLoad[0].image.map((image, index) => (
            // <img className={styles.img} src={require(`${image}`)} alt="product" />
            <Img zoom={zoom} src={require(`${image}`)} alt="product" key={index} />
          ))
        : ""}
    </section>
  );
};
