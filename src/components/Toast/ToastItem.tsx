import React, { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { type Toast } from '../../context/ToastContext';
import './Toast.css';

interface ToastItemProps {
    toast: Toast;
    onRemove: (id: string) => void;
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastItem: React.FC<ToastItemProps> = ({
    toast,
    onRemove,
    position = 'top-right'
}) => {
    const [isExiting, setIsExiting] = useState(false);

    useEffect(() => {
        if (isExiting) {
            const timer = setTimeout(() => onRemove(toast.id), 300);
            return () => clearTimeout(timer);
        }
    }, [isExiting, onRemove, toast.id]);

    const handleClose = () => {
        setIsExiting(true);
    };

    const icons = {
        success: '✓',
        error: '✕',
        warning: '⚠',
        info: 'ℹ'
    };

    const content = (
        <div
            className={`toast toast--${toast.type} toast--${position} ${isExiting ? 'toast--exiting' : ''}`}
            role="alert"
            aria-live="polite"
        >
            <div className="toast__icon">{icons[toast.type]}</div>
            <div className="toast__content">
                <div className="toast__title">{toast.title}</div>
                {toast.message && <div className="toast__message">{toast.message}</div>}
            </div>
            <button
                className="toast__close"
                onClick={handleClose}
                aria-label="Close notification"
            >
                ✕
            </button>
            <div className="toast__progress" style={{ animationDuration: `${toast.duration || 5000}ms` }} />
        </div>
    );

    return createPortal(content, document.body);
};