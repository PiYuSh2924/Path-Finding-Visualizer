import { getUntraversedNeighbours } from "../../../utils/getUntraversedNeighbours";
import { dropFromQueue, isEqual } from "../../../utils/helpers";
import { GridType, TileType } from "../../../utils/types";

export const dijkstra = (
  grid: GridType,
  startTile: TileType,
  endTile: TileType
) => {
  const traversedTiles: TileType[] = []; // Initialize an array to store traversed tiles
  const base = grid[startTile.row][startTile.col]; // Get the start tile from the grid
  base.distance = 0; // Set the distance of the start tile to 0
  base.isTraversed = true; // Mark the start tile as traversed
  const untraversedTiles = [base]; // Initialize the queue with the start tile

  while (untraversedTiles.length > 0) {
    // Continue while there are untraversed tiles
    untraversedTiles.sort((a, b) => a.distance - b.distance); // Sort the queue by distance
    const currentTile = untraversedTiles.shift(); // Get the tile with the smallest distance
    if (currentTile) {
      // If the current tile is valid
      if (currentTile.isWall) continue; // Skip if the tile is a wall
      if (currentTile.distance === Infinity) break; // Break if the tile's distance is infinity
      currentTile.isTraversed = true; // Mark the tile as traversed
      traversedTiles.push(currentTile); // Add the tile to the traversed tiles array
      if (isEqual(currentTile, endTile)) break; // Break if the tile is the end tile
      const neighbours = getUntraversedNeighbours(grid, currentTile); // Get untraversed neighbours of the tile
      for (let i = 0; i < neighbours.length; i += 1) {
        // Iterate through each neighbor
        if (currentTile.distance + 1 < neighbours[i].distance) {
          // Check if a shorter path is found
          dropFromQueue(neighbours[i], untraversedTiles); // Remove the neighbor from the queue
          neighbours[i].distance = currentTile.distance + 1; // Update the neighbor's distance
          neighbours[i].parent = currentTile; // Set the neighbor's parent to the current tile
          untraversedTiles.push(neighbours[i]); // Add the neighbor to the queue
        }
      }
    }
  }

  const path: TileType[] = []; // Initialize an array to store the path
  let current = grid[endTile.row][endTile.col]; // Start from the end tile
  while (current !== null) {
    // Backtrack until the start tile
    current.isPath = true; // Mark the tile as part of the path
    path.unshift(current); // Add the tile to the path
    current = current.parent!; // Move to the parent tile
  }
  return { traversedTiles, path }; // Return the traversed tiles and the path
};