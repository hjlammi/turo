import React from 'react';
import PropTypes from 'prop-types';
import Field from './Field';

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
    </form>
  );
};

export default Form;
