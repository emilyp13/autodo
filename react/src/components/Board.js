import React, { Component } from 'react';
import List from './List.js'
import ListForm from './ListForm.js'

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      lists: [],
      cards: []
    };

    this.handleListSubmit = this.handleListSubmit.bind(this)
    this.populateLists = this.populateLists.bind(this)
    this.getLists = this.getLists.bind(this)
    this.handleListDelete = this.handleListDelete.bind(this)
  }

  componentDidMount() {
    this.getLists();
  }

  handleListSubmit(list) {
    $.ajax({
      url: "/api/lists",
      dataType: 'application/json',
      type: 'POST',
      data: list,
      success: this.populateLists
    })
    this.getLists();
  }

  handleListDelete(deletedListId) {
    $.ajax({
      url: "api/lists/" + deletedListId,
      method: 'DELETE',
      success: this.getLists
    })
  }

  populateLists(data){
    this.setState({ lists: data.lists, cards: data.cards });
  }

  getLists(){
    $.ajax({
      method: "GET",
      url: "/api/lists",
      contentType: "application/json"
    })
    .done(data => {
      this.populateLists(data);
    });
  }

  render() {
    let lists = this.state.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          onDelete={this.handleListDelete}
        />
      );
  });

  return(
    <div className="list-block">
    {lists}
    <ListForm onListSubmit={this.handleListSubmit}/>
    </div>
  );
  };
};

export default Board;
