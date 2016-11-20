import React from 'react';
import Paper from 'material-ui/Paper';
import Tile from './Tile';

const style = {
  Paper: {
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
  },
  Row: {
    display: 'flex',
    flex: 1,
    height: '40px',
    margin: '4px auto',
    float: 'left',
  },
};

const Grid = ({ tiles }) =>
  <Paper style={style.Paper} zDepth={1}>
    {tiles.map((row, i) =>
      <div key={i} style={style.Row} >
        {row.map((props, j) =>
          <Tile key={j} {...props} />
        )}
      </div>
    )}
  </Paper>

export default Grid
