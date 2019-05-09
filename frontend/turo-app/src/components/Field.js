import React from 'react';
import PropTypes from 'prop-types';
import '../css/field.css';


const Field = (props) => {
  Field.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
  };

  const {
    fieldLabel, id, onChange, type, value,
  } = props;

  Field.defaultProps = {
    onChange,
    type: 'text',
  };

  return (
    <div className="field">
      <label type="label" htmlFor={id} className="label">
        <div>{fieldLabel}</div>
        <input type={type} className="input" id={id} value={value} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field;
