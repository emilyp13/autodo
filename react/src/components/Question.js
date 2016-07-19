import React from 'react';
import { Callout } from 'react-foundation';

const Question = props => {
  return (
    <div className="row">
       <Callout>
         <h3><a href={`/questions/${props.id}`}>{props.title}</a></h3>
         <p></p>
       </Callout>
     </div>
  );
};

export default Question;
