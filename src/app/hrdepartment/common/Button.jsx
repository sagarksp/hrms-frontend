// AntButton.js

import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';

const AntButton = ({ type, onClick, children, ...rest }) => {
    return (
        <Button type={type} onClick={onClick} {...rest}>
            {children}
        </Button>
    );
};

AntButton.propTypes = {
    type: PropTypes.string, // 'primary', 'default', 'ghost', etc.
    onClick: PropTypes.func,
    children: PropTypes.node.isRequired,
};

AntButton.defaultProps = {
    type: 'default',
    onClick: () => {},
};

export default AntButton;
