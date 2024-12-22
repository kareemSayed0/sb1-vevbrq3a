import React, { useState, useCallback, useEffect } from 'react';

interface NumberInputProps {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder?: string;
  className?: string;
  dir?: 'rtl' | 'ltr';
}

export function NumberInput({
  value,
  onChange,
  label,
  placeholder = '',
  className = '',
  dir = 'rtl'
}: NumberInputProps) {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    if (value !== localValue) {
      setLocalValue(value);
    }
  }, [value]);

  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value.replace(/[^\d]/g, '');
    setLocalValue(newValue);
    onChange(newValue);
  }, [onChange]);

  const handleBlur = useCallback(() => {
    const numericValue = localValue.replace(/[^\d]/g, '');
    if (numericValue) {
      const formattedValue = Number(numericValue).toLocaleString('en-US');
      setLocalValue(formattedValue);
    }
  }, [localValue]);

  return (
    <div className="space-y-2">
      <label className="block text-gray-700 dark:text-gray-300 font-medium">
        {label}
      </label>
      <input
        type="text"
        inputMode="numeric"
        value={localValue}
        onChange={handleChange}
        onBlur={handleBlur}
        placeholder={placeholder}
        dir={dir}
        className={`w-full p-3 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-emerald-400 focus:outline-none dark:bg-gray-700 dark:text-white ${className}`}
      />
    </div>
  );
}