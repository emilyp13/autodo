import React, { Component, PropTypes } from 'react';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend' ;
import List from './List.js'
import ListForm from './ListForm.js'
import TagsBlock from './TagsBlock.js'

class Board extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let cards = this.props.cards
    let lists = this.props.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          cards={cards.filter((card) => card.list_id === list.id)}
          cardtags={this.props.cardtags}
          tags={this.props.tags}
          tasks={this.props.tasks}
          cardCallbacks={this.props.cardCallbacks}
          listCallbacks={this.props.listCallbacks}
          taskCallbacks={this.props.taskCallbacks}
          cardFormCallbacks={this.props.cardFormCallbacks}
          onDelete={this.handleListDelete}
        />
      );
  });

  return(
    <div>
      <TagsBlock tags={this.props.tags}
        tagCallbacks={this.props.tagCallbacks}
      />
      <div className="list-block">
        {lists}
        <ListForm listFormCallbacks={this.props.listFormCallbacks}/>
      </div>
    </div>
  );
  };
};

Board.propTypes = {
  lists: PropTypes.arrayOf(PropTypes.object),
  cards: PropTypes.arrayOf(PropTypes.object),
  cardCallbacks: PropTypes.object
};
export default DragDropContext(HTML5Backend)(Board);
