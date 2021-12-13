import { TerrainSquare } from "../TerrainSquare";
import {IXYBase} from "./IXYBase"

export interface ITerrainNode
{
    F : number; // sum of G and H, determines the cheapest path
    G : number; // movement cost from starting point to selected node
    H : number; // estimated cost to move from selected node to target node

    setF() : void;
    setG() : void;
    setH( target : TerrainSquare ) : void;
}