// components/SearchBar.js
import React from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';

const SearchBar = () => {
  return (
    <Input
      placeholder="Search"
      style={{
        width: '200px',
        color: 'black',
      }}
      suffix={<SearchOutlined style={{ color: 'black' }} />}
    />
  );
};

export default SearchBar;
