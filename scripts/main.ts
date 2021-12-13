import { TerrainSquare } from "./TerrainSquare";
import { AStar } from "./AStar";

// let t : TerrainSquare = new TerrainSquare( true, { x: 0, y: 0 }, 16, "plain" );
// document.write(JSON.stringify(t, null, 5));

let terrain : TerrainSquare[][] = [];

for( let y = 0; y < 10; y++ )
{
    // console.log( "y: " + y );
    terrain[y] = [];
    for( let x = 0; x < 10; x++ )
    {
        // console.log( "x: " + x );
        terrain[y][x] = new TerrainSquare( true, { y: y, x: x }, 10, "plain" );
    }
}


terrain[1][1].walkable = false;
terrain[1][1].terrainName = "wall";

terrain[1][2].walkable = false;
terrain[1][2].terrainName = "wall";

terrain[1][3].walkable = false;
terrain[1][3].terrainName = "wall";

// console.table(terrain[0]);
// console.table(terrain[1]);
// console.table(terrain[2]);
console.table( terrain );

// console.log( AStar.getSurrounding( terrain, { y: 2, x: 1 } ) );
console.log( AStar.findPath( terrain, terrain[0][0], terrain[9][9] ) );
