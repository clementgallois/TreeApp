import React from 'react';
import PropTypes from 'prop-types';

import './index.css';

const Error = ({ message, onClose }) => (
  <div className="alert">
    <div>

      <strong>Error</strong> {message}
      <span
        className="closebtn"
        onClick={onClose}
        role="button"
        tabIndex={0}
        onKeyPress={onClose}
      >&times;
      </span>
    </div>
  </div>);

Error.propTypes = {
  message: PropTypes.string.isRequired,
  onClose: PropTypes.func.isRequired,
};

export default Error;
