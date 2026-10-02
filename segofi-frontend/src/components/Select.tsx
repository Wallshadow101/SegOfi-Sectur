import type { SelectHTMLAttributes } from "react";

interface Option {
  value: string;
  label: string;
}

interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
  label: string;
  options: Option[];
  placeholder?: string;
}

export default function Select({ label, options, placeholder, id, className = "", value, ...rest }: SelectProps) {
  const selectId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={selectId} className="text-sm font-medium text-texto">
        {label}
      </label>
      <select
        id={selectId}
        value={value}
        defaultValue={value === undefined ? "" : undefined}
        className={`h-12 w-full rounded-lg border border-borde bg-white px-4 text-base shadow-sm
          text-texto transition-all duration-150 hover:border-guinda/40 cursor-pointer
          focus:outline-none focus:ring-2 focus:ring-guinda/40 focus:border-guinda focus:shadow-md
          disabled:bg-fondo/50 disabled:text-texto-secundario disabled:cursor-not-allowed disabled:hover:border-borde ${className}`}
        {...rest}
      >
        {placeholder && (
          <option value="" disabled>
            {placeholder}
          </option>
        )}
        {options.map((opt) => (
          <option key={opt.value} value={opt.value}>
            {opt.label}
          </option>
        ))}
      </select>
    </div>
  );
}
