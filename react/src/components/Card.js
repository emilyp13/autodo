import React, { Component, PropTypes } from 'react';

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
      <button type="submit" onClick={this.deleteCard}> Delete</button>
      </div>
    );
  };
};

Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string.isRequired
}


export default Card;
