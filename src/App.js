import React, { Component } from 'react';
import { MuiThemeProvider, colors } from 'material-ui/styles';
import Game from './Game';
import './App.css';
// import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Drawer,
  AppBar,
  Slider,
  RaisedButton,
  IconButton,
  // IconMenu,
  // MenuItem,
} from 'material-ui';

// Needed for onTouchTap
// http://stackoverflow.com/a/34015469/988941
injectTapEventPlugin();

// const RightMenu = props =>
//   <IconMenu
//     iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
//     targetOrigin={{ horizontal: 'right', vertical: 'top' }}
//     anchorOrigin={{ horizontal: 'right', vertical: 'top' }}
//     >
//     <MenuItem primaryText="Refresh" />
//     <MenuItem primaryText="Help" />
//     <MenuItem primaryText="Sign out" />
//   </IconMenu>

const GithubLink = props =>
  <IconButton
    { ...props }
    iconClassName="muidocs-icon-custom-github"
    href="https://github.com/ryanwhite04/react-mines"
    tooltip="Github"
    tooltipPosition="bottom-left"
  />

const Theme = props =>
  <MuiThemeProvider><div>{props.children}</div></MuiThemeProvider>

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
  setValue = key => (e, v) => this.setState({ [key]: v })
  reset = fresh => () => this.refs.game.reset(fresh)

  render = () =>
    <Theme>
      <AppBar title="React Mines"
        onLeftIconButtonTouchTap={this.handleToggle} zDepth={2}
        iconElementRight={
          <GithubLink target="_blank" iconStyle={{ color: 'white'}} />
        }
      />
      <Drawer
        docked={false} open={this.state.open}
        onRequestChange={open => this.setState({ open })} >
      </Drawer>
      <Game ref='game'
        style={{ display: 'flex' }}
        tileStyle={{ background: colors.cyan500 }}
        rows={this.state.rows}
        cols={this.state.cols}
        density={this.state.density} >
        <div style={{ display: 'flex', flexDirection: 'row', margin: 20 }}>
          <div style={{ flex: 1 }}></div>
          <RaisedButton style={{ maxWidth: 100, flex: 1, margin: 10 }}
            onTouchTap={this.reset()}>
            Restart
          </RaisedButton>
          <RaisedButton style={{ maxWidth: 100, flex: 1, margin: 10 }}
            onTouchTap={this.reset(false)}>
            New Game
          </RaisedButton>
          <div style={{ flex: 1 }}></div>
        </div>
        <div style={{ alignSelf: 'center' }}>Density</div>
        <Slider style={{ width: 300, alignSelf: 'center' }}
          value={this.state.density}
          onChange={this.setValue('density')} />
          <div style={{ alignSelf: 'center'}}>Rows</div>
        <Slider style={{ width: 300, alignSelf: 'center' }}
          min={1} max={100} step={1}
          value={this.state.rows}
          onChange={this.setValue('rows')} />
          <div style={{ alignSelf: 'center' }}>Columns</div>
        <Slider style={{ width: 300, alignSelf: 'center' }}
          min={1} max={100} step={1}
          value={this.state.cols}
          onChange={this.setValue('cols')} />
      </Game>
    </Theme>
}

export default App;
