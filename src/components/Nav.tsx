import React, { useState } from "react";
import Select from "./Select";
import { MAZES } from "../utils/constants";
import { usePathFinding } from "../hooks/usePathFinding";
import { useTile } from "../hooks/useTile"
import { useSpeed } from "../hooks/useSpeed"
import { MazeType } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";

const Nav = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const { maze, setMaze, grid, setGrid } = usePathFinding();
  const { startTile, endTile } = useTile();
  const { speed } = useSpeed();

  const handleReset = () => {
    const newGrid = resetGrid({ grid, startTile, endTile });
    setGrid(newGrid); 
};

  const handleMazeGenaration = (maze : MazeType) => {
    if(maze === 'NONE'){
      setMaze(maze);
      handleReset();
      return;
    }

    setMaze(maze);
    setIsDisabled(true);
    runMazeAlgorithm({
      maze, 
      grid, 
      startTile, 
      endTile, 
      setIsDisabled, 
      speed
    })
  }

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          PathFinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:px-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => {
              handleMazeGenaration(e.target.value as MazeType);
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
