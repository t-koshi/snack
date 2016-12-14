import { connect } from 'react-redux';
import { createChannel, fetchChannels, joinChannel } from '../../actions/channel_actions';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import Channel from './channel';
import { allChannels, allUsers } from '../../reducers/selector';
import { fetchCurrentChannel } from '../../actions/messages_actions';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching,
    channels: allChannels(state),
    errors: state.channels.errors,
    users: allUsers(state),
    currentChannel: state.currentChannel.currentChannel
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
