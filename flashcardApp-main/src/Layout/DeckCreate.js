import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createDeck } from "../utils/api/index";
import DeckForm from "./DeckForm";

function DeckCreate() {
    const history = useHistory();

    function handleSubmit(deck) {
        createDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }

    return (
        <div>
            <nav aria-label="breadcrumb">
                <ol className="breadcrumb">
                <li className="breadcrumb-item">
                    <Link to="/">
                    <span className="oi oi-home" /> Home
                    </Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Create Deck
                </li>
                </ol>
            </nav>
            <h2>Create Deck</h2>
            <DeckForm handleSubmit={handleSubmit} deck={{name: "", description: ""}} />
        </div>
    )
}
export default DeckCreate;