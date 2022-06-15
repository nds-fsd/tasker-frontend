import React from 'react';
import { Drawer as MaterialDrawer, makeStyles } from '@material-ui/core';
import List from '../../../components/list';
import { useTaskerContext } from '../../../context';

const useStyles = makeStyles(() => ({
  paper: {
    marginTop: 50,
    backgroundColor: '#222831',
    color: 'white',
    maxWidth: 200,
    overflow: 'hidden',
    zIndex: 1,
    boxShadow: '1px 8px 8px 1px rgb(0 0 0 / 62%)',
  },
  anchorLeft: {
    borderRight: 'none',
  },
}));

const Drawer = () => {
  const {
    state: { drawer, colections },
  } = useTaskerContext();
  const materialStyles = useStyles();
  return (
    <MaterialDrawer
      variant="persistent"
      anchor="left"
      open={drawer}
      classes={{ paper: materialStyles.paper, paperAnchorDockedLeft: materialStyles.anchorLeft }}>
      <List items={colections} />
    </MaterialDrawer>
  );
};

export default Drawer;
