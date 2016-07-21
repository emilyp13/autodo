import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend' ;
import update from 'react-addons-update';
import List from './List.js'
import Card from './Card'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      cards: []
    };
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

  updateCardStatus(cardId, listId){
    let cardIndex = this.state.cards.findIndex((card) => card.id == cardId);
    let card = this.state.cards[cardIndex]
    if (card.list_id !== listId) {
      this.setState(update(this.state, {
        cards: {
          [cardIndex]: {
            list_id: {$set: listId}
          }
        }
      }));
    }
  }

  updateCardPosition(cardId, afterId){
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
      let card = this.state.cards[cardIndex]
      let afterIndex = this.state.cards.findIndex((card)=>card.id == afterId);
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

  render() {
    let lists = this.state.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cardCallbacks={{
            updateStatus: this.updateCardStatus.bind(this),
            updatePosition: this.updateCardPosition.bind(this)
          }}
        />
      );
  });

  return(
    <div className="list-block">
    {lists}
    </div>
  );
  };
};

Board.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object
};
export default DragDropContext(HTML5Backend)(Board);
