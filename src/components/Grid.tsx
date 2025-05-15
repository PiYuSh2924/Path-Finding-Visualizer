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
      <div className="flex-1 flex items-center justify-center">
        <div className="grid-container">
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
      </div>
    );
}

export default Grid