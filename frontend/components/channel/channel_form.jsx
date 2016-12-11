import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';

class ChannelForm extends Component {
  constructor(props) {
    super(props);

    this.state = {

    };
  }

  render() {
    let disabled = (this.state.name === '') ? true : false;

    return (
      <section className="new-channel-modal group">
        <h3>Create a channel</h3>
        <p>{"Channels are where your team communicates. They're best when organized around a topic = #chips, for example."}</p>

        <form>
          <span>Public</span>
          <label>Name</label>
          <input
            type="text"
            placeholder="e.g. chips"/>
          <p>{ "Names must be lowercase, with no spaces, and unique." }</p>

          <label>Purpose <i>(optional)</i></label>
          <input onChange={ this.updateField }
            type="text"/>
          <span>{ "What's this channel about?" }</span>

          <label>Send invites to: <i>(optional)</i></label>
          <input
            type="text"
            placeholder="Search by name"/>
          <input type="submit" disabled={ disabled } value="Create channel"/>
        </form>
      </section>
    );
  }
}

export default withRouter(ChannelForm);
