import React from 'react';
import './Layout.css';

export interface CenterProps {
    children: React.ReactNode;
    maxWidth?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
    className?: string;
    textCenter?: boolean;
}

export const Center: React.FC<CenterProps> = ({
    children,
    maxWidth = 'md',
    className = '',
    textCenter = false,
}) => {
    const classes = [
        'center',
        `center--max-${maxWidth}`,
        textCenter && 'center--text',
        className,
    ].filter(Boolean).join(' ');

    return <div className={classes}>{children}</div>;
};