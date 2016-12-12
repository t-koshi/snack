import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import ChannelIndex from './channel_index';
import ChannelForm from './channel_form';
import DMForm from './dm_form';

class ChannelsAside extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      modalOpen: false,
      whichModal: ''
    });

    this.handleClickIndex = this._handleClickIndex.bind(this);
    this.handleClickDM = this._handleClickDM.bind(this);
    this.handleClickNew = this._handleClickNew.bind(this);
    this.onModalClose = this._onModalClose.bind(this);
  }

  _DMs() {
    return this.props.currentUser.joined_channels.filter((channel) => {
      return (channel.private === true &&
        channel.name.indexOf(',') > -1) ||
        channel.name.indexOf(this.props.currentUser.username) > -1;
    });
  }

  _DMRenderNames() {
    return this._DMs().map((dm) => {
      if (dm.name === this.props.currentUser.username) {
        return this.props.currentUser.username;
      } else {
        const otherMembers = dm.members.filter((member) => member.username !== this.props.currentUser.username);
        const otherNames = otherMembers.map((member) => member.username);

        return otherNames.join(', ');
      }
    });
  }

  _channels() {
    const publicChannels = this.props.currentUser.joined_channels.filter((channel) =>
    channel.private === false);
    const privateChannels = this.props.currentUser.joined_channels.filter((channel) => {
      return (channel.private === true &&
        channel.name.indexOf(',') === -1 &&
        channel.name.indexOf(this.props.currentUser.username) === -1);
    });

    return publicChannels.concat(privateChannels);
  }

  render() {
    const { currentUser } = this.props;
    const channels =  this._channels();
    const DMs = this._DMs();
    const DMRenderNames =  this._DMRenderNames();

    const renderModal = () => {
      if (this.state.whichModal === 'index') {
        return <ChannelIndex channels={ channels }/>;
      } else if (this.state.whichModal === 'new') {
        return <ChannelForm
          users={ this.props.users }
          createChannel={ this.props.createChannel }
          currentUser={ currentUser }/>;
      } else if (this.state.whichModal === 'DM') {
        return <DMForm
          users={ this.props.users }
          createChannel={ this.props.createChannel }
          currentUser={ currentUser }
          DMs={ DMs }
          DMnames={ DMRenderNames }/>;
      }
    };

    const logout = () => <button className="log-out" onClick={ this.logOutUser }>Log Out</button>;

    return (
      <section className="channels-list group">

        <section className="joined-channels group">
          <ul className="channel-header group">
            <h4 className="channel-type" onClick={ this.handleClickIndex }>
              { "CHANNELS " }<span>{ `(${channels.length})` }</span>
            </h4>
            <button className="new-channel" onClick={ this.handleClickNew }>{ "+" }</button>
          </ul>

          <ul className="channels">
            { channels.map((channel, idx) =>
              <li key={ idx }> { channel.name } </li>) }
          </ul>
        </section>

        <section className="dms group">
          <ul className="channel-header group" onClick={ this.handleClickDM }>
            <h4 className="channel-type">
              { "DIRECT MESSAGES " }<span>{ `(${DMs.length})` }</span>
            </h4>
            <button className="new-channel">{ "+" }</button>
          </ul>

          <ul className="dms-list">
            {
              DMRenderNames.map((name, idx) => {
                return (<li key={ idx }>{ name }</li>);
              })
            }
          </ul>

        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this.onModalClose }
          contentLabel="Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
          onKeyPress={ this.handleEsc }>

          <header className="close-modal group">
            <button onClick={ this.onModalClose }>
              <i>{ '+' }</i>
              <span>esc</span>
            </button>
          </header>

          { renderModal() }
        </Modal>
      </section>
    );
  }

  _handleEsc(e) {
    if (e.keyCode === 27) {
      e.preventDefault();
      this.setState({ modalOpen: false });
    }
  }

  _handleClickDM() {
    this.setState({ modalOpen: true, whichModal: 'DM' });
  }

  _handleClickNew() {
    this.setState({ modalOpen: true, whichModal: 'new'});
  }

  _handleClickIndex() {
    this.setState({ modalOpen: true, whichModal: 'index'});
  }

  _onModalClose() {
    this.setState({ modalOpen: false});
  }
}

export default withRouter(ChannelsAside);
