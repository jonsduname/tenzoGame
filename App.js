import logo from './logo.svg';
import './App.css';
import Die from './Die';
import React from 'react';
import { nanoid } from 'nanoid'

export default function App() {
  const [diceNumbers, setDiceNumbers] = React.useState(allNewDice())
  const [tenzies, setTenzies] = React.useState(false)

   
  React.useEffect(() => {
    const allHeld = diceNumbers.every(die => die.isHeld)
    const firstValue = diceNumbers[0].value
    const allSameValue = diceNumbers.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
}, [diceNumbers])


  function allNewDice(){
      let newDiceArray = []
      for (let i = 0; i < 10; i++){
          newDiceArray.push(generate())
      }
      return newDiceArray
 
  }

  function generate(){
    return {
      value: Math.ceil(Math.random() * 6), isHeld: false, id: nanoid()
    }
  }
  
  function rollDice(){
    if(!tenzies){
      setDiceNumbers(oldDice => oldDice.map(die => {
        return die.isHeld ? die : generate()
      }))
    } else {
      setTenzies(false)
      setDiceNumbers(allNewDice())
    }
    }
    
  
  function holdDice(id){
    setDiceNumbers(oldDice => oldDice.map(die => {
      return die.id === id ? 
          {...die, isHeld: !die.isHeld} : die
    }))
    
  }
  
  const diceMapped = diceNumbers.map(num => <Die key={num.id} value={num.value} isHeld={num.isHeld} holdDice={() => holdDice(num.id)}/>)
  
      return (
        
          <main>
            <h1 className="title">Tenzies</h1>
            {tenzies ? <h1>You Win!</h1> : "" }
            <p className="instructions">Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
              <div className="dice-container">
                  {diceMapped}
              </div>
              <button className="rollBtn"onClick={rollDice}>{tenzies ? "New Game" : "Roll"}</button>
                  
          </main>
      )
  }