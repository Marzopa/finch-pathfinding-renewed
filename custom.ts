
/**
* Use this file to define custom functions and blocks.
* Read more at https://makecode.microbit.org/blocks/custom
*/

enum MyEnum {
    //% block="one"
    One,
    //% block="two"
    Two
}

/**
 * Custom blocks
 */
//% weight=100 color=#0fbc11 icon=""
namespace Dijkstra {
    // A grid position
    export interface Position {
        row: number
        col: number
    }

    // An edge from one node to a neighbor, with the movement cost
    export interface Edge {
        to: Position
        cost: number
    }

    // The graph: map each nodeKey "row,col" to its list of outgoing edges
    export type Graph = { [nodeKey: string]: Edge[] }

    /**
     * Converts a 2D numeric grid into a graph adjacency list.
     * - 9 means barrier (no node here)
     * - any other number is the cost to move into that cell
     */
    //% block
    export function gridToGraph(grid: number[][]): Graph {
        const numRows = grid.length
        const numCols = grid[0].length
        const graph: Graph = {}

        // helper: list of the 4 cardinal moves
        const directions: Position[] = [
            { row: -1, col: 0 }, // up
            { row: 1, col: 0 }, // down
            { row: 0, col: -1 }, // left
            { row: 0, col: 1 }, // right
        ]

        for (let row = 0; row < numRows; row++) {
            for (let col = 0; col < numCols; col++) {
                if (grid[row][col] === 9) continue

                // key for this node
                const nodeKey = `${row},${col}`
                graph[nodeKey] = []

                // check each possible neighbor
                for (const dir of directions) {
                    const newRow = row + dir.row
                    const newCol = col + dir.col

                    // skip things outside grid
                    if (newRow < 0 || newRow >= numRows || newCol < 0 || newCol >= numCols) {
                        continue
                    }

                    // skip if neighbor is a barrier
                    const neighborValue = grid[newRow][newCol]
                    if (neighborValue === 9) continue

                    // record edge
                    graph[nodeKey].push({
                        to: { row: newRow, col: newCol },
                        cost: neighborValue
                    })
                }
            }
        }

        return graph
    }

}
