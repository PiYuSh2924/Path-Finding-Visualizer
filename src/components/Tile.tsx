import React from 'react'
import { END_TILE_STYLE, MAX_ROWS, PATH_TILE_STYLE, START_TILE_STYLE, TILE_STYLE, TRAVERSED_TILE_STYLE, WALL_TILE_STYLE } from '../utils/constants';
import { twMerge } from 'tailwind-merge';

interface MouseFunction {
    (row: number, col: number) : void;
}

const Tile = ({
    row, 
    col,
    isStart,
    isEnd,
    isTraversed,
    isWall,
    isPath,
    onMouseDown,
    onMouseUp,
    onMouseEnter
} : {
    row : number,
    col : number,
    isStart : boolean,
    isEnd : boolean,
    isTraversed : boolean,
    isWall : boolean,
    isPath : boolean,
    onMouseDown : MouseFunction,
    onMouseUp : MouseFunction,
    onMouseEnter : MouseFunction
}) => {
    let tileTypeStyle: string;

    if(isStart) {
        tileTypeStyle = START_TILE_STYLE
    } else if(isEnd) {
        tileTypeStyle = END_TILE_STYLE
    } else if(isWall) {
        tileTypeStyle = WALL_TILE_STYLE
    } else if(isPath) {
        tileTypeStyle = PATH_TILE_STYLE
    } else if(isTraversed) {
        tileTypeStyle = TRAVERSED_TILE_STYLE
    } else {
        tileTypeStyle = TILE_STYLE
    }

    const borderStyle = row === MAX_ROWS - 1 ? 'border-b' : col === 0 ? 'border-l' : ''
    const edgeStyle = row === MAX_ROWS - 1 && col === 0  ? 'border-l' : ''

  return (
    <div 
        className={twMerge(tileTypeStyle, borderStyle, edgeStyle)} 
        id={`${row}-${col}`} 
        onMouseDown={() => onMouseDown(row, col)}
        onMouseUp={() => onMouseUp(row, col)}
        onMouseEnter={() => onMouseEnter(row, col)}
    />
  )
}

export default Tile