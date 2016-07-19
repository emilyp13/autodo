import 'babel-polyfill';
import React from 'react';
import ReactDOM from 'react-dom';
import Board from './components/Board'

$(function() {
  ReactDOM.render(
    <Board />,
    document.getElementById('board')
  );
});
