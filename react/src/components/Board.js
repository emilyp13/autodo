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
    let new_list_style;
    if (this.props.category === "calendar") {
      new_list_style = "blank"
    } else {
      new_list_style = ""
    }

    let cards = this.props.cards
    let lists = this.props.lists.map(list => {
      return(
        <List
          key={list.id}
          id={list.id}
          title={list.title}
          category={this.props.category}
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
        <div>
          <TagsBlock tags={this.props.tags}
            tagCallbacks={this.props.tagCallbacks}
            />
        </div>
        <div className="clearfix"></div>
        <div className="list-block">
          {lists}
          <span className={new_list_style}><ListForm listFormCallbacks={this.props.listFormCallbacks}/></span>
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
