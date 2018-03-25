import React from 'react';

import '../styles/Header.css';
import logo from '../logo.png';
// import PropTypes from 'prop-types';

export class Header extends React.Component {
  constructor(props) {
    super(props);
  }
  render() {
    return (
      <div id="header">
        <div className="logo">
          <a href="#" className="nav-disabled">
            <img src={logo} title="Made with squarespace.com"/>
          </a>
        </div>
      </div>
    );
  }
}

Header.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
};

