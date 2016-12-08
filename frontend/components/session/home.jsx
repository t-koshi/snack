import React from 'react';
import { withRouter } from 'react-router';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section>
        { this.props.children }
      </section>
    );
  }
}

export default withRouter(Home);
