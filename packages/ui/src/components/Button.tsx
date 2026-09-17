import React, { ButtonHTMLAttributes } from 'react';
import { Icon } from './Icon';

export interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'amber' | 'outline' | 'ghost' | 'danger';
  size?: 'sm' | 'md' | 'lg';
  iconLeft?: string;
  iconRight?: string;
  isLoading?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  iconLeft,
  iconRight,
  isLoading = false,
  className = '',
  disabled,
  ...props
}) => {
  const baseClasses =
    'inline-flex items-center justify-center font-medium rounded-lg transition-all duration-200 select-none focus:outline-none focus:ring-2 focus:ring-offset-1 disabled:opacity-50 disabled:cursor-not-allowed';

  const sizeClasses = {
    sm: 'px-3 py-1.5 text-xs gap-1.5 h-9',
    md: 'px-4 py-2 text-sm gap-2 h-11',
    lg: 'px-6 py-3 text-base gap-2.5 h-13 font-semibold'
  }[size];

  const variantClasses = {
    primary:
      'bg-primary-container text-on-primary hover:bg-primary hover:-translate-y-0.5 active:translate-y-0 shadow-sm focus:ring-primary',
    secondary:
      'bg-white text-primary border border-primary/30 hover:bg-emerald-50/50 hover:border-primary active:bg-emerald-100/50 focus:ring-primary',
    amber:
      'bg-secondary text-white hover:bg-amber-700 hover:-translate-y-0.5 shadow-sm focus:ring-secondary',
    outline:
      'bg-transparent border border-outline-variant/60 text-on-surface hover:bg-surface-container-high focus:ring-primary',
    ghost:
      'bg-transparent text-on-surface hover:bg-surface-container-high focus:ring-primary',
    danger:
      'bg-rose-600 text-white hover:bg-rose-700 shadow-sm focus:ring-rose-500'
  }[variant];

  return (
    <button
      className={`${baseClasses} ${sizeClasses} ${variantClasses} ${className}`}
      disabled={disabled || isLoading}
      {...props}
    >
      {isLoading ? (
        <span className="w-4 h-4 border-2 border-current border-t-transparent rounded-full animate-spin mr-1" />
      ) : (
        iconLeft && <Icon name={iconLeft} size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
      )}
      {children}
      {!isLoading && iconRight && (
        <Icon name={iconRight} size={size === 'sm' ? 16 : size === 'lg' ? 22 : 18} />
      )}
    </button>
  );
};
