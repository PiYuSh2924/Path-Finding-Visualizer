import React from "react";
import { PathFindingProvider } from "./context/PathFindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";4
import Grid from "./components/Grid";

const App = () => {
  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>  
          <div className="h-screen w-screen flex flex-col">
            <Grid/>
          </div>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider>
  );
};

export default App;
