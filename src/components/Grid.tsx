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
        <div className="grid grid-cols-[repeat(49,17px)] grid-rows-[repeat(39,17px)] gap-0">
          {grid.map((row, rowIndex) => (
            <React.Fragment key={rowIndex}>
              {row.map((tile, tileIndex) => {
                const {isEnd, isStart, isPath, isTraversed, isWall} = tile;
                return (
                  <Tile 
                    key={`${rowIndex}-${tileIndex}`}
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
            </React.Fragment>
          ))}
        </div>
      </div>
    );
}

export default Grid