import React from 'react';
import { Paper, SvgIcon } from 'material-ui';
import { colors } from 'material-ui/styles';
import ContentFlag from 'material-ui/svg-icons/content/flag';


const Mine = props =>
  <SvgIcon {...props} style={{
    // color: colors.pinkA200,
    color: 'black',
    height: '100%',
  }} >
    <path d="M23 12 l-2.44-2.78.34-3.68-3.61-.82-1.89-3.18
      L12 3 8.6 1.54 6.71 4.72 l-3.61.81.34 3.68
      L1 12 l2.44 2.78-.34 3.69 3.61.82 1.89 3.18
      L12 21 l3.4 1.46 1.89-3.18 3.61-.82-.34-3.68" />
  </SvgIcon>

const Flag = props =>
  <ContentFlag style={{ ...props.style,
    color: 'white',
    height: '100%',
  }} />

const style = ({ mine, open, flag, count }) =>
({
  margin: '4px',
  height: '40px',
  width: '40px',
  lineHeight: '40px',
  display: 'inline-block',
  textAlign: 'center',
  minWidth: 'auto',
  float: 'left',
  background: open ?
    mine ?
      'white' :
      count ?
        colors['amber' + count + '00'] :
        'white' :
    colors.cyan500,
  cursor: 'pointer',
  color: 'black',
})

const Tile = ({
  mine = false,
  open = false,
  flag = false,
  count = 0,
  onClick = () => console.log('leftClick'),
  onContextMenu = () => console.log('rightClick'),
}) =>
  <Paper style={style({mine, open, flag, count})}
    onClick={onClick}
    onContextMenu={onContextMenu}
    zDepth={open ? 1 : 2} >
    {open ? mine ? <Mine /> : count : flag && <Flag />}
  </Paper>

export default Tile
