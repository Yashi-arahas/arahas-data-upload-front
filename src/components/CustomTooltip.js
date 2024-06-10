// CustomTooltip.js
import React from 'react';
import './CustomTooltip.css';

const CustomTooltip = ({ children, content }) => {
    return (
        <div className="custom-tooltip-container">
            {children}
            <div className="custom-tooltip-content">
                {content}
            </div>
        </div>
    );
};

export default CustomTooltip;
