import React, { Component } from 'react';

class Tag extends Component {
  constructor(props) {
    super(props);
    this.tagClick = this.tagClick.bind(this)
  }

  tagClick(){
    this.props.tagCallbacks.filterTags(this.props.id);
    this.setState({active: true});
  }

  render() {
    return(
      <div className="tag">
        <a type="submit" onClick={this.tagClick}>{this.props.tag}</a>
      </div>
    );
  };
};

export default Tag;
