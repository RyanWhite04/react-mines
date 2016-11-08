import React from 'react';
import Paper from 'material-ui/Paper';
import Tile from './Tile.js';
// import color from 'color';

const style = {
  margin: '20px',
  background: 'blue',
};

const Grid = ({ tiles }) =>
  <Paper
    style={style}
    zDepth={1}
  >
    {tiles.map((row, i) =>
      <div key={i} style={{
        display: 'block',
        height: '40px',
        margin: '4px',
        float: 'left',
      }}>
        {row.map((props, j) =>
          <Tile key={j} {...props} />
        )}
      </div>
    )}
  </Paper>

export default Grid
