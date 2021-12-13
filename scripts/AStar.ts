import { TerrainSquare } from "./TerrainSquare"
import { IXYBase } from "./interfaces/IXYBase";
import { IPath } from "./interfaces/IPath";

export abstract class AStar
{
    public static findPath( terrain : TerrainSquare[][], start : TerrainSquare, end : TerrainSquare ) : IPath
    {
        var open : TerrainSquare[] = [];
        var closed : TerrainSquare[] = [];

        // add the starting square to the 'open' array
        open.push( start );

        
        
        while( true )
        {
            if( closed.includes( end ) )
            {
                console.log("found the end");
                break;
            }
            else if( open.length < 1 )
            {
                console.log( "no path found from %s to %s", JSON.stringify(start.squarePos), JSON.stringify(end.squarePos) );
                return;
            }

            open.sort(AStar.compareF);
            let current : TerrainSquare = open.shift()
            closed.push( current );

            let adjacent : TerrainSquare[] = AStar.getSurrounding(terrain, current.squarePos);

            adjacent.map( ( square : TerrainSquare ) => {
                if( closed.includes( square ) || !square.walkable )
                    return;
                
                console.log( square );
                let index : number = open.findIndex( (el) => el == square )
                if( index < 0 ) // not found in open
                {
                    open.push( square );
                    square.setParentNode( current );
                    square.setG();
                    square.setH( end );
                    square.setF();
                }
                else // is the index thing necessary?
                {
                    // console.log( "index:", index );
                    // console.log( closed );
                    if( open[index].G > current.G + open[index].getMoveCostTo( current ) )
                    {
                        open[index].setParentNode( current );
                        open[index].setG();
                        open[index].setF();
                        open.sort( AStar.compareF ); // ?
                    }
                }
            } );

        }
        // console.log( open );
        return AStar.getPath( start, end );
    }

    // arr[y][x] <-- note
    public static getSurrounding( terrain : TerrainSquare[][], squarePos : IXYBase )
    {
        let x0 : number = squarePos.x > 0 ? squarePos.x - 1 : 0;
        let y0 : number = squarePos.y > 0 ? squarePos.y - 1 : 0;
        let xOmega : number = squarePos.x >= terrain[ squarePos.y ].length - 1 ? terrain[ squarePos.y ].length - 1 : squarePos.x + 1;
        let yOmega : number = squarePos.y >= terrain.length - 1 ? terrain.length - 1 : squarePos.y + 1;
        let arr : TerrainSquare[] = [];

        // console.log( x0, y0 );
        // console.log( xOmega, yOmega );

        for( let i = y0; i <= yOmega; i++ ) // y
        {
            for( let j = x0; j <= xOmega; j++ ) // x
            {
                if( !(i == squarePos.y && j == squarePos.x) )
                    arr.push( terrain[i][j] );
            }
        }

        return arr;
    }


    public static compareF( a : TerrainSquare, b : TerrainSquare ) : number
    {
        if( a.F < b.F )
            return -1;
        else if( a.F > b.F )
            return 1;
        return 0;
    }

    private static getPath( start : TerrainSquare, end : TerrainSquare ) : IPath
    {
        let currentSquare : TerrainSquare = end;
        let pathArr : IXYBase[] = [];
        let cost : number = 0;
        while( currentSquare.squarePos != start.squarePos )
        {
            pathArr.unshift( currentSquare.squarePos );
            let prev : TerrainSquare = currentSquare;
            currentSquare = currentSquare.getParentNode();
            cost += currentSquare.getMoveCostTo( prev );
        }
        pathArr.unshift( currentSquare.squarePos ); // takes care of the last square - start square

        // console.log( path );
        let path  : IPath = {
            path: pathArr,
            overallCost: cost
        };
        return path;
    }
}