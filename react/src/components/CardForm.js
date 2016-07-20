import React, { Component } from 'react';

class CardForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      text: ''
    };
    this.handleTextChange = this.handleTextChange.bind(this)
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  handleTextChange(e) {
    this.setState({text: e.target.value});
  }

  handleSubmit(e) {
    e.preventDefault();
    let text = this.state.text.trim();
    if (!text) {
      return;
    }
    this.props.onCardSubmit({text: text, list_id: this.props.list_id});
    this.setState({text: ''});
  }

  render() {
    return(
      <form className="cardForm" onSubmit={this.handleSubmit}>
        <input id={'text-input-' + this.props.list_id} type="text" placeholder="Say something..." value={this.state.text} onChange={this.handleTextChange} />
        <input id={'create-card-button-' + this.props.list_id} type="submit" value="Post" />
      </form>
    );
  };
};

export default CardForm;
