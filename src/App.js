import React, { useState } from "react";
import "./App.css";
import { MapView } from "./components/MapView";

function App() {
  let [zoom, handleClick] = useState(4);

  // function handleClick(count) {
  //   zoom += count;
  //   if (zoom < 0) {
  //     zoom = 1;
  //   }
  // }

  return (
    <div className="App">
      {/* <header className="App-header">
        <h1>Image Map</h1>
      </header> */}
      <button onClick={() => handleClick(zoom + 1)}>+</button>
      <button onClick={() => handleClick(zoom - 1)}>-</button>
      <MapView zoom={zoom}></MapView>
    </div>
  );
}

export default App;
