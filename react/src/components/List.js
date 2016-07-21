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

    this.handleCardSubmit = this.handleCardSubmit.bind(this)
    this.populateCards = this.populateCards.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)
  }

  handleCardSubmit(card) {
    $.ajax({
      url: "/api/lists/#{this.props.id}/cards/new",
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
      url: "/api/lists/" + this.props.id + "/cards",
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

  componentDidMount() {
    this.getCards();
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
        <h1>{this.props.title}</h1>
        <div className="card-block">
          {cards}
          <CardForm onCardSubmit={this.handleCardSubmit} list_id={this.props.id}/>
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
