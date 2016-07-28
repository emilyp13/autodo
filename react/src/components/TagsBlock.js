import React, { Component } from 'react';

class TagsBlock extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let tags = this.props.tags.map(tag => {
      return(
        <div>
          <span>Tags:{' '}</span>
          {tag.label}
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
