import type { LucideIcon } from "lucide-react";
import AnimatedNumber from "./AnimatedNumber";

type Tono = "guinda" | "amber" | "emerald" | "blue" | "dorado" | "gray";

const TONOS: Record<Tono, { barra: string; icono: string }> = {
  guinda: { barra: "bg-guinda", icono: "bg-guinda/10 text-guinda" },
  amber: { barra: "bg-amber-500", icono: "bg-amber-100 text-amber-600" },
  emerald: { barra: "bg-emerald-500", icono: "bg-emerald-100 text-emerald-600" },
  blue: { barra: "bg-blue-500", icono: "bg-blue-100 text-blue-600" },
  dorado: { barra: "bg-dorado", icono: "bg-dorado/15 text-dorado" },
  gray: { barra: "bg-gray-400", icono: "bg-gray-100 text-gray-600" },
};

interface StatCardProps {
  label: string;
  value: number;
  suffix?: string;
  icon: LucideIcon;
  tone?: Tono;
}

export default function StatCard({ label, value, suffix, icon: Icon, tone = "guinda" }: StatCardProps) {
  const t = TONOS[tone];
  return (
    <div className="group relative overflow-hidden rounded-xl bg-white border border-borde px-4 py-3 shadow-sm hover:shadow-md hover:-translate-y-0.5 transition-all duration-200">
      <span className={`absolute left-0 top-0 h-full w-1 ${t.barra}`} />
      <div className="flex items-center gap-3 pl-1">
        <span
          className={`h-10 w-10 shrink-0 rounded-full flex items-center justify-center transition-transform duration-200 group-hover:scale-110 group-hover:rotate-6 ${t.icono}`}
        >
          <Icon size={18} />
        </span>
        <div>
          <p className="text-xl font-bold text-texto leading-none">
            <AnimatedNumber value={value} suffix={suffix} />
          </p>
          <p className="text-xs text-texto-secundario mt-0.5">{label}</p>
        </div>
      </div>
    </div>
  );
}
