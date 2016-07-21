import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.deleteCard = this.deleteCard.bind(this)
  }

  deleteCard() {
    this.props.onDelete(this.props.id);
  }

  render() {
    return(
      <div className="card">
      {this.props.text}
      <i className="fa fa-trash-o" type="submit" onClick={this.deleteCard}></i>
      </div>
    );
  };
};

export default Card;
