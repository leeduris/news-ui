import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';

import Header from '../../mains/pages/Header';
import SideDrawer from '../../mains/pages/Drawer';
import News from '../../articles/pages/News';
import mainLayoutStyle from '../../../styles/mainLayoutStyle';

export default function Main() {
  const classes = mainLayoutStyle();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <Header />
      <SideDrawer />
      <main className={classes.content}>
        <div className={classes.toolbar}></div>
        <News />
      </main>
    </div>
  );
}
