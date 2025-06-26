"use client";

import React from "react";
import styles from "./styles/button.module.css";

interface ButtonProps {
  children: any;
  onClick?: () => void;
  size?: "small" | "medium" | "large";
  variant?: "primary" | "secondary" | "outline";
  disabled?: boolean;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({
  children,
  onClick,
  size,
  variant,
  disabled = false,
  className,
}) => {
  return (
    <button
      className={`${styles.button} ${className}`}
      onClick={(e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        onClick && onClick();
        e.stopPropagation();
      }}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;
