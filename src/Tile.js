import React from 'react';
import Paper from 'material-ui/Paper';
import { colors } from 'material-ui/styles';

const style = ({
  mine,
  open,
  flag,
  count,
}) => ({
  margin: '4px',
  height: '40px',
  width: '40px',
  lineHeight: '40px',
  display: 'inline-block',
  textAlign: 'center',
  minWidth: 'auto',
  float: 'left',
  background: open ? mine ? colors.pinkA200 : count ? colors['amber' + count + '00'] : 'white' : colors.cyan500,
  cursor: 'pointer',
  // color: count ? colors['amber' + (9 - count) + '00'] : 'black',
  color: 'black',
});

const Tile = ({
  mine = false,
  open = false,
  flag = false,
  count = 0,
  onClick = () => console.log('clicked'),
}) =>
  <Paper
    onClick={onClick}
    style={style({mine, open, flag, count})}
    zDepth={open ? 1 : 2}>
    {open && count}
  </Paper>

export default Tile
