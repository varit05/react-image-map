import React from "react";
import { data } from "../images-data";

export const MapView = ({ zoom }) => {
  // return <Usage width={200} height={300} />;
  console.log(zoom);
  const imagesToLoad = data.filter(imagePath => {
    return imagePath.zoom === zoom;
  });

  return (
    <section className="image-map">
      {imagesToLoad
        ? imagesToLoad[0].image.map(image => (
            <img className="img" src={require(`${image}`)} alt="product" />
          ))
        : ""}
    </section>
  );
};
