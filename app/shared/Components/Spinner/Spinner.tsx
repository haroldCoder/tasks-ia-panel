import React from "react";

interface SpinnerProps {
  size?: "sm" | "md" | "lg" | "xl";
  color?: string;
  className?: string;
}

export const Spinner: React.FC<SpinnerProps> = ({
  size = "md",
  color = "text-blue-600",
  className
}) => {
  const sizeClasses = {
    sm: "w-4 h-4",
    md: "w-8 h-8",
    lg: "w-12 h-12",
    xl: "w-16 h-16"
  };

  return (
    <div className="flex justify-center items-center">
      <div
        className={`${className}
          ${sizeClasses[size]}
          ${color}
          animate-spin
          rounded-full
          border-4
          border-t-transparent
          border-solid
        `}
      ></div>
    </div>
  );
};
