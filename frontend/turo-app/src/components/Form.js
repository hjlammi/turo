import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';
import CustomButton from './CustomButton';

const Form = (props) => {
  Form.propTypes = {
    formLabel: PropTypes.string.isRequired,
  };

  const { formLabel } = props;
  return (
    <form className="form">
      <h2>{formLabel}</h2>
      <Field fieldLabel="Username" id="username" />
      <Field fieldLabel="Password" id="password" />
      <CustomButton buttonText="Login" />
    </form>
  );
};

export default Form;
