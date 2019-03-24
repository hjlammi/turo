import React from 'react';
import PropTypes from 'prop-types';

const Field = (props) => {
  Field.propTypes = {
    fieldLabel: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,

  };

  const { fieldLabel, id } = props;
  return (
    <div className="field">
      <label type="label" htmlFor={id} className="label">
        {fieldLabel}
        <input type="text" className="input" id={id} />
      </label>
    </div>
  );
};

export default Field;
