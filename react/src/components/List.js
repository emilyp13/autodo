import React, { Component } from 'react';
import Card from './Card.js'
import CardForm from './CardForm.js'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };

    this.handleCardSubmit = this.handleCardSubmit.bind(this)
    this.populateCards = this.populateCards.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)
    this.deleteList = this.deleteList.bind(this)
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

  deleteList() {
    this.props.onDelete(this.props.id);
  }

  render() {
    let cards = this.state.cards.map(card => {
      return(
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          onDelete={this.handleCardDelete}
        />
      );
    });
    return(
      <div className="list">
        <div className="list-header">
        {this.props.title}
        <i className="fa fa-trash-o" type="submit" onClick={this.deleteList}></i>
        </div>
        <div className="card-block">
          {cards}
          <CardForm onCardSubmit={this.handleCardSubmit} list_id={this.props.id}/>
        </div>
      </div>
    );
  };
};

export default List;
