import { forwardRef, type InputHTMLAttributes } from 'react';

import './Input.css';

export interface InputProps extends Omit<InputHTMLAttributes<HTMLInputElement>, 'size'> {
    label: string;
    helperText?: string;
    error?: string;
    id: string;
    size?: 'sm' | 'md' | 'lg';
    variant?: 'default' | 'ghost' | 'brutalist';
}
export const Input = forwardRef<HTMLInputElement, InputProps>(({
    label,
    helperText,
    error,
    id,
    size = 'md',
    variant = 'default',
    disabled,
    required,
    className = '',
    ...props
}, ref) => {
    const inputId = id;
    const helperId = helperText ? `${id}-helper` : undefined;
    const errorId = error ? `${id}-error` : undefined;

    // Combine aria-describedby for helper and error text
    const describedBy = [helperId, errorId].filter(Boolean).join(' ') || undefined;

    const containerClasses = [
        'input-container',
        `input-container--${size}`,
        `input-container--${variant}`,
        error && 'input-container--error',
        disabled && 'input-container--disabled',
        className
    ].filter(Boolean).join(' ');

    return (
        <div className={containerClasses}>
            <label
                htmlFor={inputId}
                className="input__label"
            >
                {label}
                {required && <span className="input__required" aria-hidden="true"> *</span>}
            </label>

            <input
                ref={ref}
                id={inputId}
                className="input__field"
                aria-describedby={describedBy}
                aria-invalid={!!error}
                aria-required={required}
                disabled={disabled}
                {...props}
            />

            {helperText && !error && (
                <span id={helperId} className="input__helper">
                    {helperText}
                </span>
            )}

            {error && (
                <span id={errorId} className="input__error" role="alert">
                    {error}
                </span>
            )}
        </div>
    );
});

Input.displayName = 'Input';