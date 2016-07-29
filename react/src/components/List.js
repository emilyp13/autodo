import React, { Component, PropTypes } from 'react';
import { DropTarget } from 'react-dnd';
import Card from './Card.js'
import CardForm from './CardForm.js'
import constants from './constants';

const listTargetSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updateStatus(draggedId, props.id)
  }
};

let collect = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class List extends Component {
  constructor(props) {
    super(props);
    this.state = {
      yesterday: false
    }

    this.deleteList = this.deleteList.bind(this)
  }

  deleteList() {
    this.props.listCallbacks.onListDelete(this.props.id);
  }

  componentWillMount(){
    if (this.props.category == "calendar") {
      let yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      let list_date = new Date(this.props.title);
      if (list_date.getDate() === yesterday.getDate()) {
        this.setState({yesterday: true});
      }
    }
  }

  render() {
    const { connectDropTarget } = this.props;
    let tasks = this.props.tasks;
    let list_style;
    if (this.state.yesterday) {
      list_style = "yesterday-list"
    } else {
      list_style = "list"
    }

    let delete_button, new_list_style;
    if (this.props.category === "calendar") {
      delete_button = "blank"
      new_list_style = "blank"
    } else {
      delete_button = "icon fa fa-trash-o"
      new_list_style = ""
    }

    let cards = this.props.cards.map(card => {
      return(
        <Card
          key={card.id}
          id={card.id}
          text={card.text}
          description={card.description}
          list_id = {this.props.id}
          tasks={tasks.filter((task) => task.card_id === card.id)}
          onDelete={this.handleCardDelete}
          cardCallbacks={this.props.cardCallbacks}
          taskCallbacks={this.props.taskCallbacks}
        />
      );
    });

    return connectDropTarget(
      <div className={list_style}>
        <div className="list-header">
        {this.props.title}
        <a className={delete_button} type="submit" onClick={this.deleteList}></a>
        </div>
        <div className="card-block">
          {cards}
          <CardForm cardFormCallbacks={this.props.cardFormCallbacks} list_id={this.props.id}/>
        </div>
      </div>
    );
  };
};

List.propTypes = {
  connectDropTarget: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired,
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object,
  connectDropTarget: PropTypes.func.isRequired
};
export default DropTarget(constants.CARD, listTargetSpec, collect)(List);
