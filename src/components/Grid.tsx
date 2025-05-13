import React, { RefObject, useState } from 'react'
import { usePathFinding } from '../hooks/usePathFinding';
import { twMerge } from 'tailwind-merge';
import { MAX_ROWS, MAX_COLS } from '../utils/constants';
import Tile from './Tile';
import { checkIfStartOrEnd, createNewGrid } from '../utils/helpers';

const Grid = ({isVisualizationRunningRef} : {isVisualizationRunningRef : RefObject<boolean>}) => {
    const { grid, setGrid } = usePathFinding();
    const [isMouseDown, setIsMouseDown] = useState(false);

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
          //Base classes
          "flex items-center flex-col justify-center border-sky-300 mt-10",
          //Control Grid Height
          `lg:min-h-[${MAX_ROWS * 17}px] md:min-h-[${
            MAX_ROWS * 15
          }px] xs:min-h-[${MAX_ROWS * 8}px] min-h-[${MAX_ROWS * 7}px]`,
          //Controlling Grid Width
          `lg:w-[${MAX_COLS * 17}px] md:w-[${MAX_COLS * 15}px] xs:w-[${
            MAX_COLS * 8
          }px] w-[${MAX_COLS * 7}px]`
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