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
      tasks: []
    };

    this.handleListSubmit = this.handleListSubmit.bind(this)
    this.getLists = this.getLists.bind(this)
    this.handleListDelete = this.handleListDelete.bind(this)

    this.handleCardSubmit = this.handleCardSubmit.bind(this)
    this.populateState = this.populateState.bind(this)
    this.getCards = this.getCards.bind(this)
    this.handleCardDelete = this.handleCardDelete.bind(this)

    this.updateCardStatus = throttle(this.updateCardStatus.bind(this));
    this.updateCardPosition = throttle(this.updateCardPosition.bind(this),500);
    this.persistCardDrag = this.persistCardDrag.bind(this);
  }


  addTask(cardId, taskName){
    let newTask = {id:Date.now(), name:taskName, completed:false};
    let nextState = update(this.state.tasks, {$push: [newTask] });
    this.setState({tasks:nextState});
    $.ajax({
      url: "/api" + window.location.pathname + "/cards/" + cardId + "/tasks",
      dataType: 'application/json',
      type: 'POST',
      data: newTask,
      success: this.setState({tasks:nextState})
    })
    this.getCards();
  }

  deleteTask(taskId, taskIndex){
    let prevState = this.state;
    let nextState = update(this.state, {tasks: {$splice: [[taskIndex,1]] }});
    this.setState({tasks:nextState});
    $.ajax({
      url: "/api" + window.location.pathname + "/tasks/" + taskId,
      dataType: 'application/json',
      method: 'DELETE',
      success: this.populateState
    })
    this.getCards();
  }

  toggleTask(taskId, taskIndex){
    let prevState = this.state;
    let newDoneValue;
    let nextState = update(this.state.tasks, {
          [taskIndex]: {
            completed: { $apply: (completed) => {
              newDoneValue = !completed
              return newDoneValue;
            }
          }
        }
      }
    );
    this.setState({tasks:nextState});
    let changedTask = nextState[taskIndex];
    $.ajax({
      method: "POST",
      url: "/api" + window.location.pathname + "/tasks/" + taskId,
      data: changedTask,
      headers: {"X-HTTP-Method-Override": "PUT"},
      dataType: "application/json",
      success: this.populateState
    })
    this.getCards();
  }

  handleCardSubmit(card) {
    let newCard = {id:card.id, text:card.text, completed:card.completed};
    let nextState = update(this.state.cards, {$push: [newCard] });
    this.setState({cards:nextState});
    $.ajax({
      url: "/api" + window.location.pathname + "/cards",
      dataType: 'application/json',
      type: 'POST',
      data: card,
      success: this.setState({cards:nextState})
    })
    this.getCards();
  }

  populateState(data){
    this.setState({ cards: data.cards, lists: data.lists, tasks: data.tasks });
  }

  getCards(){
    $.ajax({
      method: "GET",
      url: "/api" + window.location.pathname + "/cards",
      contentType: "application/json",
      success: this.populateState
    })
  }

  handleCardDelete(deletedCardId) {
    $.ajax({
      url: "/api" + window.location.pathname + "/cards/" + deletedCardId,
      method: 'DELETE',
      success: this.getCards
    })
  }

  handleListSubmit(list) {
    let newList = {id:list.id, title:list.title};
    let nextState = update(this.state.lists, {$push: [newList] });
    this.setState({lists:nextState});
    $.ajax({
      url: "/api" + window.location.pathname + "/lists",
      dataType: 'application/json',
      type: 'POST',
      data: list,
      success: this.setState({lists:nextState})
    })
    this.getLists();
  }

  handleListDelete(deletedListId) {
    $.ajax({
      url: "/api" + window.location.pathname + "/lists/" + deletedListId,
      method: 'DELETE'
    })
    .done(this.getLists)
  }

  componentDidMount() {
    this.getLists();
  }

  getLists(){
    $.ajax({
      method: "GET",
      url: "/api" + window.location.pathname + "/lists",
      contentType: "application/json"
    })
    .done(data => {
      this.populateState(data);
    });
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
          taskCallbacks={{
             toggle: this.toggleTask.bind(this),
             delete: this.deleteTask.bind(this),
             add: this.addTask.bind(this)
           }}
          cardCallbacks={{
             updateStatus: this.updateCardStatus,
             updatePosition: this.updateCardPosition,
             persistCardDrag: this.persistCardDrag,
             handleCardSubmit: this.handleCardSubmit,
             getCards: this.getCards,
             onCardDelete: this.handleCardDelete
          }}
          listCallbacks={{
            onListSubmit: this.handleListSubmit,
            getLists: this.getLists,
            onListDelete: this.handleListDelete
          }}
          cardFormCallbacks={{
            onCardSubmit: this.handleCardSubmit
          }}
          listFormCallbacks={{
            onListSubmit: this.handleListSubmit
          }}
      />
    );
  }
}

export default App;
