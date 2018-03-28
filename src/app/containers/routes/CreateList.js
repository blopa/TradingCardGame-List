import React from 'react';
import {Main} from '../../components/Main.js';

import {fetchData} from '../../helper/functions';
import '../../styles/CreateList.css';
import {Selector} from '../../components/Selector';
import {MAGIC_API_URL} from '../../helper/define';
import {Selected} from '../../components/Selected';

export class CreateList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      requestFailed: false,
      loadedData: false,
      selectorData: [],
      typedValue: '',
      localCardsList: [],
      lastAPICall: 0,
      classNames: {
        input: 'form-control',
        list: 'list-group',
        list_item: 'list-group-item'
      }
    };
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.incrementCardQty = this.incrementCardQty.bind(this);
    this.generateList = this.generateList.bind(this);
  }
  incrementCardQty(key, type) {
    const localCardsList = JSON.parse(JSON.stringify(this.state.localCardsList));
    if (type === 1) {
      localCardsList[key].qty += 1;
    } else { // if (type === 0) {
      if (localCardsList[key].qty > 1) {
        localCardsList[key].qty -= 1;
      } else {
        localCardsList.splice(key, 1);
      }
    }

    this.setState({
      localCardsList: localCardsList
    });
  }
  onClick(value) {
    const localCardsList = JSON.parse(JSON.stringify(this.state.localCardsList));
    localCardsList.push(this.state.selectorData[value]);
    this.setState({
      selectorData: [],
      localCardsList: localCardsList
    });
  }
  generateList() {
    debugger;
    let listString = '';
    this.state.localCardsList.forEach(card => {
      listString += `${card.qty},${card.id};`;
    });

    alert(btoa(listString));
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

    const timeNow = new Date().valueOf();
    if (timeNow - this.state.lastAPICall > 500) {
      const p = d => {
        if (d.cards.length > 0) {
          const data = [];
          const objName = {};
          let j = 0;
          for (let i = 0; i < d.cards.length; i++) {
            if (d.cards[i].multiverseid) {
              const key = btoa(d.cards[i].name);
              if (!objName[key]) {
                objName[key] = 1;
                data.push({
                  title: d.cards[i].name,
                  value: j,
                  qty: 1,
                  id: d.cards[i].multiverseid
                });
                j++;
              }

              if (j > 10) {
                break;
              }
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
          <Selected
            items={this.state.localCardsList}
            qtyOnClick={this.incrementCardQty}
          />
          <Selector
            classNames={this.state.classNames}
            onChange={this.onChange}
            onClick={this.onClick}
            selectorData={this.state.selectorData}
            placeholder={'Type a card name here...'}
          />
          <button onClick={this.generateList} type="button" className="btn btn-success">Generate</button>
        </div>
      </Main>
    );
  }
}

// TODO use this one https://github.com/JedWatson/react-select/blob/master/examples/src/components/States.js

CreateList.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
