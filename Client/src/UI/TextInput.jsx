import React from 'react';

const TextInput = ({
  label,
  name,
  value,
  onChange,
  error,
  type = 'text',
  placeholder = ''
}) => {
  return (
    <div className="mb-4 w-full">
      {/* Label */}
      <label
        htmlFor={name}
        className="block text-sm font-medium text-slate-200 mb-1"
      >
        {label}
      </label>

      {/* Input */}
      <input
        id={name}
        name={name}
        type={type}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`
          w-full px-3 py-2 rounded-md bg-white/10 backdrop-blur-xl
          text-slate-100 placeholder-slate-400 
          border 
          ${error ? 'border-red-500' : 'border-white/20'}
          focus:outline-none focus:ring-2
          ${error ? 'focus:ring-red-500' : 'focus:ring-amber-400'}
          transition-all
        `}
      />

      {/* Error text */}
      {error && (
        <p className="mt-1 text-sm text-red-500">
          {error}
        </p>
      )}
    </div>
  );
};

export default TextInput;
