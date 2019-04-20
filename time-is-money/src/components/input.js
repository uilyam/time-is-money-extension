import React from 'react';

export default ({ placeholder, type, value, onChange }) => (
  <div className="field">
    <div className="control">
      <input className="input" type={type} placeholder={placeholder} onChange={onChange} value={value} />
    </div>
  </div>
);