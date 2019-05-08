import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  CustomButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
  };

  CustomButton.defaultProps = {
    disabled: false,
    onClick: () => {},
  };

  const {
    buttonText, id, disabled, onClick,
  } = props;

  return (
    <button className="button" id={id} type="submit" disabled={disabled} onClick={onClick}>
      {buttonText}
    </button>
  );
};

export default CustomButton;
