import React from "react";
import { Usage } from "./Usage";
import { data } from "../images-data";
export const MapView = ({ zoom }) => {
  // return <Usage width={200} height={300} />;

  const imagesToLoad = data.filter(imagePath => {
    console.log(imagePath);
    return imagePath.zoom === zoom;
  });

  return (
    <section>
      <h3> map view </h3>
      {imagesToLoad
        ? imagesToLoad[0].image.map(image => {
            return <img src={require(`${image}`)} alt="product" />;
          })
        : ""}
    </section>
  );
};
