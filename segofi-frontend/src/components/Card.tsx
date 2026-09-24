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
    <div className={`bg-white rounded-2xl border border-borde shadow-sm ${className}`}>
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
