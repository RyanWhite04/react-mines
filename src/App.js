import React, { Component } from 'react';
import Game from './Game.js';
import './App.css';

import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

class App extends Component {

  render() {
    return <Game rows={16} cols={16} density={1/4} />
  }
}

export default App;
