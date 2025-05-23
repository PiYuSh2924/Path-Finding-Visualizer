import React, { useRef } from "react";
import { PathFindingProvider } from "./context/PathFindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";
import Grid from "./components/Grid";
import Nav from "./components/Nav";

const App = () => {
  const isVisualizationRunningRef = useRef(false);

  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>  
          <div className="h-screen w-screen flex flex-col">
            <Nav isVisualizationRunningRef = {isVisualizationRunningRef}/>
            <Grid isVisualizationRunningRef = {isVisualizationRunningRef}/>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider>
  );
};

export default App;
