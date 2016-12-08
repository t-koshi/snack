import { connect } from 'react-redux';
import { login } from '../../actions/session_actions';
import Landing from './landing';

const mapStateToProps = ((state) => {
  return { currentUser: state.session.currentUser };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    login: (user) => dispatch(login(user))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Landing);
