function initializeGraph () {
    list = [0, 1, 1]
    list2 = [0, 0, 0]
    final = [list, list2]
    graph = Dijkstra.gridToGraph(final)
    basic.showLeds(`
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        . . . . .
        `)
}
let graph: Dijkstra.Graph = null
let final: number[][] = []
let list2: number[] = []
let list: number[] = []
initializeGraph()
