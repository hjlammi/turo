import React from 'react';
import PropTypes from 'prop-types';

const CustomButton = (props) => {
  CustomButton.propTypes = {
    buttonText: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
  };

  const { buttonText, id } = props;
  return (
    <button type="button" className="button" id={id}>
      {buttonText}
    </button>
  );
};

export default CustomButton;
