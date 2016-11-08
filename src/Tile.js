import React from 'react';
import Paper from 'material-ui/Paper';

const Tile = ({
  mine=false,
}) =>
  <Paper circle style={{
    // background: 'blue',
    height: 40,
    width: 40,
    display: 'inline-block',
  }}>
    {mine ? 'Y' : 'N'}
  </Paper>;

export default Tile
