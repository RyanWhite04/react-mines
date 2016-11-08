import React from 'react';
import Paper from 'material-ui/Paper';
import Card from 'material-ui/Card';
import Radium from 'radium';
import color from 'color';

const style = {
  tile: {
    // background: 'blue',
    margin: 10,
    height: 40,
    width: 40,
    display: 'inline-block',
    ':hover': {
      width: 30,
      height: 30,
      background: 'grey',
    },
  },
  game: {
    ':hover': {
      background: color('#0074d9').lighten(0.2).hexString(),
    },
  },
};

function open(state) {
  return () => {
    console.log(this)
    console.log(state);
  }
}

const Tile = Radium(({
  mine=false,
  revealed=false
}) =>
  <Paper
    style={style.tile}
    zDepth={3}
    onClick={open(revealed)}
    circle
  >
    {revealed ? 'Y' : 'N'}
  </Paper>
)

const Game = Radium(({
  across=4,
  down=4,
  density=0.5,
}) =>
  <Card
    style={style.game}
    zDepth={1}
    // onClick={gameClick(this)}
  >
    {fill(make(across, down), density)}
  </Card>
)

function make(across, down) {
  return [...Array(down)].map(i => [...Array(across)].map(i => ({
    mine: false,
  })))
}

function fill(tiles, density) {

  const shuffle = a => {
      for (let i = a.length; i; i--) {
          let j = Math.floor(Math.random() * i);
          [a[i - 1], a[j]] = [a[j], a[i - 1]];
      }
      return a;
  }

  var rows = tiles.length;
  var count = rows * tiles[0].length;
  shuffle([...Array(count).keys()])
    .slice(0, Math.ceil(count * density))
    .forEach(i => tiles[~~(i/rows)][i%rows].mine = true)
  return tiles.map((row, i) =>
    <div key={i}>
      {row.map((props, i) => <Tile key={i} {...props}/>)}
    </div>
  );
}

export default Game
