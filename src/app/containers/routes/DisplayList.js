import React from 'react';
import {Main} from '../../components/Main.js';

import '../../styles/DisplayList.css';
import PropTypes from 'prop-types';
const baseImageURL = 'http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=106003&type=card';

export class DisplayList extends React.Component {
  componentDidMount() {
    const list = JSON.parse(atob(this.props.match.params.hash));
    this.setState({
      cardsList: list
    });
  }
  constructor(props) {
    super(props);
    this.state = {
      cardsList: [],
      cardsImageURL: baseImageURL
    };
    this.displayCard = this.displayCard.bind(this);
  }
  displayCard(e) {
    if (e.target.value != null) {
      this.setState({
        cardsImageURL: `http://gatherer.wizards.com/Handlers/Image.ashx?multiverseid=${this.state.cardsList[e.target.value].id}&type=card`
      });
    }
  }
  render() {
    return (
      <Main>
        <div id="display-list">
          <h1>TCG List</h1>
          <div className="container">
            <div className="group">
              {this.state.cardsList.length > 0 ? (
                <ul>
                  {this.state.cardsList.map((value, k) => (
                    <li value={k} className="item" key={k} onMouseOver={this.displayCard}>
                      <label>{value.qty}x</label> {value.title}
                    </li>
                  ))}
                </ul>
              ) : null}
            </div>
            <div className="group display-image">
              <img src={this.state.cardsImageURL}/>
            </div>
          </div>
        </div>
      </Main>
    );
  }
}

DisplayList.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  match: PropTypes.object
};
