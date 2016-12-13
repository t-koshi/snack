import React from 'react';
import { Provider } from 'react-redux';
import { Router, Route, IndexRoute, IndexRedirect, hashHistory } from 'react-router';


import Home from './session/home';
import App from './app';
import SessionFormContainer from './session/session_form_container';
import ChannelContainer from './channel/channel_container';
import CurrentChannelContainer from './channel/messages/current_channel_container';

const Root = (({ store }) => {
  function _redirectIfLoggedIn(_, replace) {
    if (store.getState().session.currentUser){
      replace('/messages/general');
    }
  }

  return (
    <Provider store={ store }>
      <Router history={ hashHistory }>
        <Route path="/" component={ App }>
          <IndexRoute component={ Home }/>
            <Route path="signup" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
            <Route path="login" component={ SessionFormContainer } onEnter={ _redirectIfLoggedIn } />
        </Route>
        <Route path="messages" component={ ChannelContainer }>
          <IndexRedirect to="/messages/general" />
          <Route path=":channelName" component={ CurrentChannelContainer }/>
        </Route>
    </Router>
    </Provider>
  );
});

export default Root;
