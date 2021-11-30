import React, { useEffect, useState, } from "react";
import { useHistory, useParams } from "react-router-dom"
import { readDeck } from "../utils/api";
import StudyPage from "./StudyPage";
import NotEnough from "./NotEnough";
import StudyCard from "./StudyCard"

export default function Study() {
  const [deck, setDeck] = useState({cards: []});
  const { deckId } = useParams();
  const [cardNumber, setCardNumber] = useState(1);

  const history = useHistory();

  useEffect(() => {
    readDeck(deckId).then(setDeck);
  }, [deckId]);
  const cardCount = deck.cards.length;
  const nextCardHandler = () => {
    if (cardNumber === cardCount) {
      const returnToHomePage = !window.confirm(
        "Restart cards? \n\nClick: 'cancel' to return to home page"
      );
      return returnToHomePage ? history.push("/") : setCardNumber(1);
    }
    setCardNumber((previousState) => Math.min(cardCount, previousState + 1));
  };

  const cardTitle = `Card ${cardNumber} of ${cardCount}`;
  const card = deck.cards[cardNumber - 1];
  if (cardCount <= 2) {
    return (
      <StudyPage name={deck.name} deckId={deckId}>
        <NotEnough deckId={deckId} cardCount={cardCount} />
      </StudyPage>
    );
  }

  // function loadDeck() {
  //     readDeck(deckId).then(setDeck)
  //     .then(setCurrentCard(deck.cards[0]));
  // }

  // function changeCard() {
  //     setCurrentCard(deck.cards.filter(card => card.id === currentCard.id + 1))
  // }

  return (
    <StudyPage name={deck.name} deckId={deckId}>
      <StudyCard card={card} title={cardTitle}>
        <button type="button" className="btn btn-primary" onClick={nextCardHandler}>
          Next
        </button>
      </StudyCard>
    </StudyPage>
  );
}
