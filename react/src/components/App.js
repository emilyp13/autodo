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
    // Find the index of the card
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    // Get the current card
    let card = this.state.cards[cardIndex]
    // Only proceed if hovering over a different list
    if(card.list_id !== listId){
      // set the component state to the mutated object
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
    // Only proceed if hovering over a different card
    if(cardId !== afterId) {
      // Find the index of the card
      let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
      // Get the current card
      let card = this.state.cards[cardIndex]
      // Find the index of the card the user is hovering over
      let afterIndex = this.state.cards.findIndex((card)=>card.id === afterId);
      // Use splice to remove the card and reinsert it a the new index
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
  render(){
    return(
      <Board cards={this.state.cards}
          lists={this.state.lists}
          cardCallbacks={{
             updateStatus: this.updateCardStatus,
             updatePosition: this.updateCardPosition,
          }}
      />
    );
  }
}

export default App;
