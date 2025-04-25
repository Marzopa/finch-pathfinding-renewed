let list: number[] = []
let list2: number[] = []
let final: number[][] = []
let graph: Dijkstra.Graph = null
function initializeGraph () {
    list = [0, 1, 1]
    list2 = [0, 0, 0]
    final = [list, list2]
    graph = Dijkstra.gridToGraph(final)
}
