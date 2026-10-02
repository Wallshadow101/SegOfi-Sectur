import type { InputHTMLAttributes, ReactNode } from "react";

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  label: string;
  helperText?: string;
  icon?: ReactNode;
  rightSlot?: ReactNode;
}

export default function Input({ label, helperText, icon, rightSlot, id, className = "", ...rest }: InputProps) {
  const inputId = id ?? label.toLowerCase().replace(/\s+/g, "-");
  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label htmlFor={inputId} className="text-sm font-medium text-texto">
        {label}
      </label>
      <div className="relative group">
        {icon && (
          <span className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario pointer-events-none transition-colors group-focus-within:text-guinda">
            {icon}
          </span>
        )}
        <input
          id={inputId}
          className={`h-12 w-full rounded-lg border border-borde bg-white px-4 text-base shadow-sm
            text-texto placeholder:text-texto-secundario transition-all duration-150
            hover:border-guinda/40
            focus:outline-none focus:ring-2 focus:ring-guinda/40 focus:border-guinda focus:shadow-md
            disabled:bg-fondo/50 disabled:text-texto-secundario disabled:cursor-not-allowed disabled:hover:border-borde
            ${icon ? "pl-11" : ""} ${rightSlot ? "pr-12" : ""} ${className}`}
          {...rest}
        />
        {rightSlot && <div className="absolute right-2 top-1/2 -translate-y-1/2">{rightSlot}</div>}
      </div>
      {helperText && <span className="text-xs text-texto-secundario">{helperText}</span>}
    </div>
  );
}
