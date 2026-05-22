import React from "react";

function TextAreaForm({
  label,
  placeholder,
  name,
  value,
  onChange,
  error,
  rows = 5,
}) {
  return (
    <div className="w-full">
      {label && (
        <label
          htmlFor={name}
          className="block mb-4 text-lg lg:text-xl font-bold text-(--color-heading-dark)"
        >
          {label}
        </label>
      )}

      <textarea
        id={name}
        name={name}
        rows={rows}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className={`w-full rounded-2xl border 
        border-(--color-primary)/50
        p-4 lg:p-4
        resize-none
        outline-none
        text-sm lg:text-base
        placeholder:text-(--color-primary-placeholder)
        focus:border-(--color-primary)
        transition
        
        ${error ? "border-(--color-error)" : ""}
        `}
      />

      {error && (
        <p className="text-(--color-error) text-sm mt-2">
          {error}
        </p>
      )}
    </div>
  );
}

export default TextAreaForm;
