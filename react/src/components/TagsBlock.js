import React, { Component } from 'react';
import Tag from './Tag.js';

class TagsBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.tags.map(tag => {
      return(
        <li className="tag">
          <Tag key={tag.id} id={tag.id} tagCallbacks={this.props.tagCallbacks} tag={tag.label}/>
        </li>
      );
    });

    return(
      <div className="tag-block">
        <ul>
          <li className="tag">Tags:</li>
          {tags}

          <li className="tag">
            <i className="fa fa-refresh"></i><a className="tag-reset" type="submit" onClick={this.props.tagCallbacks.resetTags}>Reset</a></li>
        </ul>
      </div>
    );
  };
};

export default TagsBlock;
