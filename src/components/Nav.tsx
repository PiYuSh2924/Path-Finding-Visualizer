import React, { useEffect, useState } from "react";
import Select from "./Select";
import PlayButton from "./PlayButton"
import { MAZES, PATHFINDING_ALGORITHMS } from "../utils/constants";
import { usePathFinding } from "../hooks/usePathFinding";
import { useTile } from "../hooks/useTile";
import { useSpeed } from "../hooks/useSpeed";
import { AlgorithmType, MazeType } from "../utils/types";
import { resetGrid } from "../utils/resetGrid";
import { runMazeAlgorithm } from "../utils/runMazeAlgorithm";
import { runPathFindingAlgorithm } from "../utils/runPathFindingAlgorithm";

const Nav = () => {
  const [isDisabled, setIsDisabled] = useState(false);
  const {
    maze,
    setMaze,
    grid,
    setGrid,
    isGraphVisualized,
    setIsGraphVisualized,
    algorithm,
    setAlgorithm,
  } = usePathFinding();
  const { startTile, endTile } = useTile();
  const { speed } = useSpeed();

  const handleReset = () => {
    const newGrid = resetGrid({ grid, startTile, endTile });
    setGrid(newGrid);
  };

  useEffect(() => {
    if (maze === "NONE") {
      handleReset();
    }
  }, [maze]);

  const handleMazeGenaration = (maze: MazeType) => {
    setMaze(maze);
    if (maze != "NONE") {
      setIsDisabled(true);
      runMazeAlgorithm({
        maze,
        grid,
        startTile,
        endTile,
        setIsDisabled,
        speed,
      });
      const newGrid = grid.slice();
      setGrid(newGrid);
      setIsGraphVisualized(false);
    }
  };

  const handlerRunVisualizer = () => {
    if(isGraphVisualized){
      setIsGraphVisualized(false);
      resetGrid({grid : grid.slice(), startTile, endTile})
      return;
    }

    const {traversedTiles, path} = runPathFindingAlgorithm({
      algorithm,
      grid,
      startTile,
      endTile
    })

    console.log("traversed tiles", traversedTiles);
    console.log("path", path);
    
  }

  return (
    <div className="flex items-center justify-center min-h-[4.5rem] border-b shadow-gray-600 sm:px-5 px-0">
      <div className="flex items-center lg:justify-between justify-center w-full sm:w-[52rem]">
        <h1 className="lg:flex hidden w-[40%] text-2xl pl-1">
          PathFinding Visualizer
        </h1>
        <div className="flex sm:items-end items-center justify-start sm:justify-between sm:flex-row flex-col sm:space-y-0 space-y-3 sm:py-0 py-4 sm:space-x-4">
          <Select
            label="Maze"
            value={maze}
            options={MAZES}
            onChange={(e) => {
              handleMazeGenaration(e.target.value as MazeType);
            }}
          />
          <Select
            label="Graph"
            value={algorithm}
            options={PATHFINDING_ALGORITHMS}
            onChange={(e) => {
              setAlgorithm(e.target.value as AlgorithmType);
            }}
          />
          <PlayButton 
            isDisabled={isDisabled}
            isGraphVisualized={isGraphVisualized}
            handlerRunVisualizer={handlerRunVisualizer}
          />
        </div>
      </div>
    </div>
  );
};

export default Nav;
