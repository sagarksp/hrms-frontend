import React from 'react';
import { Modal as AntModal } from 'antd';

const Modal = ({ title, visible, onOk, onCancel, children }) => {
  return (
    <AntModal title={title} visible={visible} onOk={onOk} onCancel={onCancel}>
      {children}
    </AntModal>
  );
};

export default Modal;
