import React from 'react';
import { Card as AntCard } from 'antd';

const Card = ({ title, children }) => {
  return (
    <AntCard title={title} style={{ margin: '10px' }}>
      {children}
    </AntCard>
  );
};

export default Card;
