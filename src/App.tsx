import React from 'react';
import { useState } from 'react'
import { Repeat } from 'typescript-tuple'
import logo from './logo.svg';
import './App.css';

// Square state type
type SquareState = {
  value: string
  class: string[]
}

// Square props type
type SquareProps = {
  state: SquareState
  onClick: () => void
}

// Square component
const Square = (props: SquareProps) => (
  <button className={`square ${props.state.class.filter(v => v).join(' ')}`} onClick={props.onClick}>
    {props.state.value}
  </button>
)

// Board props type
type BoardProps = {
  squares: SquareState[][]
  onClick: (i: number,j: number) => void
}

// Board component
const Board = (props: BoardProps) => {
  const renderSquare = (i: number,j: number) => (
    <Square state={props.squares[i][j]} onClick={() => props.onClick(i,j)} key={i.toString()+'-'+j.toString()}/>
  )

  return (
    <div className='grid'>
    {props.squares.map((row, i) => (
      <div className='board-row' key={i.toString()}>
      {row.map((column, j) => (
        renderSquare(i,j)
      ))}
      </div>
    ))}
    </div>
  )
}

// OperationButton props type
type OperationButtonProps = {
  value: string
  onClick: () => void
}

// OperationButton component
const OperationButton = (props: OperationButtonProps) => (
  <button className='square' onClick={props.onClick} >
    {props.value}
  </button>
)

// OperationBoard props type
type OperationBoardProps = {
  buttons: string[][]
  onClick: (i: string) => void
}

// OperationBoard component
const OperationBoard = (props: OperationBoardProps) => {
  const renderButton = (i: number,j: number) => (
    <OperationButton value={props.buttons[i][j]} onClick={() => props.onClick(props.buttons[i][j])} key={i.toString()+'-'+j.toString()}/>
  )

  return (
    <div>
    {props.buttons.map((row, i) => (
      <div className='board-row' key={i.toString()}>
      {row.map((column, j) => (
        renderButton(i,j)
      ))}
      </div>
    ))}
    </div>
  )
}

// Game state type
type GameState = {
  squares: SquareState[][]
  isFinished: boolean
  activeSquare: number[]
}

// Game component
const Game = (props: { logic : GameLogicInterface }) => {
  const [state, setState] = useState<GameState>(props.logic.state)
  
  // display status message 
  status = props.logic.message
  
  // game board click event 
  const handleClickBoard = (i: number, j:number) => {
 
    if (!props.logic.clickBoard(i, j)) return

    setState(({ squares, isFinished, activeSquare}) => {
      return {
        squares: state.squares,
        isFinished: state.isFinished,
        activeSquare: state.activeSquare
      }
    })
  }
  
  // Operation buttons click event
  const handleClickOperationBoard = (str: string) => {

    if (!props.logic.clickOperationBoard(str)) return
 
    setState(({ squares, isFinished, activeSquare}) => {
      return {
        squares: state.squares,
        isFinished: state.isFinished,
        activeSquare: state.activeSquare
      }
    })
  }
  
  return (
    <div className='game'>
      <div className='game-info'>
        <div className='game-status'>
          <div>{status}</div>
        </div>
      </div>
      <div className='game-board'>
        <Board squares={state.squares} onClick={handleClickBoard} />
      </div>
      <div className='game-operation-bord'>
        <OperationBoard buttons={props.logic.operations} onClick={handleClickOperationBoard} />
      </div>
    </div>
  )
}

// game logic interface
interface GameLogicInterface {
  state : GameState
  // operation buttons
  operations : string[][]
  // status message
  message : string
  // Change active position
  clickBoard(i: number, j:number) : boolean
  // Click on the operation button
  clickOperationBoard(operation: string) : boolean
}

// nerdle game logic
class Nerdle implements GameLogicInterface {
  operations = [['Enter','Delete']]
  state = {
    squares: [
      [{value: '', class: [''],}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}], 
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
    ],
    isFinished: false,
    activeSquare: [0,0]
  } as GameState
  
  message = ''
  
  // click on the grit square
  clickBoard(i: number, j:number) : boolean {
    return true
  }
  
  // click on the operation button
  clickOperationBoard(operation: string) : boolean {
    return true
  }
}

// Application start point
const App = () => {
  var logic = new Nerdle;
  return (
    <Game logic={logic}/>
  )
}

function log(v : any) {
    //console.log(v);
}


export default App;
