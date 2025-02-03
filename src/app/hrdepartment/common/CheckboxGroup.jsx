import React from 'react';
import { Checkbox } from 'antd';

const CheckboxGroup = ({ options, onChange }) => {
  return (
    <Checkbox.Group onChange={onChange}>
      {options.map(option => (
        <Checkbox key={option.value} value={option.value}>
          {option.label}
        </Checkbox>
      ))}
    </Checkbox.Group>
  );
};

export default CheckboxGroup;
