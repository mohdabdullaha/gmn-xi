"use client";
import React, { ReactNode, ComponentType, MouseEvent } from 'react';

// ── Types ─────────────────────────────────────────────────────
interface ButtonProps {
  children: ReactNode;
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'danger' | 'ghost' | 'outline';
  className?: string;
  disabled?: boolean;
  icon?: ComponentType<{ size: number }>;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  type = 'button',
  variant = 'primary',
  className = '',
  disabled = false,
  icon: Icon,
  fullWidth = false,
}) => {
  const baseStyles =
    'flex items-center justify-center gap-2 font-bold transition-all active:scale-95 disabled:opacity-50 disabled:active:scale-100 disabled:cursor-not-allowed';

  const variants = {
    primary: 'bg-navy text-white hover:bg-navy/90 shadow-lg shadow-navy/20',
    secondary: 'bg-green text-white hover:bg-green-dark shadow-lg shadow-green/20',
    danger: 'bg-red-50 text-red-600 hover:bg-red-600 hover:text-white border border-red-100',
    ghost: 'text-navy/60 hover:text-navy hover:bg-gray-100',
    outline: 'border-2 border-navy text-navy hover:bg-navy hover:text-white',
  };

  const sizes = {
    sm: 'px-4 py-2 text-sm rounded-lg',
    md: 'px-6 py-3 rounded-xl',
    lg: 'px-8 py-4 text-lg rounded-2xl',
  };

  const variantStyle = variants[variant] || variants.primary;
  const widthStyle = fullWidth ? 'w-full' : '';

  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={`${baseStyles} ${variantStyle} ${sizes.md} ${widthStyle} ${className}`}
    >
      {Icon && <Icon size={18} />}
      {children}
    </button>
  );
};

export default Button;
