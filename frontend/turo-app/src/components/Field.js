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
    onBlur: PropTypes.func,
  };

  Field.defaultProps = {
    onChange: () => {},
    onBlur: () => {},
    type: 'text',
  };

  const {
    fieldLabel, id, onChange, type, value, onBlur,
  } = props;

  return (
    <div className="field">
      <label type="label" htmlFor={id} className="label">
        <div>{fieldLabel}</div>
        <input type={type} className="input" id={id} value={value} onBlur={onBlur} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field;
