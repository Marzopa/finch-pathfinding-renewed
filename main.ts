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
    path = Dijkstra.dijkstra(graph, "0,0", "4,5")
    // path = Dijkstra.dijkstra(graph, position, Dijkstra.createPosition(4, 5))
    basic.showIcon(IconNames.EighthNote)
    finch.startFinch()
    for (let step of path) {
        if (Dijkstra.getIdRow(step) > Dijkstra.getPositionRow(position)) {
            if (orientation == 1) {
                basic.showLeds(`
                    . . # . .
                    . # # . .
                    # # # # #
                    . # # . .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Right, 90, 75)
            } else if (orientation == 3) {
                basic.showLeds(`
                    . . # . .
                    . . # # .
                    # # # # #
                    . . # # .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Left, 90, 75)
            } else if (orientation == 0) {
                basic.showIcon(IconNames.No)
                finch.setTurn(RLDir.Left, 90, 75)
                finch.setTurn(RLDir.Left, 90, 75)
            } else {
            	
            }
            orientation = 2
        } else if (Dijkstra.getIdRow(step) < Dijkstra.getPositionRow(position)) {
            if (orientation == 3) {
                basic.showLeds(`
                    . . # . .
                    . # # . .
                    # # # # #
                    . # # . .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Right, 90, 75)
            } else if (orientation == 1) {
                basic.showLeds(`
                    . . # . .
                    . . # # .
                    # # # # #
                    . . # # .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Left, 90, 75)
            } else if (orientation == 2) {
                basic.showIcon(IconNames.No)
                finch.setTurn(RLDir.Left, 90, 75)
                finch.setTurn(RLDir.Left, 90, 75)
            } else {
            	
            }
            orientation = 0
        } else if (Dijkstra.getIdColumn(step) > Dijkstra.getPositionColumn(position)) {
            if (orientation == 0) {
                basic.showLeds(`
                    . . # . .
                    . # # . .
                    # # # # #
                    . # # . .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Right, 90, 75)
            } else if (orientation == 2) {
                basic.showLeds(`
                    . . # . .
                    . . # # .
                    # # # # #
                    . . # # .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Left, 90, 75)
            } else if (orientation == 3) {
                basic.showIcon(IconNames.No)
                finch.setTurn(RLDir.Left, 90, 75)
                finch.setTurn(RLDir.Left, 90, 75)
            } else {
            	
            }
            orientation = 1
        } else if (Dijkstra.getIdColumn(step) < Dijkstra.getPositionColumn(position)) {
            if (orientation == 2) {
                basic.showLeds(`
                    . . # . .
                    . # # . .
                    # # # # #
                    . # # . .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Right, 90, 75)
            } else if (orientation == 0) {
                basic.showLeds(`
                    . . # . .
                    . . # # .
                    # # # # #
                    . . # # .
                    . . # . .
                    `)
                finch.setTurn(RLDir.Left, 90, 75)
            } else if (orientation == 3) {
                basic.showIcon(IconNames.No)
                finch.setTurn(RLDir.Left, 90, 75)
                finch.setTurn(RLDir.Left, 90, 75)
            } else {
            	
            }
            orientation = 3
        } else {
            basic.showIcon(IconNames.SmallDiamond)
        }
        basic.showLeds(`
            . . # . .
            . . # . .
            # # # # #
            . # # # .
            . . # . .
            `)
        finch.setMove(MoveDir.Forward, 25, 75)
        position = Dijkstra.positionFromKey(step)
    }
    basic.showIcon(IconNames.Yes)
}
let path: string[] = []
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
