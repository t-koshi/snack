import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import Channel from './channel';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
