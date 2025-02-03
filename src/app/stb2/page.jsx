'use client'
import React from 'react';
import { Upload, Button, message } from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import axios from 'axios';

const FileUpload = () => {
  const handleChange = async (info) => {
    if (info.file.status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (info.file.status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  };

  const customRequest = async ({ file, onSuccess, onError }) => {
    const formData = new FormData();
    formData.append('files', file);

    try {
      await axios.post('https://api.gtel.in/hrms/uploads', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      onSuccess();
    } catch (error) {
      onError(error);
    }
  };

  return (
    <Upload
      customRequest={customRequest}
      showUploadList={false}
      onChange={handleChange}
    >
      <Button icon={<UploadOutlined />}>Upload</Button>
    </Upload>
  );
};

export default FileUpload;
