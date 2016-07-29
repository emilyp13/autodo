import React, { Component } from 'react';
import Tag from './Tag.js';

class TagsBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.tags.map(tag => {
      return(
        <div>
          <span>Tags:{' '}</span>
          <Tag key={tag.id} id={tag.id} tagCallbacks={this.props.tagCallbacks} tag={tag.label}/>
        </div>
      );
    });

    return(
      <div>
        {tags}
      </div>
    );
  };
};

export default TagsBlock;
