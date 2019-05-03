import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  CustomButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
  };

  const { buttonText, id, disabled } = props;

  CustomButton.defaultProps = {
    disabled: false,
  };

  return (
    <button className="button" id={id} type="submit" disabled={disabled}>
      {buttonText}
    </button>
  );
};

export default CustomButton;
