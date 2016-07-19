import React, { Component } from 'react';

class Card extends Component {
  render() {
    return(
      <div>
      {this.props.text}
      </div>
    );
  };
};

export default Card;
