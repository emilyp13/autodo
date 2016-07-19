import React, { Component } from 'react';

class Card extends Component {
  render() {
    return(
      <div className="card">
      {this.props.text}
      </div>
    );
  };
};

export default Card;
