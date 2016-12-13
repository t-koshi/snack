import { connect } from 'react-redux';
import { joinChannel } from '../../actions/channel_actions';
import ChannelDetail from './channel_detail';

const mapStateToProps = ((state) => {
  return {
    currentUser: state.session.currentUser,
    fetching: state.fetching
  };
});

const mapDispatchToProps = (dispatch) => {
  return ({
    joinChannel: (channel) => dispatch(joinChannel(channel))
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelDetail);
