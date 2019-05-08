import React from 'react';
import PropTypes from 'prop-types';
import '../css/field.css';


const Field = (props) => {
  Field.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
    type: PropTypes.string,
  };

  const {
    fieldLabel, id, onChange, type,
  } = props;

  Field.defaultProps = {
    onChange,
    type: 'text',
  };

  return (
    <div className="field">
      <label type="label" htmlFor={id} className="label">
        {fieldLabel}
        <input type={type} className="input" id={id} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field;
