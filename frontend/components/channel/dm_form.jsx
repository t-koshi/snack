import React, { Component } from 'react';
import Modal from 'react-modal';
import { Link, withRouter } from 'react-router';

class DMForm extends Component {
  constructor(props) {
    super(props);

    this.state = {
      filter: ''
    };
  }

  render() {
    const { channels } = this.props;

    const renderDMs = DMs.filter((channel) => {
      return channel.name.toLowerCase().indexOf(this.state.filter) > -1;
    });

    return (
      <section className="new-dm-modal group">

        <h3> Direct Messages</h3>
        <input onChange={ this.setFilter }
          type="text"
          placeholder="Find or start a conversation">
        </input>

        <button disabled="false">Go</button>

        <ul className="dms-index group">
        </ul>

      </section>
    );
  }

  _setFilter(e) {
    e.preventDefault();
    this.setState({ filter: e.currentTarget.value.toLowerCase() });
  }
}

export default withRouter(DMForm);
