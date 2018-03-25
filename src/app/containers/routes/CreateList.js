import React from 'react';
import {Main} from '../../components/Main.js';

import '../../styles/CreateList.css';
import {Selector} from '../../components/Selector';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      classNames: {
        input: 'form-control',
        list: 'list-group',
        list_item: 'list-group-item'
      }
    };
    this.onChange = this.onChange.bind(this);
  }
  onClick(value) {
    debugger;
  }
  onChange() {
    let data = [
      {
        value: 1,
        title: 'Nome 1'
      },
      {
        value: 2,
        title: 'Nome 2'
      },
      {
        value: 3,
        title: 'Nome 3'
      },
      {
        value: 4,
        title: 'Nome 4'
      }
    ];
    return data;
  }
  render() {
    return (
      <Main>
        <div>
          <p>Create List</p>
          <Selector
            classNames={this.state.classNames}
            onChange={this.onChange}
            onClick={this.onClick}
          />
        </div>
      </Main>
    );
  }
}

// TODO use this one https://github.com/JedWatson/react-select/blob/master/examples/src/components/States.js

CreateList.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
