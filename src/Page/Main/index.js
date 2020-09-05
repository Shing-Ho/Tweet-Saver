import React from 'react';
import { DndProvider } from 'react-dnd'
import { HTML5Backend } from 'react-dnd-html5-backend'

import Header from './Header';
import Left from './Left';
import Right from './Right';
import './index.css';

function Main() {
  return (
    <div className="app">
      <Header />
      <DndProvider backend={HTML5Backend}>
        <div className="main">
          <div className="dragTweetText">
            <div>Drag tweets</div>
            <div>to save</div>
          </div>
          <Left />
          <Right />
        </div>
      </DndProvider>
    </div>
  );
}

export default Main;
