import React from 'react';
import PropTypes from 'prop-types';

const Field = (props) => {
  Field.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    onChange: PropTypes.func,
  };

  const { fieldLabel, id, onChange } = props;

  Field.defaultProps = {
    onChange,
  };

  return (
    <div className="field">
      <label type="label" htmlFor={id} className="label">
        {fieldLabel}
        <input type="text" className="input" id={id} onChange={onChange} />
      </label>
    </div>
  );
};

export default Field;
