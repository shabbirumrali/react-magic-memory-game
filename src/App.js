import { useEffect, useState } from 'react'
import './App.css'
import SingleCard from './components/SingleCard' 

const cardImages = [
  {"img": '/img/helmet-1.png', matched: false},
  {"img": '/img/potion-1.png', matched: false},
  {"img": '/img/ring-1.png', matched: false},
  {"img": '/img/scroll-1.png', matched: false},
  {"img": '/img/shield-1.png', matched: false},
  {"img": '/img/sword-1.png', matched: false},
]
function App() {
  const [cards, setCards] = useState([])
  const [turning, setTurning] = useState(0)
  const [choiceOne, setChoiceOne] = useState(null)
  const [choiceTwo, setChoiceTwo] = useState(null)
  const [disabled, setDisabled] = useState(false)
  
  const suffleCards = () => {
    const suffeldCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }))
      setChoiceOne(null)
      setChoiceTwo(null)
      setCards(suffeldCards)
      setTurning(0)
  }

  // handle a choice 
  const handleChoice = (card) => {
    choiceOne ? setChoiceTwo(card) : setChoiceOne(card)
  }

  useEffect(() => {
    if(choiceOne && choiceTwo) {
      setDisabled(true)
      if(choiceOne.img === choiceTwo.img) {
        setCards(prevCards => {
          return prevCards.map(card => {
            if(card.img === choiceOne.img) {
              return {...card, matched: true}
            }else {
              return card
            }
          })
        })
        resetTurn()
      } else {
        setTimeout(() => resetTurn(), 1000)
      }
    }
  }, [choiceOne, choiceTwo])

  const resetTurn = () => {
    setChoiceOne(null)
    setChoiceTwo(null)
    setTurning(prevValue => prevValue + 1)
    setDisabled(false)
  }

  useEffect(() => {
    suffleCards()
  }, [])

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={suffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map( card => (
          <SingleCard 
            handleChoice={handleChoice} 
            card={card} 
            key={card.id}
            flipped = {card === choiceOne || card === choiceTwo || card.matched}
            disabled = {disabled}
          />
        ))}
      </div>
      <div className="score">Tracks: {turning}</div>
    </div>
  );
}

export default App