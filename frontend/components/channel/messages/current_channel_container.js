import { connect } from 'react-redux';
import CurrentChannel from './current_channel';
import { withRouter } from 'react-router';
import { fetchCurrentChannel, fetchMessages, sendMessage, receiveMessage } from '../../../actions/messages_actions';
import { joinChannel } from '../../../actions/channel_actions';
import { allChannels, allUsers, allMessages } from '../../../reducers/selector';

const mapStateToProps = ((state, ownProps) => {
  return {
    currentUser: state.session.currentUser,
    currentChannel: state.currentChannel.currentChannel,
    fetching: state.fetching,
    messages: allMessages(state)
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchCurrentChannel: (channelName) => dispatch(fetchCurrentChannel(channelName)),
    fetchMessages: (channelName) => dispatch(fetchMessages(channelName)),
    joinChannel: (channel) => dispatch(joinChannel(channel)),
    sendMessage: (message, channel) => dispatch(sendMessage(message, channel)),
    receiveMessage: (message) => dispatch(receiveMessage(message))
  });
};

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps
)(CurrentChannel));
