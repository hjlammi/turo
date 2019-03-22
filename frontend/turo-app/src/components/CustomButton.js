import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  CustomButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
  };

  const { buttonText } = props;
  return (
    <button type="button" className="button">
      {buttonText}
    </button>
  );
};

export default CustomButton;
