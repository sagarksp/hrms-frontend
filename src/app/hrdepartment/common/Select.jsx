import React from 'react';
import { Select as AntSelect } from 'antd';

const Select = ({ options, onChange, placeholder }) => {
  return (
    <AntSelect placeholder={placeholder} onChange={onChange}>
      {options.map(option => (
        <AntSelect.Option key={option.value} value={option.value}>
          {option.label}
        </AntSelect.Option>
      ))}
    </AntSelect>
  );
};

export default Select;
