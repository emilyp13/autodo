import React, { Component } from 'react';
import {render} from 'react-dom';
import update from 'react-addons-update';
import {throttle} from './utils';
import Board from './Board'

class App extends Component {
  constructor(){
    super(...arguments);
    this.state = {
      lists: [],
      cards: [],
      tasks: [],
      tags: [],
      cardtags: [],
      category: ""
    };
  }

  componentDidMount() {
    this.getLists();
  }

  getLists(){
    let updateStateOnSuccess = ((data) => {
      this.setState({ cards: data.cards, lists: data.lists, tasks: data.tasks, tags: data.tags, cardtags: data.cardtags, category: data.category });
    }).bind(this);

    $.ajax({
      method: "GET",
      url: "/api" + window.location.pathname + "/lists",
      contentType: "application/json"
    })
    .done(data => {
      updateStateOnSuccess(data);
    });
  }

  handleCardSubmit(card) {
    let updateStateOnSuccess = ((data) => {
      let newCard = {id: data.card.id,
                    text: data.card.text,
                    completed: data.card.completed,
                    board_id: data.card.board_id,
                    description: data.card.description,
                    list_id: data.card.list_id};
      let nextState = update(this.state.cards, {$push: [newCard] });
      this.setState({cards:nextState});
    }).bind(this);

    $.ajax({
      url: "/api" + window.location.pathname + "/cards",
      dataType: 'json',
      type: 'POST',
      data: card,
      success: function(data, textStatus, xhr) {
        console.log("success");
        updateStateOnSuccess(data);
      },
      error: function(xhr, status, error) {
        console.log("error");
      }
    })
  }

  handleCardDelete(deletedCardId) {
    let updateStateOnSuccess = ((data) => {
      this.setState({cards: data.cards});
    }).bind(this);

    $.ajax({
      url: "/api" + window.location.pathname + "/cards/" + deletedCardId,
      method: 'DELETE',
      success: function(data) {
        console.log("success");
        updateStateOnSuccess(data);
      }
    })
  }

  handleListSubmit(list) {
    let updateStateOnSuccess = ((data) => {
      let newList = {id: data.list.id,
                    title: data.list.title,
                    board_id: data.list.board_id};
      let nextState = update(this.state.lists, {$push: [newList] });
      this.setState({lists:nextState});
    }).bind(this);

    $.ajax({
      url: "/api" + window.location.pathname + "/lists",
      dataType: 'json',
      type: 'POST',
      data: list,
      success: function(data, textStatus, xhr) {
        console.log("success");
        updateStateOnSuccess(data);
      },
      error: function(xhr, status, error) {
        console.log("error");
      }
    })
  }

  handleListDelete(deletedListId) {
    let updateStateOnSuccess = ((data) => {
      this.setState({lists: data.lists});
    }).bind(this);

    $.ajax({
      url: "/api" + window.location.pathname + "/lists/" + deletedListId,
      method: 'DELETE'
    })
    .done(data => {
      updateStateOnSuccess(data);
    })
  }

  toggleTask(taskId, taskIndex, cardId){
    let newDoneValue;
    let tasks = this.state.tasks.filter((task) => task.card_id === cardId);
    let nextState = update(tasks, {
          [taskIndex]: {
            completed: { $apply: (completed) => {
              newDoneValue = !completed
              return newDoneValue;
            }
          }
        }
      }
    );

    let updateStateOnSuccess = ((data) => {
      this.setState({tasks: data.tasks});
    }).bind(this);

    let changedTask = nextState[taskIndex];
    $.ajax({
      method: "POST",
      url: "/api" + window.location.pathname + "/tasks/" + taskId,
      data: changedTask,
      headers: {"X-HTTP-Method-Override": "PUT"},
      dataType: "json",
      success: function(data) {
        console.log("success");
        updateStateOnSuccess(data);
      }
    })
  }

