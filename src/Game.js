import React, { Component } from 'react';
// import keydown from 'react-keydown';
import Grid from './Grid';

export default class Game extends Component {

  constructor(props) {
    super(props);

    window.addEventListener('keydown', ({ which }) => {
        // inspect the keydown event and decide what to do
        (which === 68 || which === 37) ?
          this.tileEvents.onClick(this.state.where)() :
          (which === 70 || which === 39) ?
            this.tileEvents.onContextMenu(this.state.where)() :
            console.log('Key not assigned');
    })

    this.tileEvents = {

      onClick: where => e => this.setState({
        opens: [...this.state.opens, where],
      }),

      onContextMenu: where => e => {
        e && e.preventDefault();
        var compare = move => JSON.stringify(move) === JSON.stringify(where);
        var index = this.state.flags.findIndex(compare);
        if (index < 0) {
          this.setState({ flags: [...this.state.flags, where] })
        } else {
          var flags = this.state.flags.slice(); //copy array
          flags.splice(index, 1); //remove element
          this.setState({ flags }); //update state
        }
      },

      onKeyPress: where => e => {
        console.log({ where, e });
      },

      onMouseEnter: where => e => this.setState({ where }),

      onMouseLeave: where => e => this.setState({ where: [] }),

    };

    this.state = {
      where: [],  // Current i, j coordinate of tile below mouse
      opens: [],  // Array of i, j positions of opened(by click) tiles
      flags: [],
      field: plant(props, this.tileEvents),
    };
  }

  // componentWillReceiveProps({ keydown }) {
  //   if (keydown.event) {
  //     // inspect the keydown event and decide what to do
  //     keydown.event.which === 68 ?
  //       this.tileEvents.onClick(this.state.where)() :
  //       keydown.event.which === 70 ?
  //         this.tileEvents.onContextMenu(this.state.where)() :
  //         console.log('Key not assigned');
  //   }
  // }

  reset = fresh => fresh ? this.setState({
    field: plant(this.props, this.tileEvents),
    opens: [],
    flags: [],
  }) : this.setState({ opens: [], flags: [] })

  shouldComponentUpdate = (props, state) => {
    // console.log('shouldComponentUpdate', { props, state })
    if (props.rows !== this.props.rows ||
      props.cols !== this.props.cols ||
      props.density !== this.props.density) {
        state.field = plant(props, this.tileEvents);
        state.opens = [];
        state.flags = [];
    }
    return true
  }

  handleTouchTap = () => this.setState({ open: true })

  handleRequestClose = () => this.setState({ open: false })

  render = () => {

    var tiles = move(move(this.state.field.map(row => row.map(tile =>
      ({ ...tile, flag: false })
    )), this.state.opens, open), this.state.flags, flag)


    return <div style={{ ...this.props.style,
      margin: '20px',
      display: 'flex',
      flexDirection: 'column',
    }} >
      {this.props.children}
      <Grid tiles={tiles} />
    </div>
  }
}

function plant({ rows, cols, density }, events) {

  var tiles = [...Array(Number(rows))].map((r, i) =>
    [...Array(Number(cols))].map((c, j) =>
      ({
        mine: false,
        flag: false,
        open: false,
        count: 0,
        events: Object.entries(events).reduce((events, [event, handler]) => ({
          ...events, [event]: handler([i, j]),
        }), {}),
      })
    )
  );

  shuffle([...Array(rows * cols).keys()])
    .slice(0, Math.ceil(rows * cols * density))
    .forEach(i => tiles[~~(i / cols)][i % cols].mine = true)
  return count(tiles);
}

function shuffle(a) {
  for (let i = a.length; i; i--) {
    let j = Math.floor(Math.random() * i);
    [a[i - 1], a[j]] = [a[j], a[i - 1]];
  }
  return a;
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

function move(tiles, moves, action, i = 0) {
  return (moves && i < moves.length) ?
    move(action(tiles, moves[i]), moves, action, ++i) :
    tiles;
}

function open(tiles, [i, j]) {
  if (tiles[i] && tiles[i][j] && !tiles[i][j].open) {
    if (tiles[i][j].mine) {
      tiles = tiles.map(row => row.map(tile => ({...tile, open: true})));
    } else {
      tiles[i][j] = {...tiles[i][j], open: true};
      tiles[i][j].count || [-1, 0, 1].map(x => [-1, 0, 1].map(y =>
        open(tiles, [x + i, y + j])
      ))
    }
  }
  return tiles;
}

function flag(tiles, [i, j]) {
  tiles[i] && tiles[i][j] && (tiles[i][j].flag = true);
  return tiles;
}
