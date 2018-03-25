import React from 'react';
import {Main} from '../../components/Main.js';

import '../../styles/CreateList.css';
import {Selector} from '../../components/Selector';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }
  render() {
    return (
      <Main>
        <div>
          <p>Create List</p>
          <Selector/>
        </div>
      </Main>
    );
  }
}

// TODO use this one https://github.com/JedWatson/react-select/blob/master/examples/src/components/States.js

CreateList.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
