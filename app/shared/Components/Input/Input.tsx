'use client';

import React from 'react';
import styles from './styles/input.module.css';

interface InputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  placeholder?: string;
  type?: string;
  size?: 'small' | 'medium' | 'large';
  variant?: 'default' | 'outline' | 'filled';
  disabled?: boolean;
  className?: string;
}

const Input: React.FC<InputProps> = ({
  value,
  onChange,
  placeholder = '',
  type = 'text',
  size = 'medium',
  variant = 'default',
  disabled = false,
  className = '',
}) => {
  return (
    <input
      className={`${styles.input} ${styles[size]} ${styles[variant]} ${className}`}
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      type={type}
      disabled={disabled}
    />
  );
};

export default Input;