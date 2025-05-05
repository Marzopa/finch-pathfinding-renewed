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
function moveFinch () {
    orientation = 0
    position = Dijkstra.createPosition(0, 0)
    basic.showIcon(IconNames.House)
    path = Dijkstra.dijkstra(graph, position, Dijkstra.createPosition(4, 5))
    basic.showIcon(IconNames.EighthNote)
    finch.startFinch()
    for (let step of path) {
        if (Dijkstra.getPositionRow(step) > Dijkstra.getPositionRow(position)) {
            while (orientation != 2) {
                finch.setTurn(RLDir.Right, 90, 100)
                orientation = (orientation + 1) % 4
            }
        } else if (Dijkstra.getPositionRow(step) < Dijkstra.getPositionRow(position)) {
            while (orientation != 0) {
                finch.setTurn(RLDir.Right, 90, 75)
                orientation = (orientation + 1) % 4
            }
        } else if (Dijkstra.getPositionColumn(step) > Dijkstra.getPositionColumn(position)) {
            while (orientation != 1) {
                finch.setTurn(RLDir.Right, 90, 75)
                orientation = (orientation + 1) % 4
            }
        } else if (Dijkstra.getPositionColumn(step) < Dijkstra.getPositionColumn(position)) {
            while (orientation != 3) {
                finch.setTurn(RLDir.Right, 90, 75)
                orientation = (orientation + 1) % 4
            }
        } else {
            basic.showIcon(IconNames.SmallDiamond)
        }
        finch.setMove(MoveDir.Forward, 15, 75)
        position = step
    }
}
let path: Dijkstra.Position[] = []
let position: Dijkstra.Position = null
let orientation = 0
let graph: Dijkstra.Graph = null
let final: number[][] = []
let row5: number[] = []
let row4: number[] = []
let row3: number[] = []
let row2: number[] = []
let row1: number[] = []
basic.showIcon(IconNames.Heart)
initializeGraph()
basic.showIcon(IconNames.Duck)
moveFinch()
