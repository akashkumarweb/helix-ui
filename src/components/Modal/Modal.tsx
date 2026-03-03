import React, { useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import FocusLock from 'react-focus-lock';
import { useScrollLock } from '../../hooks/useScrollLock';
import { Stack } from '../Layout/Stack';
import './Modal.css';

export interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    description?: string;
    children: React.ReactNode;
    footer?: React.ReactNode;
    size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    variant?: 'default' | 'brutalist' | 'glass';
}

export const Modal: React.FC<ModalProps> = ({
    isOpen,
    onClose,
    title,
    description,
    children,
    footer,
    size = 'md',
    variant = 'default',
}) => {
    const overlayRef = useRef<HTMLDivElement>(null);
    const titleId = `modal-title-${Math.random().toString(36).substr(2, 9)}`;
    const descId = `modal-desc-${Math.random().toString(36).substr(2, 9)}`;

    // Lock scroll when open
    useScrollLock(isOpen);

    // Handle ESC key
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isOpen) {
                onClose();
            }
        };

        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isOpen, onClose]);

    // Focus first focusable element when opening
    useEffect(() => {
        if (isOpen && overlayRef.current) {
            const focusable = overlayRef.current.querySelector<HTMLElement>(
                'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
            );
            focusable?.focus();
        }
    }, [isOpen]);

    // Handle backdrop click
    const handleBackdropClick = (e: React.MouseEvent) => {
        if (e.target === overlayRef.current) {
            onClose();
        }
    };

    if (!isOpen) return null;

    const modalContent = (
        <div
            ref={overlayRef}
            className="modal-overlay"
            onClick={handleBackdropClick}
            role="presentation"
        >
            <FocusLock returnFocus={true}>
                <div
                    className={`modal modal--${size} modal--${variant}`}
                    role="dialog"
                    aria-modal="true"
                    aria-labelledby={titleId}
                    aria-describedby={description ? descId : undefined}
                >
                    <Stack gap="lg">
                        {/* Header */}
                        <div className="modal__header">
                            <h2 id={titleId} className="modal__title">
                                {title}
                            </h2>
                            {description && (
                                <p id={descId} className="modal__description">
                                    {description}
                                </p>
                            )}
                            <button
                                className="modal__close"
                                onClick={onClose}
                                aria-label="Close modal"
                            >
                                ✕
                            </button>
                        </div>

                        {/* Content */}
                        <div className="modal__content">
                            {children}
                        </div>

                        {/* Footer */}
                        {footer && (
                            <div className="modal__footer">
                                {footer}
                            </div>
                        )}
                    </Stack>
                </div>
            </FocusLock>
        </div>
    );

    // Portal to document.body
    return createPortal(modalContent, document.body);
};