import React from 'react';
import Tile from './Tile';

const Grid = ({ tiles }) =>
  <div
    style={{
    margin: '20px',
    display: 'flex',
    flexDirection: 'column',
    overflowX: 'scroll',
    overflowY: 'hidden',
    padding: '20px',
    }}
    >
    {tiles.map((row, i) =>
      <div key={i}
        style={{
        display: 'flex',
        flex: 1,
        height: '40px',
        margin: '4px auto',
        float: 'left',
        }}
        >
        {row.map((props, j) => <Tile key={j} {...props} />)}
      </div>
    )}
  </div>

export default Grid
