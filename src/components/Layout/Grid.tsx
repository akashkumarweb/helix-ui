import React from 'react';
import './Layout.css';

export interface GridProps {
    children: React.ReactNode;
    columns?: 1 | 2 | 3 | 4 | 'auto';
    gap?: 'none' | 'xs' | 'sm' | 'md' | 'lg' | 'xl';
    className?: string;
}

export const Grid: React.FC<GridProps> = ({
    children,
    columns = 'auto',
    gap = 'md',
    className = '',
}) => {
    const classes = [
        'grid',
        `grid--cols-${columns}`,
        `grid--gap-${gap}`,
        className,
    ].filter(Boolean).join(' ');

    return <div className={classes}>{children}</div>;
};