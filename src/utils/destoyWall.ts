// src/utils/destroyWall.ts
import { GridType, SpeedType } from "./types";
import { SPEEDS, TILE_STYLE } from "./constants";
import { sleep } from "./helpers";

const getDelay = (speed: SpeedType) => {
    return 20 * SPEEDS.find((s) => s.value === speed)!.value - 5;
};

const updateTile = (grid: GridType, row: number, col: number) => {
    grid[row][col].isWall = false;
    document.getElementById(`${row}-${col}`)!.className = TILE_STYLE;
};

export const destroyWall = async (
    grid: GridType,
    row: number,
    col: number,
    isRight: number,
    speed: SpeedType
) => {
    const delay = getDelay(speed);
    
    if (isRight && grid[row][col + 1]) {
        updateTile(grid, row, col + 1);
    } else if (grid[row + 1]) {
        updateTile(grid, row + 1, col);
    } else {
        updateTile(grid, row, col);
    }
    
    await sleep(delay);
};