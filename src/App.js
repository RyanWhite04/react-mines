import React, {Component} from 'react';
import {MuiThemeProvider, colors} from 'material-ui/styles';
import Game from './Game';
import './App.css';
import ActionAutoRenew from 'material-ui/svg-icons/action/autorenew';
import injectTapEventPlugin from 'react-tap-event-plugin';
import {
  Drawer, AppBar,
  // Slider,
  // RaisedButton,
  IconButton,
  TextField,
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

const GithubLink = props => <IconButton { ...props } iconClassName="muidocs-icon-custom-github" href="https://github.com/ryanwhite04/react-mines" tooltip="Github" tooltipPosition="bottom-left"/>

const Theme = props => <MuiThemeProvider>
  <div>{props.children}</div>
</MuiThemeProvider>

class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      open: false,
      rows: 8,
      cols: 10,
      density: 1 / 5
    };
  }

  handleToggle = () => this.setState({
    open: !this.state.open
  });

  setValue = key => (e, v) => this.setState({[key]: v})

  reset = fresh => () => this.refs.game.reset(fresh)

  render = () =>
    <Theme>
      <AppBar
        title="React Mines"
        iconElementLeft={
          <IconButton
            touch
            tooltip="New Game"
            tooltipPosition="bottom-right"
            >
            <ActionAutoRenew/>
          </IconButton>
        }
        iconElementRight={
          <GithubLink
            touch
            target="_blank"
            iconStyle={{ color: 'white' }}
          />
        }
        onLeftIconButtonTouchTap={this.reset(true)}
        zDepth={2}
        />
      <Drawer
        onRequestChange={open => this.setState({open})}
        docked={false}
        open={this.state.open}
        >
      </Drawer>
      <Game ref='game'
        style={{ display: 'flex' }}
        tileStyle={{ background: colors.cyan500 }}
        rows={this.state.rows}
        cols={this.state.cols}
        density={this.state.density}
        >
        <div
          style={{
            display: 'flex',
            flexDirection: 'row',
            margin: 20,
          }}
          >
          <div style={{ flex: 1 }} ></div>
          <TextField step='0.1' min='0.1' max='0.9' name='density' type='number' label='density' floatingLabelText='Density' value={this.state.density} onChange={this.setValue('density')} style={{
            flex: 1,
            maxWidth: 100,
            alignSelf: 'center'
          }}></TextField>
          <TextField step='1' min='1' max='100' name='rows' type='number' floatingLabelText='Rows' value={this.state.rows} onChange={this.setValue('rows')} style={{
            flex: 1,
            maxWidth: 100,
            alignSelf: 'center'
          }}></TextField>
          <TextField step='1' min='1' max='100' name='cols' type='number' floatingLabelText='Columns' value={this.state.cols} onChange={this.setValue('cols')} style={{
            flex: 1,
            maxWidth: 100,
            alignSelf: 'center'
          }}></TextField>
          <div style={{ flex: 1 }} ></div>
        </div>
      </Game>
    </Theme>
}

export default App;
