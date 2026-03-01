import React from 'react';
import './Layout.css';

export interface StackProps {
    children: React.ReactNode;
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    align?: 'start' | 'center' | 'end' | 'stretch';
    justify?: 'start' | 'center' | 'end' | 'between' | 'around';
    className?: string;
    as?: React.ElementType; // FIXED: Use React.ElementType
}

export const Stack: React.FC<StackProps> = ({
    children,
    gap = 'md',
    align = 'stretch',
    justify = 'start',
    className = '',
    as: Component = 'div',
}) => {
    const classes = [
        'stack',
        `stack--gap-${gap}`,
        `stack--align-${align}`,
        `stack--justify-${justify}`,
        className,
    ].filter(Boolean).join(' ');

    return <Component className={classes}>{children}</Component>;
};