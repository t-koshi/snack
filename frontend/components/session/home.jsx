import React from 'react';
import { withRouter } from 'react-router';
import HeaderContainer from './header_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <section className="home">
        <HeaderContainer page={ '/' }/>
        { this.props.children }
      </section>
    );
  }
}

export default withRouter(Home);
