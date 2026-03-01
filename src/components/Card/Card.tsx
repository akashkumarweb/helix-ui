import React from 'react';
import './Card.css';

export interface CardProps {
    children: React.ReactNode;
    variant?: 'default' | 'outlined' | 'ghost' | 'brutalist' | 'glow';
    padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
    radius?: 'none' | 'sm' | 'md' | 'lg';
    className?: string;
    onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({
    children,
    variant = 'default',
    padding = 'md',
    radius = 'md',
    className = '',
    onClick,
}) => {
    const classes = [
        'card',
        `card--${variant}`,
        `card--padding-${padding}`,
        `card--radius-${radius}`,
        onClick && 'card--clickable',
        className,
    ].filter(Boolean).join(' ');

    return (
        <div className={classes} onClick={onClick} role={onClick ? 'button' : undefined}>
            {children}
        </div>
    );
};

// Card sub-components for structure
export const CardHeader: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => (
    <div className={`card__header ${className}`}>{children}</div>
);

export const CardFooter: React.FC<{ children: React.ReactNode; className?: string }> = ({
    children,
    className = ''
}) => (
    <div className={`card__footer ${className}`}>{children}</div>
);

export const CardTitle: React.FC<{ children: React.ReactNode; as?: 'h1' | 'h2' | 'h3' | 'h4' }> = ({
    children,
    as: Component = 'h3'
}) => (
    <Component className="card__title">{children}</Component>
);

export const CardDescription: React.FC<{ children: React.ReactNode }> = ({ children }) => (
    <p className="card__description">{children}</p>
);