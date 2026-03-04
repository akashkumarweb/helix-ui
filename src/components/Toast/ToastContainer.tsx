import React from 'react';
import { useToast } from '../../context/ToastContext';
import { ToastItem } from './ToastItem';
import './Toast.css';

interface ToastContainerProps {
    position?: 'top-right' | 'top-left' | 'bottom-right' | 'bottom-left' | 'top-center' | 'bottom-center';
}

export const ToastContainer: React.FC<ToastContainerProps> = ({
    position = 'top-right'
}) => {
    const { toasts, removeToast } = useToast();

    return (
        <div className={`toast-container toast-container--${position}`}>
            {toasts.map((toast, index) => (
                <div key={toast.id} style={{ '--toast-index': index } as React.CSSProperties}>
                    <ToastItem toast={toast} onRemove={removeToast} position={position} />
                </div>
            ))}
        </div>
    );
};