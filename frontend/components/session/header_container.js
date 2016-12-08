import { connect } from 'react-redux';
import { login, resetErrors } from '../../actions/session_actions';
import Header from './header';
import { withRouter } from 'react-router';

const mapStateToProps = ((state, ownProps) => {
  return { currentUser: state.session.currentUser };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (user) => dispatch(login(user)),
    resetErrors: () => resetErrors()
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps)(Header));
