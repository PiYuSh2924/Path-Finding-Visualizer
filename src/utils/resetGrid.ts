import { END_TILE_CONFIG, MAX_COLS, MAX_ROWS, START_TILE_CONFIG, TILE_STYLE } from "./constants";
import { isEqual } from "./helpers";
import { GridType, TileType } from "./types";

export const resetGrid = ({
    grid,
    startTile = START_TILE_CONFIG,
    endTile = END_TILE_CONFIG
} : {
    grid : GridType;
    startTile ?: TileType;
    endTile ?: TileType;
}) => {
    const newGrid = grid.map(row => 
        row.map(tile => {
            if (isEqual(tile, startTile) || isEqual(tile, endTile)) {
                return tile;
            }
            
            return {
                ...tile,
                distance: Infinity,
                isTraversed: false,
                isPath: false,
                parent: null,
                isWall: false
            };
        })
    );

    return newGrid;
};    