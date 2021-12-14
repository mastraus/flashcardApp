import { createDeck } from "../utils/api/index"; 
import React, { useState } from "react";
import { Link, useHistory } from "react-router-dom";

function DeckForm({ deck, setDeck }) {
    const [formDeck, setFormDeck] = useState({ ...deck });

    const history = useHistory()

    const onSubmit = (event) => { 
        event.preventDefault(); 
        function handleSubmit(deck) {
            createDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))}
        if (!deck) {
            handleSubmit(formDeck);
        } else {
            handleSubmit(deck);
        }
    };

    function handleChange(event) {
            setFormDeck({ ...formDeck, [event.target.id]: event.target.value });
    }

    return (
        <div>
                <form onSubmit={onSubmit}>
                    <div className="form-group">
                        <label htmlFor="name">Name</label>
                        <input
                            type="text"
                            className="form-control"
                            id="name"
                            placeholder="Deck Name"
                            value={formDeck.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="description">Description</label>
                        <textarea
                            type="text"
                            className="form-control"
                            id="description"
                            placeholder="Brief description of the deck"
                            value={formDeck.description}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="create-deck-btns">
                        <Link to="/">
                            <button className="btn btn-secondary">Cancel</button>
                        </Link>
                        <button type="submit" className="btn btn-primary">
                            Submit
                        </button>
                    </div>
                </form>
            )
        </div>
    );
}

export default DeckForm;