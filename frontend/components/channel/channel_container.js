import { connect } from 'react';
import { fetchChannels } from '../../actions/channel_actions';
import ChannelIndex from './channel_index';
//
// const mapStateToProps = ((state) => {
//   return { currentUser: state.session.currentUser };
// });

const mapDispatchToProps = (dispatch) => {
  return ({
    fetchChannels: () => dispatch(fetchChannels())
  });
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ChannelIndex);
