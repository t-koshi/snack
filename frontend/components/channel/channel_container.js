import { connect } from 'react-redux';
import { createChannel, fetchChannels, joinChannel } from '../../actions/channel_actions';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import Channel from './channel';
import { allChannels, allUsers, allMessages } from '../../reducers/selector';
import { fetchCurrentChannel, fetchMessages } from '../../actions/messages_actions';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching,
    channels: allChannels(state),
    users: allUsers(state),
    currentChannel: state.currentChannel.currentChannel,
    messages: allMessages(state)
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchChannels: () => dispatch(fetchChannels()),
    logout: () => dispatch(logout()),
    createChannel: (channel) => dispatch(createChannel(channel)),
    fetchUsers: () => dispatch(fetchUsers()),
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName)),
    fetchMessages: (channelName) => dispatch(fetchMessages(channelName))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Channel);
