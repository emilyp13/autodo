import React, { Component, PropTypes } from 'react';
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';
import { DragSource, DropTarget } from 'react-dnd';
import update from 'react-addons-update';
import constants from './constants';
import CheckList from './CheckList';

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
      showDetails: false,
      tags: []
    };
    this.deleteCard = this.deleteCard.bind(this)
    this.linkToEdit = this.linkToEdit.bind(this)
    this.getTagLabel = this.getTagLabel.bind(this)
  }

  toggleDetails() {
    this.setState({showDetails: !this.state.showDetails});
  }

  deleteCard() {
    this.props.cardCallbacks.onCardDelete(this.props.id);
  }

  linkToEdit() {
    window.location.pathname += "/cards/" + this.props.id + "/edit"
  }

  getTagLabel(data, data2) {
    debugger;
  }

  render() {
    const { connectDragSource, connectDropTarget } = this.props;
    let tags = this.props.tags;
    let cardtags = this.props.cardtags.map((cardtag) => {
      for (var i = 0; i < tags.length; i++) {
        if (tags[i].id === cardtag.tag_id ) {
          return <span className="card-tag">{tags[i].label}</span>
        }
      }
    })


    let cardDetails;
    if (this.state.showDetails) {
      cardDetails = (
        <div className="card-details">
          <div>{this.props.description}</div>
          <div>{cardtags}</div>
          <CheckList cardId={this.props.id}
                       tasks={this.props.tasks}
                       taskCallbacks={this.props.taskCallbacks}/>
        </div>
      );
    }

    return connectDropTarget(connectDragSource(
      <div className="incomplete-card">
        <a className="icon fa fa-trash-o" type="submit" onClick={this.deleteCard}></a>
        <a className="icon fa fa-pencil" type="submit" onClick={this.linkToEdit}></a>
          <span className={ this.state.showDetails? "card-text card-text-is-open" : "card-text"} onClick={this.toggleDetails.bind(this)}>
            {this.props.text}
          </span>
          <ReactCSSTransitionGroup transitionName="toggle"
                                   transitionEnterTimeout={250}
                                   transitionLeaveTimeout={250}>
            {cardDetails}
          </ReactCSSTransitionGroup>
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
