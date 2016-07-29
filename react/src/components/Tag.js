import React, { Component } from 'react';

class TagsBlock extends Component {
  constructor(props) {
    super(props);
    this.tagClick = this.tagClick.bind(this)
  }

  tagClick(){
    this.props.tagCallbacks.filterTags(this.props.id)
  }

  render() {
    return(
      <div>
        <a type="submit" onClick={this.tagClick}>{this.props.tag}</a>
      </div>
    );
  };
};

export default TagsBlock;
