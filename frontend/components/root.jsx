import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, hashHistory } from 'react-router';
import Home from './session/home';
import SessionFormContainer from './session/session_form_container';
import LandingContainer from './session/landing_container';
import ChannelContainer from './channel/channel_container';

const Root = (({ store }) => {
  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ Home }>
          <IndexRoute component={ LandingContainer }/>
          <Route path="signup" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
          <Route path="login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
        </Route>
        <Route path="messages" component={ ChannelContainer } onEnter={ _redirectToLogIn } />
      </Router>
    </Provider>
  );
});

function _redirectIfLoggedIn(_, replace) {
  if (store.getState().session.currentUser){
    replace('/messages');
  }
}

function _redirectToLogIn(_, replace) {
  if (store.getState().session.currentUser === null){
    replace('/');
  }
}

export default Root;
