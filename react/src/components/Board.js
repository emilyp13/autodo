import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend' ;
import List from './List.js'
import Card from './Card'

class Board extends Component {
  render() {
    let cards = this.props.cards
    let lists = this.props.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cards={cards.filter((card) => card.list_id === list.id)}
          cardCallbacks={this.props.cardCallbacks}
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
