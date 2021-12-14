import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { listDecks } from "../utils/api/";

const DeckList = () => {
  const [decks, setDecks] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    async function getDecks() {
      try {
        const myDecks = await listDecks();
        setDecks(myDecks);
      } catch (error) {
        if (error.name === "AbortError") return;
        else {
          throw error;
        }
      }
    }
    getDecks();
    return () => abortController.abort();
  }, []);
  const deckList = decks.map((deck, index) => (
    <p>
      {" "}
      <li className="card" key={deck.id}>
        <div className="card-body">
          <h4 className="card-title">
            {deck.name}
            <div className="float-right small">{deck.cards.length} cards</div>
          </h4>
          <div>{deck.description}</div>
          {/* Bring to Deck screen */}
          <Link to={`/decks/${deck.id}`}>
            <button
              href="#"
              type="button"
              className="btn btn-secondary mr-2 btn-md"
            >
              <span className="oi oi-eye mr-1"></span>
              View
            </button>
          </Link>
          {/* Bring to Study screen */}
          <Link to={`/decks/${deck.id}/study`}>
            <button type="button" className="btn btn-primary btn-md">
              <span className="oi oi-book mr-1"></span>
              Study
            </button>
          </Link>
          {/* make warning message with OK or cancel */}
          <button type="button" className="btn btn-danger float-right">
            <span className="oi oi-trash"></span>
          </button>
        </div>
      </li>
    </p>
  ));

  return (
    <div>
      <div>
        <Link to="/decks/new">
          <button className="btn btn-secondary">+ Create New</button>
        </Link>
      </div>
      <p></p>
      {deckList}
    </div>
  );
};

export default DeckList;
