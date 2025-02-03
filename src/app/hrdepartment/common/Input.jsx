import React from 'react';
import { Input as AntInput } from 'antd';

const Input = ({ placeholder, value, onChange, type='text' }) => {
  return (
    <AntInput placeholder={placeholder} value={value} onChange={onChange} type={type} />
  );
};

export default Input;
