import React from 'react';
import { useState } from 'react'
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

//////////////////////////////////////////////////////////////////////////////
// GameLogicInterface implementation
// Replacing here changes the logic of the game
//////////////////////////////////////////////////////////////////////////////

// html class
const CLASS_ACTIVE = 'active'
// message
const MESSAGE_ERROR_NO_COMPUTE = 'That guess doesn\'t compute!'
const MESSAGE_ERROR_BLANKS     = 'That guess doesn\'t compute - Please foll in the blanks!'
const MESSAGE_YOU_WON          = 'You won!'
const MESSAGE_YOU_LOST         = 'You lost, the calculation was '

// nerdle game logic
class Nerdle implements GameLogicInterface {
  // todo forgot to color the control buttons
  operations = [['1','2','3','4','5','6','7','8','9','0'],['+','-','*','/','='],['Enter','Delete']]
  state = {
    squares: [
      [{value: '', class: [CLASS_ACTIVE],}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}], 
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
      [{value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']},{value: '', class: ['']}, {value: '', class: ['']}, {value: '', class: ['']}],
    ],
    isFinished: false,
    activeSquare: [0,0]
  } as GameState
  
  // todo Multiple result
  result = '2*3+5=11'
  // resutlts = ['2*3+5=11','3*2+5=11','5+3*2=11']
  message = ''
  
  // click on the grit square
  clickBoard(i: number, j:number) : boolean {
    if (this.state.isFinished) return false
    
    this.message = ''
    if (this.state.activeSquare[0] != i) {
      return false
    }
    let beforeActiveSquare = this.state.activeSquare
    this.state.activeSquare = [i,j]
    // change active position
    if (beforeActiveSquare[1] != j) {
      this.state.squares[beforeActiveSquare[0]][beforeActiveSquare[1]].class[0] = ''
    }
    this.state.squares[i][j].class[0] = CLASS_ACTIVE;
    return true
  }
  
  // click on the operation button
  clickOperationBoard(operation: string) : boolean {
    if (this.state.isFinished) return false
    this.message = ''
    const is_inputs = this.operations[0].includes(operation) || this.operations[1].includes(operation)
    const is_operators = this.operations[2].includes(operation)
    
    if (!is_inputs && !is_operators) return false
    
    // todo refactoring
    if (is_inputs && this.state.activeSquare[1] < this.state.squares[0].length) {
      log('comman:'+operation)
      // Change active position
      this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].value = operation
      if (this.state.activeSquare[1] < (this.state.squares[0].length - 1)) {
        this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].class[0] = ''
        this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]+1].class[0] = CLASS_ACTIVE
        this.state.activeSquare[1]++
      }
    } else if (is_operators) {
      switch (operation) {
        case 'Enter':
          log('comman:Enter')
          // Check the result
          const resultArray = this.state.squares[this.state.activeSquare[0]]
          const values = resultArray.map(square => square.value as string)
          if ( !this.inputCheck(values) ) {
            return true
          }
          this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].class[0] = ''
          this.setStyle(resultArray)

          if (values.join('') == this.result) {
            // won
            this.state.isFinished = true
            this.message = MESSAGE_YOU_WON
          } else if (this.state.activeSquare[0] < (this.state.squares.length - 1)) {
            // next row
            this.state.activeSquare[0]++
            this.state.activeSquare[1] = 0
            this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].class[0] = CLASS_ACTIVE
          } else {
            // Game over
            this.message = MESSAGE_YOU_LOST + this.result
          }
          break;
        case 'Delete':
          log('comman:Delete')
          // delete
          if (this.state.activeSquare[1] >= 1 && this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].value == '') {
            this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].class[0] = ''
            this.state.activeSquare[1]--
            this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].value = ''
            this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].class[0] = CLASS_ACTIVE
          } else {
            this.state.squares[this.state.activeSquare[0]][this.state.activeSquare[1]].value = ''
          }
          break;
      }
    }
    return true
  }

  // input check
  private inputCheck(array : string[]) : boolean {
    // empty check
    if (array.indexOf('') >= 0) {
      this.message = MESSAGE_ERROR_BLANKS
      return false
    }
    // check for calculability
    const str = array.join('')
    if (!this.checkCalculation(str)) {
      this.message = MESSAGE_ERROR_NO_COMPUTE
      return false
    }
    return true
  }
  
  // check for calculability
  private checkCalculation(equation : string) : boolean {
    const parts = equation.split('=')
    if (parts.length != 2) return false
    let leftResult = 0
    let rightResult = 0
    try {
      leftResult = Function('return ('+parts[0]+');')();
      rightResult = Function('return ('+parts[1]+');')();
    } catch (e) {
      return false
    }
    return (leftResult == rightResult)
  }
  
  // set cell background from results
  private setStyle(resultArray: SquareState[]) {
    for (var i = 0; i < resultArray.length; i++) {
      const v = resultArray[i]
      if (v.value == this.result[i]) {
        v.class = ['green']
      } else  if (this.result.indexOf(v.value) >= 0) {
        v.class = ['purple']
      } else {
        v.class = ['black']
      }
    }
  }
  
}