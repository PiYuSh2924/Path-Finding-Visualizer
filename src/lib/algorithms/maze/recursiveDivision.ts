import { GridType, SpeedType, TileType } from "../../../utils/types"
import { horizontalDivision } from "./horizontalDivision";
import { verticalDivision } from "./verticalDivision";

export const recursiveDivision = async({
    grid,
    startTile,
    endTile,
    row,
    col,
    height,
    width,
    setIsDisabled,
    speed
} : {
    grid : GridType;
    startTile : TileType;
    endTile : TileType;
    row : number;
    col : number;
    height : number;
    width : number;
    setIsDisabled : (isDisabled : boolean) => void;
    speed : SpeedType;
}) => {
    //base case
    if(height <= 1 || width <= 1){
        return; 
    } 
    if(height > width){
        await horizontalDivision({
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed 
        });
    } else {
        await verticalDivision({
            grid,
            startTile,
            endTile,
            row,
            col,
            height,
            width,
            setIsDisabled,
            speed
        })
    }
}