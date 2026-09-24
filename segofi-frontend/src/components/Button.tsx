import type { ButtonHTMLAttributes, ReactNode} from 'react';

type Variant = 'primary' | 'secondary' | 'danger' | "outline";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    variant?: Variant;
    icon?: ReactNode;
    children: ReactNode;
}

const variantClasses: Record<Variant, string> = {
  primary: "bg-guinda hover:bg-guinda-dark text-white",
  secondary: "bg-dorado hover:bg-dorado-light text-white",
  danger: "bg-red-700 hover:bg-red-800 text-white",
  outline:
    "bg-transparent border border-guinda text-guinda hover:bg-guinda/5",
};

export default function Button({
  variant = "primary",
  icon,
  children,
  className = "",
   ...rest
}: ButtonProps) {
    return(
        <button
            className={`inline-flex items-center justify-center gap-2 h-12 px-5 rounded-lg font-medium text-base
                transition-colors diabled:opacity-50 disabled:cursor-not-allowed
                ${variantClasses[variant]} ${className}`}
            {...rest}
        >
            {icon}
            {children}
        </button>
    );
}