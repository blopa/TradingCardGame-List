import React from 'react';
import PropTypes from 'prop-types';

import '../styles/Selector.css';

export class Selector extends React.Component {
  constructor(props) {
    super(props);
    this.onChange = this.onChange.bind(this);
    this.onClick = this.onClick.bind(this);
    this.onFocusOut = this.onFocusOut.bind(this);
    this.onFocus = this.onFocus.bind(this);
    this.state = {
      typedValue: '',
    };
  }
  onChange(e) {
    const value = e.target.value;
    if (value && this.state.typedValue !== value) {
      this.setState({
        typedValue: value
      });
      this.props.onChange(e.target.value);
    }
  }
  onClick(e) {
    this.props.onClick(e.target.value);
    e.target.value = '';
  }
  onFocusOut() {
    let hovers = document.querySelectorAll(':hover');
    let hover = hovers[hovers.length- 1];
    if (hover) {
      if (!hover.hasAttribute('selector_list_item')) {
        this.props.onChange('');
      }
    }
  }
  onFocus(e) {
    const value = e.target.value;
    if ((value && this.state.typedValue !== value) || this.props.selectorData.length <= 0) {
      this.props.onChange(e.target.value);
    }
  }
  render() {
    return (
      <div>
        <input
          type="text"
          className={this.props.classNames.input}
          onChange={this.onChange}
          onBlur={this.onFocusOut}
          onFocus={this.onFocus}
        />
        <div>
          {this.props.selectorData.length > 0 ? (
            <ul className={this.props.classNames.list}>
              {this.props.selectorData.map(function (data, key) {
                return (
                  <li
                    onClick={this.onClick}
                    className={this.props.classNames.list_item}
                    key={key}
                    value={data.value}
                    selector_list_item=""
                  >{data.title}</li>
                )
              }.bind(this))}
            </ul>
          ) : null}
        </div>
      </div>
    );
  }
}

Selector.propTypes = {
  // https://reactjs.org/docs/typechecking-with-proptypes.html
  classNames: PropTypes.object,
  onClick: PropTypes.func,
  selectorData: PropTypes.array,
  onChange: PropTypes.func
};
