import React, { Component } from 'react';
import List from './List.js'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: []
    };
  }

  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/lists",
      contentType: "application/json"
    })
    .done(data => {
      this.setState({ lists: data.lists });
    });
  }

  render() {
    let lists = this.state.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cards={list.cards}
        />
      );
  });

  return(
    <ul>
    {lists}
    </ul>
  );
  };
};

export default Board;
