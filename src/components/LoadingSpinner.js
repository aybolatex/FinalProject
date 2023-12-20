import React from 'react';

const LoadingSpinner = () => {
    return (
        <div
            style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                height: '75vh'
            }}
        >
            <div className="spinner-border" role="status"></div>
        </div>
    );
};

export default LoadingSpinner;