  addTask(taskName, cardId){
    let updateStateOnSuccess = ((data) => {
      let newTask = {id: data.task.id,
                    text: data.task.text,
                    board_id: data.task.board_id,
                    card_id: data.task.card_id};
      let nextState = update(this.state.tasks, {$push: [newTask] });
      this.setState({tasks:nextState});
    }).bind(this);

    let taskData = {id:Date.now(), name:taskName, completed:false};
    $.ajax({
      url: "/api" + window.location.pathname + "/cards/" + cardId + "/tasks",
      dataType: 'json',
      type: 'POST',
      data: taskData,
      success: function(data, textStatus, xhr) {
        console.log("success");
        updateStateOnSuccess(data);
      },
      error: function(xhr, status, error) {
        console.log("error");
      }
    })
  }

  deleteTask(taskId, taskIndex){
    let updateStateOnSuccess = ((data) => {
      this.setState({tasks: data.tasks});
    }).bind(this);

    $.ajax({
      url: "/api" + window.location.pathname + "/tasks/" + taskId,
      method: 'DELETE',
      success: function(data) {
        console.log("success");
        updateStateOnSuccess(data);
      }
    })
  }

  handleTagClick(tagId){
    let cardtags = this.state.cardtags.filter((cardtag) => cardtag.tag_id === tagId);
    let newState = this.state.cards.filter((card) => {
      debugger;

    })
  }

  updateCardStatus(cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
    let card = this.state.cards[cardIndex]
    if(card.list_id !== listId){
      this.setState(update(this.state, {
          cards: {
            [cardIndex]: {
              list_id: { $set: listId }
            }
          }
      }));
    }
  }

  updateCardPosition(cardId , afterId){
    if(cardId !== afterId) {
      let cardIndex = this.state.cards.findIndex((card)=>card.id === cardId);
      let card = this.state.cards[cardIndex]
      let afterIndex = this.state.cards.findIndex((card)=>card.id === afterId);
      this.setState(update(this.state, {
        cards: {
          $splice: [
            [cardIndex, 1],
            [afterIndex, 0, card]
          ]
        }
      }));
    }
  }

  persistCardDrag (cardId, listId) {
    let cardIndex = this.state.cards.findIndex((card)=>card.id == cardId);
    let card = this.state.cards[cardIndex]
    $.ajax({
      method: "POST",
      url: "/api" + window.location.pathname + "/cards/" + card.id,
      data: card,
      headers: {"X-HTTP-Method-Override": "PUT"},
      dataType: "application/json"
    })
    .done(data => {
      this.setState(
        update(this.state, {
          cards: {
            [cardIndex]: {
              list_id: { $set: list_id }
            }
          },
        })
      );
    });
  }

  render(){
    return(
      <Board cards={this.state.cards}
          lists={this.state.lists}
          tasks={this.state.tasks}
          tags={this.state.tags}
          cardtags={this.state.cardtags}
          category={this.state.category}
          cardCallbacks={{
             updateStatus: this.updateCardStatus.bind(this),
             updatePosition: this.updateCardPosition.bind(this),
             persistCardDrag: this.persistCardDrag.bind(this),
             handleCardSubmit: this.handleCardSubmit.bind(this),
             onCardDelete: this.handleCardDelete.bind(this)
          }}
          taskCallbacks={{
             toggle: this.toggleTask.bind(this),
             delete: this.deleteTask.bind(this),
             add: this.addTask.bind(this)
           }}
          listCallbacks={{
            onListSubmit: this.handleListSubmit.bind(this),
            onListDelete: this.handleListDelete.bind(this)
          }}
          cardFormCallbacks={{
            onCardSubmit: this.handleCardSubmit.bind(this)
          }}
          listFormCallbacks={{
            onListSubmit: this.handleListSubmit.bind(this)
          }}
          tagCallbacks={{
            filterTags: this.handleTagClick.bind(this)
          }}
      />
    );
  }
}

export default App;
