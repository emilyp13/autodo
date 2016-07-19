import React, { Component } from 'react';
import Question from './Question.js'

class QuestionList extends Component {
  constructor(props) {
    super(props);
    this.state = {
      questions: []
    };
  }
  componentDidMount() {
    $.ajax({
      method: "GET",
      url: "/api/questions",
      contentType: "application/json"
    })
    .done(data => {
      this.setState({ questions: data.questions });
    });
  }

  render() {
    let questionList = this.state.questions.map(question => {
      return(
        <Question
          key={question.id}
          id={question.id}
          title={question.title}
          description={question.description}
        />
      );
  });

  return(
    <ul className="questions-list">
    {questionList}
    </ul>
  );
  };
};

export default QuestionList;
