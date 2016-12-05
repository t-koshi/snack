import React from 'react';
import ProfileContainer from './profile/profile_container';
import SessionFormContainer from './session_form/session_form_container';
import { withRouter } from 'react-router';

const App = (({ children }) => {
  return (
    <div>
      <h1>Snack</h1>
      <ProfileContainer />
      { children }
    </div>
  );
});

export default App;
