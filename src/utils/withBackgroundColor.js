import React from 'react';

const withBackgroundColor = (WrappedComponent) => {
    return class extends React.Component {
        render() {
            const { backgroundColor, ...rest } = this.props;
            return (
                <div style={{ backgroundColor }}>
                    <WrappedComponent {...rest} />
                </div>
            );
        }
    };
};

export default withBackgroundColor;
