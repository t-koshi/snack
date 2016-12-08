import { connect } from 'react-redux';
import SessionForm from './session_form';
import { signup, login } from '../../actions/session_actions';

const mapStateToProps = ((state) => {
  return ({
    loggedIn: !!state.session.currentUser,
    errors: state.session.errors
  });
});

const mapDispatchToProps = (dispatch, ownProps) => {
  if (ownProps.router.location.pathname === "/signup") {
    return ({
      formType: "Sign up",
      processForm: (user) => dispatch(signup(user))
    });
  } else {
    return ({
      formType: "Sign in",
      processForm: (user) => dispatch(login(user))
    });
  }
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SessionForm);
