import React from "react";
import "./App.css";
import { MapView } from "./components/MapView";

function App() {
  const zoom = 2;
  return (
    <div className="App">
      <header className="App-header">
        <h1>Image Map</h1>
      </header>
      <MapView zoom={zoom}></MapView>
    </div>
  );
}

export default App;
