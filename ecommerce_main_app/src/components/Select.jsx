// Select.jsx
import React from "react";

const Select = ({ className, value, onChange, options, defaultOption }) => (
  <select className={className} value={value} onChange={onChange}>
    <option value="">{defaultOption}</option>
    {options.map((option) => (
      <option key={option} value={option}>
        {option}
      </option>
    ))}
  </select>
);

export default Select;
