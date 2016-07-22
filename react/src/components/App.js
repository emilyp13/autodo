import React, { Component } from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import Board from './Board'

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      lists: [],
      cards: []
    };

    this.updateCardStatus = this.updateCardStatus.bind(this);
    this.updateCardPosition = this.updateCardPosition.bind(this);
    this.persistCardDrag = this.persistCardDrag.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/lists",
      contentType: "application/json"
    })
    .done(data => {
      this.setState({ lists: data.lists, cards: data.cards });
    });
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
             persistCardDrag: this.persistCardDrag
          }}
      />
    );
  }
}

export default App;
