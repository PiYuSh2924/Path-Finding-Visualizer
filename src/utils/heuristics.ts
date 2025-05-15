import { MAX_COLS, MAX_ROWS } from "./constants";
import { GridType, TileType } from "./types";

const retrieveHeuristicCost = (currentTile: TileType, endTile: TileType) => {
  const manhattanDistance = 1; // Define the constant multiplier for Manhattan distance
  const r = Math.abs(currentTile.row - endTile.row); // Calculate the absolute difference in rows between the current tile and the end tile
  const c = Math.abs(currentTile.col - endTile.col); // Calculate the absolute difference in columns between the current tile and the end tile
  return manhattanDistance * (r + c); // Return the Manhattan distance (sum of row and column differences)
};

export const initHeuristicCost = (grid: GridType, endTile: TileType): number[][] => {
    const heuristicCost: number[][] = [];
    for (let i = 0; i < MAX_ROWS; i++) {
      const row: number[] = [];
      for (let j = 0; j < MAX_COLS; j++) {
        const tile = grid[i]?.[j];
        row.push(tile ? retrieveHeuristicCost(tile, endTile) : Infinity);
      }
      heuristicCost.push(row);
    }
    return heuristicCost;
  };
  
  export const initFunctionCost = (): number[][] => {
    const functionCost: number[][] = [];
    for (let i = 0; i < MAX_ROWS; i++) {
      const row: number[] = new Array(MAX_COLS).fill(Infinity);
      functionCost.push(row);
    }
    return functionCost;
  };
  