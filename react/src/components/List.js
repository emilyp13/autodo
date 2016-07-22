import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card.js'
import CardForm from './CardForm.js'
import constants from './constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class List extends Component {
  constructor(props) {
    super(props);

    this.deleteList = this.deleteList.bind(this)
  }

  deleteList() {
    this.props.listCallbacks.onListDelete(this.props.id);
  }

  render() {
    const { connectDropTarget } = this.props;
    let cards = this.props.cards.map(card => {
      return(
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          list_id = {this.props.id}
          onDelete={this.handleCardDelete}
          cardCallbacks={this.props.cardCallbacks}
        />
      );
    });

    return connectDropTarget(
      <div className="list">
        <div className="list-header">
        {this.props.title}
        <i className="fa fa-trash-o" type="submit" onClick={this.deleteList}></i>
        </div>
        <div className="card-block">
          {cards}
          <CardForm cardFormCallbacks={this.props.cardFormCallbacks} list_id={this.props.id}/>
        </div>
      </div>
    );
  };
};

List.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};
export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
