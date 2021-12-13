import { ITerrainNode } from "./interfaces/ITerrainNode";
import {IXYBase} from "./interfaces/IXYBase"

export class TerrainSquare implements ITerrainNode
{
    public walkable : boolean;
    public movementCost : number;
    public diagonalMovementCost : number;
    public terrainName? : string;
    public moveShift : IXYBase;

    public squarePos : IXYBase; // this node position

    public F : number; // sum of G and H, determines the cheapest path
    public G : number; // movement cost from starting point to selected node
    public H : number; // estimated cost to move from selected node to target node

    private parentNode : TerrainSquare;


    constructor( w : boolean, pos : IXYBase, cost : number = 10, name? : string )
    {
        this.walkable = w;
        this.movementCost = cost;
        this.diagonalMovementCost = Math.round( this.movementCost * 1.4 );
        this.squarePos = {...pos};
        if( name )
            this.terrainName = name;
    }

    public setParentNode( parent : TerrainSquare ) : void
    {
        this.parentNode = parent;
        this.moveShift = TerrainSquare.getMoveShift( this.parentNode, this );
    }
    public getParentNode() : TerrainSquare
    {
        return this.parentNode;
    }

    public static getMoveShift( start : TerrainSquare, end : TerrainSquare ) : IXYBase
    {
        let xShift : number = Math.abs( end.squarePos.x - start.squarePos.x );
        let yShift : number = Math.abs( end.squarePos.y - start.squarePos.y );
        return { y: yShift, x: xShift };
    }
    
    // returns move cost from start square to this square
    public getMoveCostTo( start : TerrainSquare ) : number
    {
        let move = TerrainSquare.getMoveShift( start, this );
        if( move.x == 0 || move.y == 0 )
            return this.movementCost;
        else
            return this.diagonalMovementCost;
    }


    public setF() : void
    {
        this.F = this.G + this.H;
    }

    public setG() : void
    {
        // both s and y are zero maybe????
        this.G = this.parentNode.G + ( ( this.moveShift.x == 0 || this.moveShift.y == 0 ) ? this.movementCost : this.diagonalMovementCost );
    }

    public setH( target : TerrainSquare ) : void
    {
        let dist : number = Math.abs( target.squarePos.x - this.squarePos.x ) + Math.abs( target.squarePos.y - this.squarePos.y );
        this.H = dist * 10; // very, VERY rough estimation
    }
}