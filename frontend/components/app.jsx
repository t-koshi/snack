import React from 'react';
import ProfileContainer from './profile/profile_container';
import SessionFormContainer from './session_form/session_form_container';
import { Link, withRouter } from 'react-router';

const App = (({ children }) => {
  return (
    <div>
      <header>
        <Link to="/"><h1>snack</h1></Link>
        <Link to="/login"><span>Sign in</span></Link>
      </header>

      <ProfileContainer />
      { children }
    </div>
  );
});

export default App;
