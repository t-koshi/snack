import { connect } from 'react-redux';
import { createChannel, fetchChannels, joinChannel } from '../../actions/channel_actions';
import { logout } from '../../actions/session_actions';
import Channel from './channel';
import { allChannels } from '../../reducers/selector';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching,
    channels: allChannels(state),
    errors: state.channels.errors
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    joinChannel: (channel) => dispatch(joinChannel(channel))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
