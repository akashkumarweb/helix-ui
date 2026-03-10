import React, { useState, useRef, useEffect, useCallback, type KeyboardEvent } from 'react';
import { createPortal } from 'react-dom';
import './Select.css';

export interface SelectOption {
    value: string;
    label: string;
    disabled?: boolean;
}

export interface SelectProps {
    label: string;
    options: SelectOption[];
    value?: string;
    onChange: (value: string) => void;
    placeholder?: string;
    disabled?: boolean;
    error?: string;
    id: string;
    size?: 'sm' | 'md' | 'lg';
}

export const Select: React.FC<SelectProps> = ({
    label,
    options,
    value,
    onChange,
    placeholder = 'Select an option',
    disabled = false,
    error,
    id,
    size = 'md',
}) => {
    const [isOpen, setIsOpen] = useState(false);
    const [highlightedIndex, setHighlightedIndex] = useState(-1);
    const [selectedIndex, setSelectedIndex] = useState(
        options.findIndex((opt) => opt.value === value)
    );

    const containerRef = useRef<HTMLDivElement>(null);
    const listboxRef = useRef<HTMLDivElement>(null);
    const buttonRef = useRef<HTMLButtonElement>(null);

    const selectedOption = options[selectedIndex];
    const displayLabel = selectedOption?.label || placeholder;

    // Sync with external value
    useEffect(() => {
        const index = options.findIndex((opt) => opt.value === value);
        setSelectedIndex(index);
    }, [value, options]);

    // Click outside handler
    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (containerRef.current && !containerRef.current.contains(e.target as Node)) {
                setIsOpen(false);
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
            return () => document.removeEventListener('mousedown', handleClickOutside);
        }
    }, [isOpen]);

    // Scroll highlighted into view
    useEffect(() => {
        if (isOpen && highlightedIndex >= 0 && listboxRef.current) {
            const element = listboxRef.current.children[highlightedIndex] as HTMLElement;
            element?.scrollIntoView({ block: 'nearest' });
        }
    }, [highlightedIndex, isOpen]);

    const handleToggle = () => {
        if (!disabled) {
            setIsOpen(!isOpen);
            if (!isOpen) {
                setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
            }
        }
    };

    const handleSelect = (index: number) => {
        const option = options[index];
        if (!option.disabled) {
            setSelectedIndex(index);
            onChange(option.value);
            setIsOpen(false);
            buttonRef.current?.focus();
        }
    };

    const handleKeyDown = useCallback((e: KeyboardEvent) => {
        if (disabled) return;

        switch (e.key) {
            case 'Enter':
            case ' ':
                e.preventDefault();
                if (isOpen) {
                    if (highlightedIndex >= 0) handleSelect(highlightedIndex);
                } else {
                    setIsOpen(true);
                    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
                }
                break;

            case 'Escape':
                if (isOpen) {
                    e.preventDefault();
                    setIsOpen(false);
                    buttonRef.current?.focus();
                }
                break;

            case 'ArrowDown':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
                } else {
                    setHighlightedIndex((prev) => {
                        let next = prev + 1;
                        while (next < options.length && options[next].disabled) {
                            next++;
                        }
                        return next < options.length ? next : prev;
                    });
                }
                break;

            case 'ArrowUp':
                e.preventDefault();
                if (!isOpen) {
                    setIsOpen(true);
                    setHighlightedIndex(selectedIndex >= 0 ? selectedIndex : 0);
                } else {
                    setHighlightedIndex((prev) => {
                        let next = prev - 1;
                        while (next >= 0 && options[next].disabled) {
                            next--;
                        }
                        return next >= 0 ? next : prev;
                    });
                }
                break;

            case 'Home':
                if (isOpen) {
                    e.preventDefault();
                    setHighlightedIndex(0);
                }
                break;

            case 'End':
                if (isOpen) {
                    e.preventDefault();
                    setHighlightedIndex(options.length - 1);
                }
                break;
        }
    }, [isOpen, highlightedIndex, selectedIndex, options, disabled, onChange]);

    const listboxId = `${id}-listbox`;

    return (
        <div
            ref={containerRef}
            className={`select select--${size} ${error ? 'select--error' : ''} ${disabled ? 'select--disabled' : ''}`}
        >
            <label id={`${id}-label`} className="select__label">
                {label}
            </label>

            <button
                ref={buttonRef}
                type="button"
                id={id}
                className="select__button"
                aria-haspopup="listbox"
                aria-expanded={isOpen}
                aria-labelledby={`${id}-label ${id}`}
                aria-controls={isOpen ? listboxId : undefined}
                aria-activedescendant={isOpen && highlightedIndex >= 0 ? `${id}-option-${highlightedIndex}` : undefined}
                onClick={handleToggle}
                onKeyDown={handleKeyDown}
                disabled={disabled}
            >
                <span className={`select__value ${!selectedOption ? 'select__value--placeholder' : ''}`}>
                    {displayLabel}
                </span>
                <span className={`select__arrow ${isOpen ? 'select__arrow--open' : ''}`}>▼</span>
            </button>

            {error && <span className="select__error">{error}</span>}

            {isOpen && createPortal(
                <div
                    ref={listboxRef}
                    id={listboxId}
                    className="select__dropdown"
                    role="listbox"
                    aria-labelledby={`${id}-label`}
                    style={{
                        position: 'absolute',
                        top: containerRef.current?.getBoundingClientRect().bottom ?? 0,
                        left: containerRef.current?.getBoundingClientRect().left ?? 0,
                        width: containerRef.current?.getBoundingClientRect().width ?? 'auto',
                    }}
                >
                    {options.map((option, index) => (
                        <div
                            key={option.value}
                            id={`${id}-option-${index}`}
                            role="option"
                            aria-selected={index === selectedIndex}
                            className={`select__option ${index === highlightedIndex ? 'select__option--highlighted' : ''
                                } ${index === selectedIndex ? 'select__option--selected' : ''} ${option.disabled ? 'select__option--disabled' : ''
                                }`}
                            onClick={() => handleSelect(index)}
                            onMouseEnter={() => setHighlightedIndex(index)}
                        >
                            {option.label}
                        </div>
                    ))}
                </div>,
                document.body
            )}
        </div>
    );
};