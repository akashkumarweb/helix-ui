import React from 'react';
import './Button.css';

export interface ButtonProps {
    variant?: 'primary' | 'secondary' | 'ghost' | 'neon' | 'brutalist';
    size?: 'sm' | 'md' | 'lg' | 'xl';
    children: React.ReactNode;
    onClick?: () => void;
    disabled?: boolean;
    loading?: boolean;
    fullWidth?: boolean;
    icon?: React.ReactNode;
}

export const Button: React.FC<ButtonProps> = ({
    variant = 'primary',
    size = 'md',
    children,
    onClick,
    disabled = false,
    loading = false,
    fullWidth = false,
    icon,
}) => {
    const className = [
        'btn',
        `btn--${variant}`,
        `btn--${size}`,
        fullWidth && 'btn--full',
        loading && 'btn--loading',
    ].filter(Boolean).join(' ');

    return (
        <button
            className={className}
            onClick={onClick}
            disabled={disabled || loading}
        >
            {loading && <span className="btn__spinner" />}
            {!loading && icon && <span className="btn__icon">{icon}</span>}
            <span className="btn__text">{children}</span>
        </button>
    );
};