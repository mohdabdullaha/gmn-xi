import React, { ChangeEvent, ComponentType } from 'react';

// ── Types ─────────────────────────────────────────────────────
interface InputProps {
  label?: string;
  type?: string;
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  name?: string;
  required?: boolean;
  className?: string;
  error?: string | null;
  icon?: ComponentType<{ size: number }>;
  textarea?: boolean;
  disabled?: boolean;
}

const Input: React.FC<InputProps> = ({
  label,
  type = 'text',
  value,
  onChange,
  placeholder,
  name,
  required = false,
  className = '',
  error,
  icon: Icon,
  textarea = false,
  disabled,
}) => {
  const inputClasses = `w-full ${
    Icon ? 'pl-11' : 'px-4'
  } py-3 bg-gray-50 border ${
    error ? 'border-red-500' : 'border-gray-200'
  } rounded-xl focus:ring-2 focus:ring-green/20 focus:border-green outline-none transition-all`;

  return (
    <div className={`space-y-1 ${className}`}>
      {label && (
        <label className="text-xs font-bold text-navy/40 uppercase tracking-widest ml-1">
          {label} {required && <span className="text-red-500">*</span>}
        </label>
      )}
      <div className="relative">
        {Icon && (
          <div className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
            <Icon size={18} />
          </div>
        )}
        {textarea ? (
          <textarea
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={`${inputClasses} min-h-[100px] resize-none`}
          />
        ) : (
          <input
            type={type}
            name={name}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            required={required}
            disabled={disabled}
            className={inputClasses}
          />
        )}
      </div>
      {error && <p className="text-xs text-red-500 ml-1">{error}</p>}
    </div>
  );
};

export default Input;
