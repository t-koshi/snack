import React from 'react';
import { withRouter } from 'react-router';
import HeaderContainer from './header_container';

class Home extends React.Component {
  constructor(props) {
    super(props);
  }


  render() {
    const rand = Math.floor(Math.random() * 5);

    return (
      <section className={ `home${rand}` }>
        <HeaderContainer page={ '/' }/>
        { this.props.children }
      </section>
    );
  }
}

export default withRouter(Home);
