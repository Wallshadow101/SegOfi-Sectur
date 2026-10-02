import type { ReactNode } from "react";
import type { LucideIcon } from "lucide-react";

interface PageHeaderProps {
  icon: LucideIcon;
  title: string;
  description?: string;
  action?: ReactNode;
}

export default function PageHeader({ icon: Icon, title, description, action }: PageHeaderProps) {
  return (
    <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-guinda-dark via-guinda to-guinda-light px-6 py-5 text-white shadow-md animate-in fade-in slide-in-from-top-2 duration-300">
      <span className="pointer-events-none absolute -right-8 -top-10 h-40 w-40 rounded-full bg-white/10" />
      <span className="pointer-events-none absolute right-28 -bottom-14 h-32 w-32 rounded-full bg-dorado/25" />
      <div className="relative flex flex-wrap items-center justify-between gap-4">
        <div className="flex items-center gap-4">
          <span className="h-12 w-12 shrink-0 rounded-full bg-dorado flex items-center justify-center shadow-md">
            <Icon size={22} />
          </span>
          <div>
            <h1 className="text-xl font-bold leading-tight">{title}</h1>
            {description && <p className="text-sm text-white/75 mt-0.5">{description}</p>}
          </div>
        </div>
        {action && <div className="flex items-center gap-2">{action}</div>}
      </div>
    </div>
  );
}
