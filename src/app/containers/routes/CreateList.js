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
    alert(this.state.selectorData[value].title)
    this.setState({
      selectorData: []
    });
  }
  onChange(value) {
    // https://api.magicthegathering.io/v1/cards?name=masticore
    if (!value) {
      this.setState({
        typedValue: value,
        selectorData: []
      });
      return;
    }
    if ((this.state.typedValue === value) && (this.state.selectorData.length > 0)) {
      return;
    }

    let timeNow = new Date().valueOf();
    if (timeNow - this.state.lastAPICall > 500) {
      const p = d => {
        if (d.cards.length > 0) {
          let data = [];
          let objName = {};
          let j = 0;
          for (let i = 0; i < d.cards.length; i++) {
            let key = btoa(d.cards[i].name);
            if (!objName[key]) {
              objName[key] = 1;
              data.push({
                title: d.cards[i].name,
                value: j
              });
              j++;
            }

            if (j > 10) {
              break;
            }
          }
          this.setState({
            loadedData: true,
            lastAPICall: (new Date().valueOf()),
            selectorData: data
          });
        } else {
          this.setState({
            typedValue: value,
            selectorData: [{
              title: 'Nothing found :(',
              value: 0
            }]
          });
        }
      };
      const ep = () => {
        this.setState({
          requestFailed: true
        });
      };
      this.setState({
        typedValue: value,
        selectorData: [{
          title: 'Loading...',
          value: 0
        }]
      });
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
