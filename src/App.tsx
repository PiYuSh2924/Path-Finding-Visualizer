import React from "react";
import { PathFindingProvider } from "./context/PathFindingContext";
import { TileProvider } from "./context/TileContext";
import { SpeedProvider } from "./context/SpeedContext";

const App = () => {
  return (
    <PathFindingProvider>
      <TileProvider>
        <SpeedProvider>  
          <h1 className="text-3xl font-bold underline h-screen w-screen bg-blue-500">
            Hello World!
          </h1>
        </SpeedProvider>
      </TileProvider>
    </PathFindingProvider>
  );
};

export default App;
