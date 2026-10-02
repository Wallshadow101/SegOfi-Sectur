import type { ReactNode } from "react";

interface CardProps {
  title?: string;
  action?: ReactNode;
  children: ReactNode;
  className?: string;
  bodyClassName?: string;
}

export default function Card({ title, action, children, className = "", bodyClassName = "p-6" }: CardProps) {
  return (
    <div className={`relative bg-white rounded-2xl border border-borde shadow-sm overflow-hidden ${className}`}>
      <div className="h-1 bg-gradient-to-r from-guinda via-guinda-light to-dorado" />
      {(title || action) && (
        <div className="flex items-center justify-between px-6 py-4 border-b border-borde">
          {title && <h2 className="text-lg font-semibold text-guinda">{title}</h2>}
          {action}
        </div>
      )}
      <div className={bodyClassName}>{children}</div>
    </div>
  );
}
