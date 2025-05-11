import { useContext } from "react"
import { PathFindingContext } from "../context/PathFindingContext"

export const usePathFinding = () => {
    const context = useContext(PathFindingContext)

    if(!context){
        throw new Error("usePathFinding must be withing a PathFindingProvider")
    }

    return context;
}