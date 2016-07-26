import React, { Component, PropTypes } from 'react';

class CheckList extends Component {
  checkInputKeyPress(evt){
    if(evt.key === 'Enter'){
      this.props.taskCallbacks.add(this.props.cardId, evt.target.value);
      evt.target.value = '';
    }
  }

  render() {
    let tasks = this.props.tasks.map((task, taskIndex) => (
      <li key={task.id} className="checklist__task">
        <input type="checkbox"
               checked={task.completed}
               onChange={ this.props.taskCallbacks.toggle.bind(null, task.id, taskIndex) } />
             {' '}{task.text}{' '}
        <a href="#"
           className="checklist__task--remove"
           onClick={ this.props.taskCallbacks.delete.bind(null, task.id, taskIndex) } />
      </li>
    ));

    return (
      <div className="checklist">
        <ul>{tasks}</ul>
        <input type="text"
          className="checklist--add-task"
          placeholder="Enter to add a task"
          onKeyPress={this.checkInputKeyPress.bind(this)} />
      </div>
    );
  }
}
CheckList.propTypes = {
  cardId: PropTypes.number,
  tasks: PropTypes.arrayOf(PropTypes.object),
  taskCallbacks: PropTypes.object
};
export default CheckList;
