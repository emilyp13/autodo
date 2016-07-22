import React, { Component, PropTypes } from 'react';
import { DragSource, DropTarget } from 'react-dnd';
import constants from './constants';

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id,
      list_id: props.list_id
    }
  },
  endDrag(props) {
    props.cardCallbacks.persistCardDrag(props.id, props.list_id);
  }
}

const cardDropSpec = {
  hover(props, monitor) {
    const draggedId = monitor.getItem().id;
    props.cardCallbacks.updatePosition(draggedId, props.id);
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

let collectDrop = (connect, monitor) => {
  return {
    connectDropTarget: connect.dropTarget(),
  };
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      completed: false
    };
    this.deleteCard = this.deleteCard.bind(this)
  }

  deleteCard() {
    this.props.cardCallbacks.onCardDelete(this.props.id);
  }

  toggleCompleted() {
    this.setState({completed: !this.state.completed});
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;

    return connectDropTarget(connectDragSource(
      <div className={this.state.completed? "completed-card" : "incomplete-card"}>
        <input type="checkbox" onClick={this.toggleCompleted.bind(this)}/>
        <span className="card-text">{this.props.text}</span>
        <i className="fa fa-trash-o" type="submit" onClick={this.deleteCard}></i>
      </div>
    ));
  };
};

Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired,
  connectDropTarget: PropTypes.func.isRequired
}

const dragHighOrderCard = DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
const dragDropHighOrderCard = DropTarget(constants.CARD, cardDropSpec, collectDrop)(dragHighOrderCard);

export default dragDropHighOrderCard;
