import React, { Component } from 'react';
import Grid from './Grid';

class Game extends Component {

  constructor(props) {
    super(props);
    this.state = { moves: [] };
  }

  componentWillReceiveProps(props) {
    console.log('Game', this.props, props, this.props.mines === props.mines);
    // this.props.mines === props.mines || this.setState({ history: [] });
  }

  render = () => <Grid tiles={move(count(fill(this.props.mines, (i, j) => () =>
    this.setState({ moves: [...this.state.moves, [i, j]] })
  )), this.state.moves)} />
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

export default Game
