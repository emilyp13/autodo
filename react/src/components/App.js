import React, { Component } from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import {throttle} from './utils';
import Board from './Board'

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      lists: [],
      cards: []
    };

    this.handleListSubmit = this.handleListSubmit.bind(this)
    this.populateLists = this.populateLists.bind(this)
    this.getLists = this.getLists.bind(this)
    this.handleListDelete = this.handleListDelete.bind(this)

    this.handleCardSubmit = this.handleCardSubmit.bind(this)
    this.populateCards = this.populateCards.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)

    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
    this.persistCardDrag = this.persistCardDrag.bind(this);
  }

  handleCardSubmit(card) {
    $.ajax({
      url: "/api/cards",
      dataType: 'application/json',
      type: 'POST',
      data: card,
      success: this.populateCards
    })
    this.getCards();
  }

  populateCards(data){
    this.setState({ cards: data.cards });
  }

  getCards(){
    $.ajax({
      method: "GET",
      url: "/api/cards",
      contentType: "application/json",
      success: this.populateCards
    })
  }

  handleCardDelete(deletedCardId) {
    $.ajax({
      url: "api/cards/" + deletedCardId,
      method: 'DELETE',
      success: this.getCards
    })
  }

  handleListSubmit(list) {
    $.ajax({
      url: "/api/lists",
      dataType: 'application/json',
      type: 'POST',
      data: list,
      success: this.populateLists
    })
    this.getLists();
  }

  handleListDelete(deletedListId) {
    $.ajax({
      url: "api/lists/" + deletedListId,
      method: 'DELETE'
    })
    .done(this.getLists)
  }

  componentDidMount() {
    this.getLists();
  }

  getLists(){
    $.ajax({
      method: "GET",
      url: "/api/lists",
      contentType: "application/json"
    })
    .done(data => {
      this.populateLists(data);
    });
  }

  populateLists(data){
    this.setState({ lists: data.lists, cards: data.cards });
  }

  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let card = this.state.cards[cardIndex]
    if(card.list_id !== listId){
      this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              list_id: { $set: listId }
            }
          }
      }));
    }
  }

  updateCardPosition(cardId , afterId){
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
      let card = this.state.cards[cardIndex]
      let afterIndex = this.state.cards.findIndex((card)=>card.id === afterId);
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }

  persistCardDrag (cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    let card = this.state.cards[cardIndex]
    $.ajax({
      method: "POST",
      url: "/api/cards/" + card.id,
      data: card,
      headers: {"X-HTTP-Method-Override": "PUT"},
      dataType: "application/json"
    })
    .done(data => {
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              list_id: { $set: list_id }
            }
          },
          cards: {
            $splice: [
              [cardIndex, 1],
              [afterIndex, 0, card]
            ]
          }
        })
      );
    });
  }

  render(){
    return(
      <Board cards={this.state.cards}
          lists={this.state.lists}
          cardCallbacks={{
             updateStatus: this.updateCardStatus,
             updatePosition: this.updateCardPosition,
             persistCardDrag: this.persistCardDrag,
             handleCardSubmit: this.handleCardSubmit,
             populateCards: this.populateCards,
             getCards: this.getCards,
             onCardDelete: this.handleCardDelete
          }}
          listCallbacks={{
            onListSubmit: this.handleListSubmit,
            populateLists: this.populateLists,
            getLists: this.getLists,
            onListDelete: this.handleListDelete
          }}
          cardFormCallbacks={{
            onCardSubmit: this.handleCardSubmit
          }}
          listFormCallbacks={{
            onListSubmit: this.handleListSubmit
          }}
      />
    );
  }
}

export default App;
