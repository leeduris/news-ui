import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MailIcon from '@material-ui/icons/Mail';

import mainLayoutStyle from '../../../styles/mainLayoutStyle';
import custContext from '../../../contexts/custContext';
import Utils from '../../../utils';


export default function SideDrawer() {
  const classes = mainLayoutStyle();
  const { state, dispatch } = useContext(custContext);
  const history = useHistory();
  
  const clickHandler = async (e, category) => {
    e.preventDefault();
    dispatch({
      type: "SET_CATEGORY",
      category: {name: Utils.lowercase(category), label: category},
    })
    history.push("/main");
  }

  return (
    <Drawer
      variant="permanent"
      className={classNames(classes.drawer, {
        [classes.drawerOpen]: state.openDrawer,
        [classes.drawerClose]: !state.openDrawer
      })}
      classes={{
        paper: classNames({
          [classes.drawerOpen]: state.openDrawer,
          [classes.drawerClose]: !state.openDrawer
        })
      }}
      open={state.openDrawer}
    >
      <div className={classes.toolbar} />
      <List>
        {["General", "Business", "Entertainment", "Technology", "Health", "Science", "Sports"].map((category, index) => (
          <ListItem button key={category} onClick={(e) => clickHandler(e, category)}>
            <ListItemIcon>
              {index % 2 === 0 ? <InboxIcon /> : <MailIcon />}
            </ListItemIcon>
            <ListItemText primary={category} />
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}