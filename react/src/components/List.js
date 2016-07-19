import React, { Component } from 'react';
import Card from './Card.js'

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cards: []
    };
    this.handleNewCardClick = this.handleNewCardClick.bind(this);
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/lists/" + this.props.id + "/cards",
      contentType: "application/json"
    })
    .done(data => {
      this.setState({ cards: data.cards });
    });
  }

  handleNewCardClick() {
    debugger;
  }

  render() {
    let cards = this.state.cards.map(card => {
      return(
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
        />
      );
    });
    return(
      <div className="list">
        <h1>{this.props.title}</h1>
        <div className="card-block">
          {cards}
          <input type="text" ref="new-card-input"/>
          <input type="button" value="Add Card" onClick={this.handleNewCardClick} />
        </div>
      </div>
    );
  };
};

export default List;
