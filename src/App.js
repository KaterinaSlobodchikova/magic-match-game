import { useEffect, useState } from "react";
import Confetti from "react-confetti";

import "./App.css";
import SingleCard from "./components/SingleCard";
import Bomb from "./images/bomb.png";
import Diamond from "./images/diamond.png";
import Money from "./images/money.png";
import Scalp from "./images/scalp.png";
import Sword from "./images/sword.png";
import Trophy from "./images/trophy.png";

const cardImages = [
  { src: Bomb, matched: false },
  { src: Trophy, matched: false },
  { src: Diamond, matched: false },
  { src: Money, matched: false },
  { src: Scalp, matched: false },
  { src: Sword, matched: false },
];

function App() {
  const [cards, setCards] = useState([]);
  const [turns, setTurns] = useState(0);
  const [firstChoice, setFirstChoice] = useState(null);
  const [secondChoice, setSecondChoice] = useState(null);
  const [disabled, setDisabled] = useState(false);
  const [winner, setWinner] = useState(false);

  const shuffleCards = () => {
    const shuffledCards = [...cardImages, ...cardImages]
      .sort(() => Math.random() - 0.5)
      .map((card) => ({ ...card, id: Math.random() }));

    setFirstChoice(null);
    setSecondChoice(null);
    setCards(shuffledCards);
    setTurns(0);
    setWinner(false);
  };

  const handleChoice = (card) => {
    firstChoice ? setSecondChoice(card) : setFirstChoice(card);
  };

  useEffect(() => {
    if (firstChoice && secondChoice) {
      setDisabled(true);
      if (firstChoice.src === secondChoice.src) {
        setCards((prevCards) => {
          return prevCards.map((card) => {
            if (card.src === firstChoice.src) {
              return { ...card, matched: true };
            } else {
              return card;
            }
          });
        });
        resetTurn();
      } else {
        setTimeout(() => {
          resetTurn();
        }, 1000);
      }
    }
  }, [firstChoice, secondChoice]);

  const resetTurn = () => {
    setFirstChoice(null);
    setSecondChoice(null);
    setTurns((prevTurn) => prevTurn + 1);
    setDisabled(false);
  };

  useEffect(() => {
    shuffleCards();
  }, []);

  const matchedCards = cards.filter((card) => card.matched === true);

  const checkCompletion = () => {
    if (matchedCards.length > 0 && matchedCards.length === cards.length) {
      setWinner(true);
    }
  };

  useEffect(() => {
    checkCompletion();
  }, [matchedCards]);

  return (
    <div className="App">
      <h1>Magic Match</h1>
      <button onClick={shuffleCards}>New Game</button>
      <div className="card-grid">
        {cards.map((card) => (
          <SingleCard
            key={card.id}
            card={card}
            handleChoice={handleChoice}
            flipped={
              card === firstChoice || card === secondChoice || card.matched
            }
            disabled={disabled}
          />
        ))}
      </div>
      <p>Turns: {turns}</p>
      {winner && <Confetti width={1920} height={1080} />}
    </div>
  );
}

export default App;
