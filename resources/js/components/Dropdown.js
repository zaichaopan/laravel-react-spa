import React, { Component } from 'react';
import ClickOutside from 'react-click-outside';
import PropTypes from 'prop-types';

const propTypes = {
  dropdown: PropTypes.element.isRequired,
  toggle: PropTypes.element.isRequired
};

class DropdownLink extends Component {
  constructor (props) {
    super(props);
    this.state = {
      show: false
    };
  }

  toggle () {
    this.setState((prevState, props) => ({
      show: !prevState.show
    }));
  }

  close () {
    this.setState({ show: false });
  }

  render () {
    const dropdown = (
      <div className="relative">
        <span
          onClick={() => this.toggle()}
          className="flex items-center inline-block">
          {
            this.props.toggle
          }
          <svg className="ml-1 h-4 w-4 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
            <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"
            />
          </svg>
        </span>

        {this.state.show && (
          <div className="absolute pin-l mt-px">
            {
              this.props.dropdown
            }
          </div>
        )
        }
      </div>
    );

    return (
      <ClickOutside onClickOutside={() => this.close()}>
        {dropdown}
      </ClickOutside>
    );
  }
}

DropdownLink.propTypes = propTypes;

export default DropdownLink;
