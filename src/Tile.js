import React from 'react';
import Paper from 'material-ui/Paper';

const style = ({
  mine,
  open,
  // flag,
  // count,
}) => ({
  margin: '4px',
  height: '40px',
  width: '40px',
  lineHeight: '40px',
  display: 'inline-block',
  textAlign: 'center',
  minWidth: 'auto',
  float: 'left',
  background: open ? mine ? 'red': 'white': 'grey',
});

const Tile = ({
  mine = false,
  open = false,
  flag = false,
  count = 0,
  onClick = () => console.log('clicked'),
}) =>
  <Paper onClick={onClick} style={style({mine, open})} zDepth={open ? 1 : 2}>
    {open && count}
  </Paper>

export default Tile
