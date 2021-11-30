//for states... possibly [description, setDesc] and [name, setName]

//in return statement on bottom, input section where it has the values populated, put onChange handler to setDesc/setName as arrow func with parameter 'x'... {(x) => setName(x.target.value)}

import React from "react";
import { useParams, useHistory } from "react-router-dom";
import { updateDeck } from "../utils/api";

function DeckEditForm({ deck, setDeck }) {
  const { deckId } = useParams();
  const history = useHistory();

  const handleDeckNameChange = (event) => {
    setDeck({ ...deck, name: event.target.value });
  };

  const handleDeckDescChange = (event) => {
    setDeck({ ...deck, description: event.target.value });
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    updateDeck(deck).then(() => history.push(`/decks/${deckId}`));
  };

  function handleCancel() {
    history.goBack();
  }

  return (
    <form>
      <div className="form-group">
        <label for="deckName">Name</label>
        <input
          type="text"
          className="form-control"
          id="deckName"
          value={deck.name}
          onChange={handleDeckNameChange}
        />
      </div>
      <div className="form-group">
        <label for="deckDescription">Description</label>
        <textarea
          className="form-control"
          id="deckDescription"
          rows="3"
          value={deck.description}
          onChange={handleDeckDescChange}
        ></textarea>
      </div>
      <button
        type="button"
        className="btn btn-secondary mr-2"
        onClick={handleCancel}
      >
        Cancel
      </button>
      <button type="submit" className="btn btn-primary" onClick={handleSubmit}>
        Submit
      </button>
    </form>
  );
}

export default DeckEditForm;
