import React, { useState } from 'react';

const PasswordInput = ({
  label,
  name,
  value,
  onChange,
  error,
  placeholder = ''
}) => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="mb-4 w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-200 mb-1"
      >
        {label}
      </label>

      <div className="relative">
        {/* Input */}
        <input
          id={name}
          name={name}
          type={showPassword ? 'text' : 'password'}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          className={`
            w-full px-3 py-2 pr-16 rounded-md
            bg-white/10 backdrop-blur-xl
            text-slate-100 placeholder-slate-400
            border
            ${error ? 'border-red-500' : 'border-white/20'}
            focus:outline-none focus:ring-2
            ${error ? 'focus:ring-red-500' : 'focus:ring-amber-400'}
            transition-all
          `}
        />

        {/* Toggle Password (much more visible now) */}
        <button
          type="button"
          onClick={() => setShowPassword((prev) => !prev)}
          className="absolute inset-y-0 right-0 pr-3 pl-2 flex items-center gap-1 text-amber-300 hover:text-amber-200 text-xs font-medium uppercase tracking-wide transition"
        >
          {/* Icon */}
          {showPassword ? (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 
                0-8.268-2.943-9.543-7a9.97 9.97 0 
                011.563-3.029m5.858.908a3 3 0 114.243 
                4.243M9.878 9.878l4.242 4.242M9.878 
                9.878L3 3m6.878 6.878L21 21"
              />
            </svg>
          ) : (
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12a3 3 0 11-6 0 3 3 
                0 016 0z"
              />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M2.458 12C3.732 7.943 7.523 5 
                12 5c4.478 0 8.268 2.943 9.542 
                7-1.274 4.057-5.064 7-9.542 
                7-4.477 0-8.268-2.943-9.542-7z"
              />
            </svg>
          )}

          {/* Text label so it's clearly visible */}
          <span>{showPassword ? 'Hide' : 'Show'}</span>
        </button>
      </div>

      {/* Error Message */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default PasswordInput;
