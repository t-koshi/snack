import { connect } from 'react-redux';
import { createChannel, fetchChannels, joinChannel } from '../../actions/channel_actions';
import { fetchUsers } from '../../actions/user_actions';
import { logout } from '../../actions/session_actions';
import ChannelsAside from './channels_aside';
import { allChannels, allUsers, allMessages } from '../../reducers/selector';
import { fetchCurrentChannel, fetchMessages } from '../../actions/messages_actions';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    channels: allChannels(state),
    users: allUsers(state),
    currentChannel: state.currentChannel.currentChannel,
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    createChannel: (channel) => dispatch(createChannel(channel)),
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName)),
    fetchMessages: (channelName) => dispatch(fetchMessages(channelName)),
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelsAside);
