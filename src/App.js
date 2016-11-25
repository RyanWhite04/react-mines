import React, { Component } from 'react';
import { MuiThemeProvider } from 'material-ui/styles';
import { Drawer, AppBar, MenuItem, Slider, RaisedButton } from 'material-ui';
import Game from './Game';
import injectTapEventPlugin from 'react-tap-event-plugin';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

const style = {
  slider: {
    width: 100,
  },
  game: {

  },
};

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: 8,
      cols: 10,
      density: 1/4,
    };
  }

  handleToggle = () => this.setState({ open: !this.state.open });
  handleClose = () => this.setState({ open: false });
  newGame = () => this.setState({ density: this.state.density });
  setValue = key => (e, v) => this.setState({ [key]: v })

  render = () =>
    <MuiThemeProvider><div>
      <AppBar title="React Mines"
        iconClassNameRight="muidocs-icon-navigation-expand-more"
        onLeftIconButtonTouchTap={this.handleToggle}
        zDepth={2}
      />
      <Drawer
        docked={false}
        width={200}
        open={this.state.open}
        onRequestChange={(open) => this.setState({open})} >
        <MenuItem>Menu Item</MenuItem>
        Density
        <Slider style={style.slider}
          value={this.state.density}
          onChange={this.setValue('density')}
          label='Density' />
        Rows
        <Slider style={style.slider}
          min={1}
          max={100}
          step={1}
          value={this.state.rows}
          onChange={this.setValue('rows')}
          label='Rows' />
        Columns
        <Slider style={style.slider}
          min={1}
          max={100}
          step={1}
          value={this.state.cols}
          onChange={this.setValue('cols')}
          label='Columns' />
        {/* <RaisedButton onTouchTap={this.reset()}>Restart</RaisedButton>
        <RaisedButton onTouchTap={this.reset(false)}>New Game</RaisedButton> */}
      </Drawer>
      <Game
        style={{ padding: 30 }}
        rows={this.state.rows}
        cols={this.state.cols}
        density={this.state.density}
      />
    </div></MuiThemeProvider>;
}

export default App;
