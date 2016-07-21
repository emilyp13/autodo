import React, { Component } from 'react';

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false
    };
    this.deleteCard = this.deleteCard.bind(this)
  }

  deleteCard() {
    this.props.onDelete(this.props.id);
  }

  toggleCompleted() {
    this.setState({completed: !this.state.completed});
  }

  render() {
    return(
      <div className={this.state.completed? "completed-card" : "incomplete-card"}>
        <input type="checkbox" onClick={this.toggleCompleted.bind(this)}/>
        <span className="card-text">{this.props.text}</span>
        <i className="fa fa-trash-o" type="submit" onClick={this.deleteCard}></i>
      </div>
    );
  };
};

export default Card;
