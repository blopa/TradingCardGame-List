import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Selected.css';

export class Selected extends React.Component {
  constructor(props) {
    super(props);
    this.incrementQty = this.incrementQty.bind(this);
    this.decrementQty = this.decrementQty.bind(this);
  }
  incrementQty(e) {
    debugger;
    this.props.qtyOnClick(e.target.getAttribute('data-value'), 1);
  }
  decrementQty(e) {
    debugger;
    this.props.qtyOnClick(e.target.getAttribute('data-value'), 0);
  }
  render() {
    return (
      this.props.items.length > 0 ? (
        <div id="selected-comp">
          <ul>
            {this.props.items.map((o, k) => (
              <li key={k} className={this.props.className}>
                <div>
                  <div>{o.qty}x</div>
                  <div>
                    <button onClick={this.incrementQty} data-value={k}>+</button>
                    <button onClick={this.decrementQty} data-value={k}>-</button>
                  </div>
                  <p>{o.title}</p>
                </div>
              </li>
            ), this)}
          </ul>
        </div>
      ) : null
    );
  }
}

Selected.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  className: PropTypes.string,
  items: PropTypes.array,
  qtyOnClick: PropTypes.func
};
