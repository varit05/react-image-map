import React, { useState } from "react";
import "./App.css";
import { MapView } from "./components/MapView";

function App() {
  let [zoom] = useState(1);

  return (
    <div className="App">
      <MapView zoom={zoom}></MapView>
    </div>
  );
}

export default App;
