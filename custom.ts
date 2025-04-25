
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

    // 
    //
    // PATHFINDING PART
    //
    //

    // A simple result type for Dijkstra
    export interface DijkstraResult {
        path: Position[]
        cost: number
    }

    // Helper: turn a Position into its string key
    function keyFromPosition(pos: Position): string {
        return `${pos.row},${pos.col}`
    }

    // Helper: parse a string key back into a Position
    function positionFromKey(str: string): Position {
        const parts = str.split(",")
        return {
            row: parseInt(parts[0], 10),
            col: parseInt(parts[1], 10)
        }
    }


    //% block
    export function dijkstra(
        graph: Graph,
        start: Position,
        end: Position
    ): DijkstraResult {
        const startKey = keyFromPosition(start)
        const endKey = keyFromPosition(end)

        // 1) Initialize distances to Infinity
        let distances: { [k: string]: number } = {}
        let nodeKeys = Object.keys(graph)
        for (let i = 0; i < nodeKeys.length; i++) {
            distances[nodeKeys[i]] = Infinity
        }
        distances[startKey] = 0

        // 2) Track the best previous hop
        let previous: { [k: string]: string } = {}

        // 3) Our "priority queue" as a simple array
        let queue: { nodeKey: string; cost: number }[] = []
        queue.push({ nodeKey: startKey, cost: 0 })

        // 4) Main loop
        while (queue.length > 0) {
            // pick the lowest-cost entry
            queue.sort((a, b) => a.cost - b.cost)
            let entry = queue.shift()
            if (!entry) break

            let curKey = entry.nodeKey
            let curCost = entry.cost

            // stop if we reached the end
            if (curKey == endKey) break

            // skip stale entries
            if (curCost > distances[curKey]) continue

            // relax each neighbor
            let edges = graph[curKey]
            for (let j = 0; j < edges.length; j++) {
                let edge = edges[j]
                let neighborK = keyFromPosition(edge.to)
                let newCost = curCost + edge.cost

                if (newCost < distances[neighborK]) {
                    distances[neighborK] = newCost
                    previous[neighborK] = curKey
                    queue.push({ nodeKey: neighborK, cost: newCost })
                }
            }
        }

        // 5) Reconstruct path
        let path: Position[] = []
        let trace = endKey
        while (trace != startKey) {
            path.push(positionFromKey(trace))
            trace = previous[trace]
        }
        path.push(start)
        path.reverse()

        return { path: path, cost: distances[endKey] }
    }
}