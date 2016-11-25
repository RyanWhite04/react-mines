import React, { Component } from 'react';
import { Paper } from 'material-ui';
import Grid from './Grid';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = {
      moves: [],
      mines: plant(props)
    };
  }

  reset = fresh => fresh ? this.setState({
    mines: plant(this.props),
    moves: [],
  }) : this.setState({ moves: [] })

  shouldComponentUpdate = (props, state) => {
    if (props.rows !== this.props.rows ||
      props.cols !== this.props.cols ||
      props.density !== this.props.density) {
        state.mines = plant(props);
        state.moves = [];
        // state = { ...state, mines: plant(props), moves: [] };
    }
    return true
  }

  render = () =>
    <Paper style={{ ...this.props.style,
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
    }} zDepth={1}>
      {this.props.children}
      <Grid tiles={move(count(fill(this.state.mines, (i, j) => () =>
        this.setState({ moves: [...this.state.moves, [i, j]] })
      )), this.state.moves)} />
    </Paper>

}

function move(tiles, history, index = 0) {
  return (history && index < history.length) ?
    move(open(tiles, history[index]), history, ++index) :
    tiles;
}

function open(last, [i, j]) {
  if (last[i] && last[i][j] && !last[i][j].open) {
    if (last[i][j].mine) {
      last = last.map(row => row.map(tile => ({...tile, open: true})));
    } else {
      last[i][j] = {...last[i][j], open: true};
      last[i][j].count || [-1, 0, 1].map(x => [-1, 0, 1].map(y =>
        open(last, [x + i, y + j])
      ))
    }
  }
  return last;
}

function count(tiles) {
  tiles.forEach((row, i) => row.forEach((tile, j) =>
    tile.mine && [-1, 0, 1].map(x => [-1, 0, 1].map(y =>
      tiles[i + x] &&
      tiles[i + x][j + y] &&
      tiles[i + x][j + y].count++
    ))
  ))
  return tiles;
}

function fill(mines, onClick) {
  return mines.map((row, i) => row.map((mine, j) => ({
    mine,
    count: 0,
    onClick: onClick(i, j),
  })))
}

function plant({ rows, cols, density }) {

  function shuffle(a) {
    for (let i = a.length; i; i--) {
      let j = Math.floor(Math.random() * i);
      [a[i - 1], a[j]] = [a[j], a[i - 1]];
    }
    return a;
  }

  var tiles = [...Array(rows)].map((r, i) => [...Array(cols)].fill(false))
  shuffle([...Array(rows * cols).keys()])
    .slice(0, Math.ceil(rows * cols * density))
    .forEach(i => tiles[~~(i / cols)][i % cols] = true)
  return tiles;
}

export default Game
