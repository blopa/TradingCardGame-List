import React from 'react';
import {Main} from '../../components/Main.js';

import {fetchData} from '../../helper/functions';
import '../../styles/CreateList.css';
import {Selector} from '../../components/Selector';
import {MAGIC_API_URL} from '../../helper/define';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      loadedData: false,
      selectorData: [],
      typedValue: '',
      lastAPICall: 0,
      classNames: {
        input: 'form-control',
        list: 'list-group',
        list_item: 'list-group-item'
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
  }
  onClick(value) {
    debugger;
  }
  onChange(value) {
    // https://api.magicthegathering.io/v1/cards?name=masticore
    if ((this.state.typedValue === value) && this.state.selectorData.length > 0)
      return;
    this.setState({
      typedValue: value,
      selectorData: [{
        title: 'Loading...',
        value: 0
      }]
    });
    let timeNow = new Date().valueOf();
    if (timeNow - this.state.lastAPICall > 2000) {
      const p = d => {
        let data = d.cards;
        data.splice(10);
        data = data.map(function (value) {
          return {
            title: value.name,
            value: value.id
          };
        });
        this.setState({
          loadedData: true,
          lastAPICall: (new Date().valueOf()),
          selectorData: data
        });
      };
      const ep = () => {
        this.setState({
          requestFailed: true
        });
      };
      fetchData(`${MAGIC_API_URL}cards?name=${value}`, p, ep);
    }
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
            selectorData={this.state.selectorData}
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
