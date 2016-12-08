import { connect } from 'react-redux';
import { logout, receiveCurrentUser } from '../../actions/session_actions';
import Profile from './profile';

const mapStateToProps = ((state) => {
  return { currentUser: state.session.currentUser };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    logout: () => dispatch(logout())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Profile);
