import React from 'react';
import PropTypes from 'prop-types';
import '../styles/Selected.css';

export class Selected extends React.Component {
  render() {
    return (
      this.props.items.length > 0 ? (
        <div id="selected-comp">
          <ul>
            {this.props.items.map((o, k) => (
              <li key={k} className={this.props.className}>
                <div>
                  <div>{o.qty}x</div>
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
  items: PropTypes.array
};
