import React from "react";
import { Switch, Route } from "react-router-dom";
import Header from "./Header";
import Home from "./Home"
import Study from "./Study"
import DeckCard from "./DeckCard";
import DeckCreate from "./DeckCreate";
import DeckEdit from "./DeckEdit";
import CardEdit from "./CardEdit"
import CardCreate from "./CardCreate"
import NotFound from "./NotFound";

function Layout() {
  return (
    <div>
      <Header />
      <div className="container">
        <Switch>
          <Route path="/decks/new">
            <DeckCreate />
          </Route>
          <Route path="/decks/:deckId/study">
            <Study />
          </Route>
          <Route path="/decks/:deckId/edit">
            <DeckEdit />
          </Route>
          <Route path="/decks/:deckId/cards/new">
            <CardCreate />
          </Route>
          <Route path="/decks/:deckId/cards/:cardId/edit">
            <CardEdit />
          </Route>
          <Route path="/decks/:deckId">
            <DeckCard />
          </Route>
          <Route exact path="/">
            <Home />
          </Route>
          <Route>
            <NotFound />
          </Route>
        </Switch>
      </div>
    </div>
  );
}

export default Layout;