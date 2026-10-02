import type { ButtonHTMLAttributes, ReactNode } from "react";

type Variant = "primary" | "secondary" | "danger" | "outline" | "light" | "outlineLight";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  icon?: ReactNode;
  children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-guinda hover:bg-guinda-dark text-white shadow-sm hover:shadow-md hover:-translate-y-px",
  secondary: "bg-dorado hover:bg-dorado-light text-white shadow-sm hover:shadow-md hover:-translate-y-px",
  danger: "bg-red-700 hover:bg-red-800 text-white shadow-sm hover:shadow-md hover:-translate-y-px",
  outline: "bg-transparent border border-guinda text-guinda hover:bg-guinda/5",
  light: "bg-white text-guinda hover:bg-white/90 shadow-sm hover:shadow-md hover:-translate-y-px",
  outlineLight: "bg-transparent border border-white/60 text-white hover:bg-white/10",
};

export default function Button({
  variant = "primary",
  icon,
  children,
  className = "",
  ...rest
}: ButtonProps) {
  return (
    <button
      className={`inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg font-medium text-base
        transition-all duration-150 ease-out active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed disabled:active:scale-100
        ${variantClasses[variant]} ${className}`}
      {...rest}
    >
      {icon}
      {children}
    </button>
  );
}
