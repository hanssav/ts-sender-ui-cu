import React from 'react';

interface InputFieldProps extends React.InputHTMLAttributes<HTMLInputElement> {
  label?: string;
  placeholder?: string;
  value: string;
  type?: 'text' | 'password' | 'email' | 'number' | 'tel' | 'url';
  large?: boolean;
  onChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => void;

  error?: string;
  helperText?: string;
  icon?: React.ReactNode;
  rows?: number; // For textarea when large is true
}

const InputField: React.FC<InputFieldProps> = ({
  // Required props
  label,
  placeholder,
  value,
  type = 'text',
  large = false,
  onChange,

  // Additional props
  error,
  helperText,
  icon,
  rows = 4,
  className = '',
  disabled = false,
  required = false,

  ...props
}) => {
  const baseClasses =
    'w-full px-4 py-3 bg-white dark:bg-gray-800 border rounded-lg text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200';

  const sizeClasses = large ? 'text-lg' : 'text-base';

  const disabledClasses = disabled ? 'opacity-50 cursor-not-allowed' : '';

  const borderClasses = error
    ? 'border-red-500 focus:ring-red-500'
    : 'border-gray-300 dark:border-gray-600';

  const inputClasses = `${baseClasses} ${sizeClasses} ${disabledClasses} ${borderClasses} ${icon ? 'pl-10' : ''} ${className}`;
  const textAreaClasses = `${baseClasses} ${sizeClasses} ${disabledClasses} ${borderClasses} resize-none ${className}`;

  return (
    <div className='w-full space-y-2'>
      {/* Label */}
      {label && (
        <label className='block text-sm font-medium text-gray-700 dark:text-gray-300'>
          {label}
          {required && <span className='ml-1 text-red-500'>*</span>}
        </label>
      )}

      {/* Input Container */}
      <div className='relative'>
        {icon && !large && (
          <div className='absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none'>
            <span className='text-gray-400 dark:text-gray-500'>{icon}</span>
          </div>
        )}

        {large ? (
          <textarea
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            rows={rows}
            className={`${textAreaClasses}`}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${label}-error`
                : helperText
                  ? `${label}-helper`
                  : undefined
            }
            {...(props as React.TextareaHTMLAttributes<HTMLTextAreaElement>)}
          />
        ) : (
          <input
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            disabled={disabled}
            required={required}
            className={inputClasses}
            aria-invalid={!!error}
            aria-describedby={
              error
                ? `${label}-error`
                : helperText
                  ? `${label}-helper`
                  : undefined
            }
            {...props}
          />
        )}
      </div>

      {/* Error Message */}
      {error && (
        <p
          id={`${label}-error`}
          className='text-sm text-red-600 dark:text-red-400'
          role='alert'
        >
          {error}
        </p>
      )}

      {/* Helper Text */}
      {helperText && !error && (
        <p
          id={`${label}-helper`}
          className='text-sm text-gray-500 dark:text-gray-400'
        >
          {helperText}
        </p>
      )}
    </div>
  );
};

export default InputField;
