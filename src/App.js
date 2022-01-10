import React, { useReducer } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { SignUp } from './modules/auths/pages/SignUp';
import { LogIn } from './modules/auths/pages/LogIn';
import Main from './modules/mains/pages/Main';
import custContext from './contexts/custContext';
import custReducer, { initialState } from './contexts/custReducer';

function App() {
  const [state, dispatch] = useReducer(custReducer, initialState);

  return (
    <>
      <Router>
        {!state.user && <LogIn />}
        <custContext.Provider value={{ state, dispatch }}>
          <Switch>
            <Route exact path="/" component={LogIn} />
            <Route exact path="/main" component={Main} />
            <Route exact path="/login" component={LogIn} />
            <Route exact path="/signup" component={SignUp} />
          </Switch>
        </custContext.Provider>
      </Router>
    </>
  );
}

export default App;
