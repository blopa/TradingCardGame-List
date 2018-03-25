import React from 'react';
import {Main} from '../../components/Main.js';

import '../../styles/Home.css';

export class Home extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Main>
        <p>Home!</p>
      </Main>
    );
  }
}

Home.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
