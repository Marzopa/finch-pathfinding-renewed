function initializeGraph () {
    row1 = [
    1,
    9,
    1,
    1,
    1,
    1,
    1
    ]
    row2 = [
    1,
    9,
    1,
    9,
    1,
    1,
    1
    ]
    row3 = [
    1,
    9,
    1,
    9,
    9,
    9,
    1
    ]
    row4 = [
    1,
    1,
    1,
    9,
    2,
    1,
    2
    ]
    row5 = [
    5,
    7,
    6,
    8,
    3,
    7,
    4
    ]
    final = [
    row1,
    row2,
    row3,
    row4,
    row5
    ]
    graph = Dijkstra.gridToGraph(final)
}
let graph: Dijkstra.Graph = null
let final: number[][] = []
let row5: number[] = []
let row4: number[] = []
let row3: number[] = []
let row2: number[] = []
let row1: number[] = []
initializeGraph()
