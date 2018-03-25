import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Selector.css';

export class Selector extends React.Component {
  render() {
    return (
      <div>
        <input type="text" />
      </div>
    );
  }
}

Selector.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};
