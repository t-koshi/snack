import React from 'react';
import ReactDOM from 'react-dom';
import { Link, withRouter } from 'react-router';
import Modal from 'react-modal';
import ChannelIndex from './modals/channel_index';
import ChannelForm from './modals/channel_form';
import DMForm from './modals/dm_form';
import * as Util from '../../util/util';

class ChannelsAside extends React.Component {
  constructor(props) {
    super(props);

    this.state = ({
      modalOpen: false,
      whichModal: ''
    });

    this._handleClickIndex = this._handleClickIndex.bind(this);
    this._handleClickDM = this._handleClickDM.bind(this);
    this._handleClickNew = this._handleClickNew.bind(this);
    this._onModalClose = this._onModalClose.bind(this);
    this._visitThisChannel = this._visitThisChannel.bind(this);
    this._visitThisDM = this._visitThisDM.bind(this);
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
        let nameString = otherNames.sort().join(', ');
        return nameString;
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

  _allChannels() {
    return this.props.channels.filter((channel) => channel.private === false);
  }

  render() {
    const { currentUser, currentChannel } = this.props;
    const joined_channels =  this._channels();
    const DMs = this._DMs();
    const DMRenderNames =  this._DMRenderNames();

    const renderModal = () => {
      if (this.state.whichModal === 'index') {
        return <ChannelIndex channels={ this._allChannels() }
          currentUser={ currentUser }
          passToNew={ this._handleClickNew }
          fetchCurrentChannel={ this.props.fetchCurrentChannel }
          closeModal={ this._onModalClose }/>;
      } else if (this.state.whichModal === 'new') {
        return <ChannelForm
          users={ this.props.users }
          closeModal={ this._onModalClose }
          createChannel={ this.props.createChannel }
          currentUser={ currentUser }/>;
      } else if (this.state.whichModal === 'DM') {
        return <DMForm
          users={ this.props.users }
          createChannel={ this.props.createChannel }
          currentUser={ currentUser }
          DMs={ DMs }
          DMnames={ DMRenderNames }
          closeModal={ this._onModalClose }/>;
      }
    };

    const cancelButton = () => {
      if (this.state.whichModal === 'new' && this.state.modalOpen === true) {
        return <button  className="cancel" onClick={ this._onModalClose }>Cancel</button>;
      }
    };


    const active = (name) => {
      const { currentUser } = this.props;
      const { channelName } = this.props.router.params;

      if (Util.DmUrlToDisplay(channelName, currentUser.username) === name) {
        return 'active';
      } else {
        return '';
      }
    };

     return (
      <section className="channels-list group">

        <section className="joined-channels group">
          <ul className="channel-header group">
            <h4 className="channel-type group" onClick={ this._handleClickIndex }>
              { "CHANNELS " }<span>{ `(${ this._allChannels().length })` }</span>
            </h4>
            <i className="material-icons new-channel"
              onClick={ this._handleClickNew }>
              add_circle_outline
            </i>
          </ul>

          <ul>
            { joined_channels.map((channel, idx) =>
              <li
                key={ idx }
                className={ active(channel.name) }
                onClick={ this._visitThisChannel }>
                { channel.name }
              </li>) }
          </ul>
        </section>

        <section className="dms group">

          <ul className="channel-header group" onClick={ this._handleClickDM }>
            <h4 className="channel-type group">
              { "DIRECT MESSAGES " }<span>{ `(${DMs.length})` }</span>
            </h4>
            <i className="material-icons new-channel"
              onClick={ this._handleClickNew }>
              add_circle_outline
            </i>
          </ul>

          <ul>
            {
              DMRenderNames.map((name, idx) => {
                return (<li key={ idx }
                  className={ active(name) }
                  onClick={ this._visitThisDM }>
                  { name }
                </li>);
              })
            }
          </ul>

        </section>

        <Modal
          isOpen={ this.state.modalOpen }
          onRequestClose={ this._onModalClose }
          contentLabel="Modal"
          className="modal-content"
          overlayClassName="modal-overlay"
          onKeyPress={ this._handleEsc }>

          <header className="close-modal group">
            <button onClick={ this._onModalClose }>
              <i className="material-icons">clear</i>
                <span>esc</span>
            </button>
          </header>

          { renderModal() }
          <div className="cancel-wrapper">
            { cancelButton() }
          </div>

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

  _visitThisChannel(e) {
    e.preventDefault();
    const visitChannelName = e.currentTarget.innerHTML;
    this.props.fetchCurrentChannel(visitChannelName).then(() => {
      this.props.router.replace(`/messages/${visitChannelName}`);
    });
  }

  _visitThisDM(e) {
    e.preventDefault();
    const dmTarget = e.currentTarget.innerHTML;
    const urlPath = `@${dmTarget.replace(/ /g,'')}`;
    const fetchChannelName = Util.DmUrlToName(urlPath, this.props.currentUser);

    this.props.fetchCurrentChannel(fetchChannelName).then(() => {
      this.props.router.replace(`/messages/${urlPath}`);
    });
  }
}

export default withRouter(ChannelsAside);
