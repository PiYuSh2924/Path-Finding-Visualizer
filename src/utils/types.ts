export type AlgorithmType =  "DIJKSTRA" | "A_STAR" | "BFS" | "DFS";

export interface AlgorithmSelectType {
    name : string;
    value : AlgorithmType;
}

export type MazeType = "NONE" | "BINARY_TREE" | "RECURSIVE_DIVISION";

export interface MazeSelectType {
    name: string;
    value: MazeType;
}

export interface SpeedSelectType {
    name : string;
    value : SpeedType;
}

export type TileType = {
    row : number;
    col : number;
    isStart : boolean;
    isEnd : boolean;
    isTraversed : boolean;
    isWall : boolean;
    isPath : boolean;
    distance : number;
    parent : TileType | null;
}

export type GridType = TileType[][];

export type SpeedType = 2 | 1 | 0.5;
