import React from 'react';
import {Main} from '../../components/Main.js';

import '../../styles/DisplayList.css';

export class DisplayList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Main>
        <p>Display List {this.props.match.params.hash}</p>
      </Main>
    );
  }
}

DisplayList.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
