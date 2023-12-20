import React, { Component } from 'react';

export class Notice extends Component {
    componentDidMount() {
        const { seconds = 3, onClose } = this.props;

        this.timer = setTimeout(() => {
            onClose && onClose();
        }, seconds * 1000);
    }

    componentWillUnmount() {
        clearTimeout(this.timer);
    }

    render() {
        const { status, message, visible, onClose } = this.props;

        return visible ? (
            <div onClick={onClose} className={`alert ${status === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
                {message}
            </div>
        ) : null;
    }
}
