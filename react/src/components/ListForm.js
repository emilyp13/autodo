import React, { Component } from 'react';

class ListForm extends Component {
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
    this.props.listFormCallbacks.onListSubmit({text: text, list_id: this.props.list_id});
    this.setState({text: ''});
  }

  render() {
    return(
      <form className="new-list" onSubmit={this.handleSubmit}>
        <div>
          <input className="button submit-button" type="submit" value="Add List" />
          <input className="input-field" type="text" placeholder="Add a new list..." value={this.state.text} onChange={this.handleTextChange} />
        </div>
      </form>
    );
  };
};

export default ListForm;
