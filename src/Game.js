import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import Grid from './Grid.js';

class Game extends Component {

  constructor(props) {
    super(props);
    var {rows, cols, density} = props;
    this.make = this.make.bind(this);
    this.tiles = this.fill(this.make(rows, cols), density);
    this.state = { history: [] };
  }

  update(i, j) {
    return () => this.setState({
      history: this.state.history.concat([i, j]),
    });
  }

  make(rows, cols) {

    var onClick = (i, j) => () => {
      this.setState({
        history: this.state.history.concat([[i, j]]),
      });
    };

    return [...Array(rows).keys()].map(i => {
      return [...Array(cols).keys()].map(j => {
        return {
          open: false,
          mine: false,
          flag: false,
          count: 0,
          onClick: onClick(i, j),
        };
      })
    })
  }

  fill(tiles, density) {

    function shuffle(a) {
        for (let i = a.length; i; i--) {
            let j = Math.floor(Math.random() * i);
            [a[i - 1], a[j]] = [a[j], a[i - 1]];
        }
        return a;
    }

    var rows = tiles.length;
    var cols = tiles[0].length;
    var count = rows * cols;
    shuffle([...Array(count).keys()])
      .slice(0, Math.ceil(count * density))
      .forEach(i => {
        var row = ~~(i / cols);
        var col = i % cols;
        [-1, 0, 1].forEach(i => {
          return [-1, 0, 1].forEach(j => {
            if (i || j) {
              tiles[row + i] && tiles[row + i][col + j] && tiles[row + i][col + j].count++;
            } else {
              tiles[row][col].mine = true;
            }
          });
        });
      })
    return tiles;
  }

  render() {
    return <MuiThemeProvider>
      <Grid tiles={move(this.tiles, this.state.history)} />
    </MuiThemeProvider>
  }

}

function move(tiles, history, index = 0) {
  return (history && index < history.length) ?
    move(open(tiles, history[index]), history, ++index) :
    tiles;
}

function open(tiles, [i, j]) {
  if (tiles[i] && tiles[i][j] && !tiles[i][j].open) {
    if (tiles[i][j].mine) {
      tiles.forEach(row => row.forEach(tile => tile.open = true));
    } else {
      tiles[i][j].open = true;
      tiles[i][j].count || [
        [-1, -1], [-1, 0], [-1, 1],
        [0,  -1], [0,  0], [0,  1],
        [1,  -1], [1,  0], [1,  1],
      ].map(([x, y]) => open(tiles, [x + i, y + j]));
    }
  }
  return tiles;
}

export default Game
