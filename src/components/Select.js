import React from "react";

const Select = ({ allTitle, onSelect, options, valueKey, titleKey, value }) => {
  return (
    <select onChange={onSelect}>
      <option key="all" value={value}>{allTitle}</option>
      {options.map(option => 
        <option key={option[valueKey]} value={option[valueKey]}>{option[titleKey]}</option>
      )}
    </select>
  )
};

export default Select;