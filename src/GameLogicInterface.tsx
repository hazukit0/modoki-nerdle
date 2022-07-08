// export interface and types

// Square state type
export type SquareState = {
  value: string
  class: string[]
}

// Game state type
export type GameState = {
  squares: SquareState[][]
  isFinished: boolean
  activeSquare: number[]
}

// game logic interface
export interface GameLogicInterface {
  state : GameState
  // operation buttons
  operations : SquareState[][]
  // status message
  message : string
  // Init
  initialize() : boolean
  // Change active position
  clickBoard(i: number, j:number) : boolean
  // Click on the operation button
  clickOperationBoard(operation: string) : boolean
}
