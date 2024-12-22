import React from 'react';
import { useLanguageStore } from '../../store/languageStore';

interface FormInputProps {
  id: string;
  name: string;
  type: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  label: string;
  error?: string;
  dir?: 'rtl' | 'ltr';
  placeholder?: string;
}

export function FormInput({
  id,
  name,
  type,
  value,
  onChange,
  label,
  error,
  dir,
  placeholder
}: FormInputProps) {
  const { language } = useLanguageStore();
  const inputDir = dir || (language === 'ar' ? 'rtl' : 'ltr');

  return (
    <div>
      <label htmlFor={id} className="block text-sm font-medium text-gray-700 mb-1">
        {label}
      </label>
      <input
        type={type}
        id={id}
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full p-3 border rounded-lg focus:ring-2 focus:ring-emerald-400 focus:border-emerald-400 transition-colors ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
        dir={inputDir}
      />
      {error && (
        <p className="mt-1 text-sm text-red-600" dir={language === 'ar' ? 'rtl' : 'ltr'}>
          {error}
        </p>
      )}
    </div>
  );
}