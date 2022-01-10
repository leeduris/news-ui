import React, { useContext, useState } from 'react';
import Cookies from 'js-cookie';
import { useHistory } from 'react-router-dom';
import classNames from 'classnames';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import { submitLogOut } from '../../auths/stores/authApi';
import { pullNewsApi } from '../../articles/stores/newsApi';
import custContext from '../../../contexts/custContext';
import mainLayoutStyle from '../../../styles/mainLayoutStyle';

export default function Header() {
  const { state, dispatch } = useContext(custContext);
  const classes = mainLayoutStyle();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = useState(null);
  const openAccount = Boolean(anchorEl);

  const handleDrawerOpen = () => {
    dispatch({ type: 'SET_OPEN_DRAWER', openDrawer: !state.openDrawer });
  };

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handlePullNews = React.useCallback(async () => {
    const result = await pullNewsApi();
    if (result.status === 201) {
      history.go(0);
    }
  });

  const onLogOut = React.useCallback(async () => {
    const result = await submitLogOut();
    if (result.status === 200) {
      Cookies.remove('x_auth_access');
      Cookies.remove('x_auth_refresh');

      dispatch({ type: 'SET_USER', user: {} });
      history.push('/login');
    }
  });

  return (
    <div className={classes.root}>
      <AppBar
        position="fixed"
        className={classes.appBar}
        foojon={classNames(classes.appBar, {
          [classes.appBarShift]: state.openDrawer,
        })}
      >
        <Toolbar disableGutters={true}>
          <IconButton
            color="inherit"
            aria-label="Open drawer"
            onClick={handleDrawerOpen}
            className={classes.menuButton}
          >
            <MenuIcon
              classes={{
                root: state.openDrawer ? classes.menuButtonIconOpen : classes.menuButtonIconClosed,
              }}
            />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            News / {state.category.label}
          </Typography>
          <Button className={classes.link} onClick={onLogOut}>
            Logout
          </Button>
          <>
            <IconButton
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={openAccount}
              onClose={handleClose}
            >
              <MenuItem onClick={handleClose} className={classes.menuItem}>
                Welcome {state.user.firstName}
              </MenuItem>
              {state.user.role === 'admin' && (
                <MenuItem onClick={handlePullNews} className={classes.menuItem}>
                  Pull News
                </MenuItem>
              )}
            </Menu>
          </>
        </Toolbar>
      </AppBar>
    </div>
  );
}
