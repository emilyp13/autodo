import React, { Component, PropTypes } from 'react';
import { DragSource } from 'react-dnd';
import constants from './constants';

const cardDragSpec = {
  beginDrag(props) {
    return {
      id: props.id
    }
  }
}

let collectDrag = (connect, monitor) => {
  return {
    connectDragSource: connect.dragSource()
  };
}

class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      list_id: props.list_id
    }
    this.deleteCard = this.deleteCard.bind(this)
  }

  deleteCard() {
    this.props.onDelete(this.props.id);
  }

  render() {
    const { connectDragSource } = this.props;

    return connectDragSource(
      <div className="card">
      {this.props.text}
      <button type="submit" onClick={this.deleteCard}> Delete</button>
      </div>
    );
  };
};

Card.propTypes = {
  id: PropTypes.number,
  text: PropTypes.string.isRequired,
  cardCallbacks: PropTypes.object,
  connectDragSource: PropTypes.func.isRequired
}


export default DragSource(constants.CARD, cardDragSpec, collectDrag)(Card);
