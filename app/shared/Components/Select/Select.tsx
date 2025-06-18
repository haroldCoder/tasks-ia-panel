import React, { useState } from 'react';
import styles from "./styles/select.module.css"
import { SelectOption } from '../../interfaces/selectOption';

interface SelectProps {
  options: SelectOption[];
  defaultValue?: string;
  onChange: (value: string) => void;
  label?: string;
  id: string;
  className?: string;
  disabled?: boolean;
  defaultOption?: string
}

const Select: React.FC<SelectProps> = ({
  options,
  defaultValue = '',
  onChange,
  label,
  id,
  className = '',
  disabled = false,
  defaultOption = "Select a option"
}) => {
  const [selectedValue, setSelectedValue] = useState(defaultValue);

  const handleChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value;
    setSelectedValue(value);
    onChange(value);
  };

  return (
    <div className={`flex flex-col ${className}`}>
      {label && (
        <label
          htmlFor={id}
          className={styles.label}
        >
          {label}
        </label>
      )}
      <select
        id={id}
        value={selectedValue}
        onChange={handleChange}
        disabled={disabled}
        className={`
          px-3 py-2 border border-gray-300 rounded-md
          focus:outline-none focus:ring-2 focus:ring-blue-500
          bg-white text-gray-900
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
        `}
      >
        <option value="" disabled>
          {defaultOption}
        </option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Select;