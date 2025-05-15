import React, { RefObject, useState } from 'react'
import { usePathFinding } from '../hooks/usePathFinding';
import { twMerge } from 'tailwind-merge';
import { MAX_ROWS, MAX_COLS } from '../utils/constants';
import Tile from './Tile';
import { checkIfStartOrEnd, createNewGrid } from '../utils/helpers';

const Grid = ({isVisualizationRunningRef} : {isVisualizationRunningRef : RefObject<boolean>}) => {
    const { grid, setGrid } = usePathFinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

    const calculateGridDimensions = () => {
      const baseSize = 17;
      const mdSize = 15;
      const xsSize = 8;
      const minSize = 7;
  
      const gridHeight = `lg:min-h-[${MAX_ROWS * baseSize}px] md:min-h-[${MAX_ROWS * mdSize}px] xs:min-h-[${MAX_ROWS * xsSize}px] min-h-[${MAX_ROWS * minSize}px]`;
      const gridWidth = `w-[${MAX_COLS * baseSize}px] md:w-[${MAX_COLS * mdSize}px] xs:w-[${MAX_COLS * xsSize}px] min-w-[${MAX_COLS * minSize}px]`;
  
      return `${gridHeight} ${gridWidth}`;
    };

    const handleMouseEvent = (event : 'down' | 'up' | 'enter', row : number , col : number) : void => {
      if(isVisualizationRunningRef.current || checkIfStartOrEnd(row, col)) {
        return;
      }

      switch(event) {
        case 'down' :
          setIsMouseDown(true);
          const newGrid = createNewGrid(grid, row, col);
          setGrid(newGrid);
          break;
        case 'up' :
          setIsMouseDown(false);
          break;
        case 'enter' :
          if(isMouseDown) {
            const newGrid = createNewGrid(grid, row, col);
            setGrid(newGrid)
          }
          break;
      }

    }

    return (
      <div
      className={twMerge(
        "flex items-center flex-col justify-center border-sky-300 mt-10",
        calculateGridDimensions()
      )}
    >
          {grid.map((row, rowIndex) => (
              <div key={rowIndex} className="flex">
                  {row.map((tile, tileIndex) => {
                      const {isEnd, isStart, isPath, isTraversed, isWall} = tile;
                      return (
                        <Tile 
                            key={tileIndex}
                            row={tile.row}
                            col={tile.col}
                            isEnd={isEnd}
                            isStart={isStart}
                            isPath={isPath}
                            isTraversed={isTraversed}
                            isWall={isWall}
                            onMouseDown={() => handleMouseEvent('down', tile.row, tile.col)}
                            onMouseUp={() => handleMouseEvent('up', tile.row, tile.col)}
                            onMouseEnter={() => handleMouseEvent('enter', tile.row, tile.col)}
                        />
                      )
                    })}
              </div>
          ))}
      </div>
    );
}

export default Grid