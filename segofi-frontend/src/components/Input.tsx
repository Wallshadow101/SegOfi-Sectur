import type { InputHTMLAttributes } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
}

export default function Input({ label, helperText, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-medium text-[--color-texto]">
        {label}
      </label>
      <input
        id={inputId}
        className={`h-12 w-full rounded-lg border border-borde bg-white px-4 text-base
          text-texto placeholder:text-texto-secundario
          focus:outline-none focus:ring-2 focus:ring-guinda/40 focus:border-guinda
          ${className}`}
        {...rest}
      />
      {helperText && <span className="text-xs text-texto-secundario">{helperText}</span>}
    </div>
  );
}
