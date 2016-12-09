import { connect } from 'react-redux';
import { fetchChannels } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import Channel from './channel';
import { allChannels } from '../../reducers/selector';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching,
    channels: allChannels(state)
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
