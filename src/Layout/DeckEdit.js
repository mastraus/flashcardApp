//allows user to modify info on existing deck
//use the readDeck() func from utils/api to load existing deck
//breadcrumb nav with link to home, name of deck being edited, finally text 'Edit Deck'
//displays same form as Create Deck screen but it is pre-filled with info for existing deck
//user can edit and update the form
//if user clicks 'Cancel', taken to the Deck screen

import React, {useEffect, useState} from "react";
import { Link, useHistory, useParams } from "react-router-dom";
import { readDeck, updateDeck } from "../utils/api";
import DeckForm from "./DeckForm";

function DeckEdit() {
    const history = useHistory();
    const {deckId} = useParams();
    const [deck, setDeck] = useState({});

    useEffect(() => {
        readDeck(deckId).then(setDeck)
    }, [deckId, setDeck]);

    function submitHandler(deck) {
        updateDeck(deck).then((savedDeck) => history.push(`/decks/${savedDeck.id}`))
    }

    function cancel() {
        history.goBack();
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
                <li className="breadcrumb-item">
                    <Link to={`/decks/${deck.id}`}>{deck.name}</Link>
                </li>
                <li className="breadcrumb-item active" aria-current="page">
                    Update Deck
                </li>
                </ol>
            </nav>
            <h1>Update Deck</h1>
            {deck.id && <DeckForm onCancel={cancel} onSubmit={submitHandler} deck={deck} />}
        </div>
    )
}
export default DeckEdit;