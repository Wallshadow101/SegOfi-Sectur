import { useEffect, useState } from "react";

interface BarChartDatum {
  label: string;
  value: number;
  color?: string; // clase Tailwind, ej. "bg-blue-500"
}

interface BarChartProps {
  data: BarChartDatum[];
  height?: number;
}

const PALETA_DEFECTO = ["bg-blue-500", "bg-dorado", "bg-amber-500", "bg-emerald-500", "bg-guinda"];

export default function BarChart({ data, height = 200 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);
  const [montado, setMontado] = useState(false);

  useEffect(() => {
    const id = requestAnimationFrame(() => setMontado(true));
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <div className="flex items-end gap-1.5 sm:gap-2.5" style={{ height }}>
      {data.map((d, i) => {
        const alturaPct = (d.value / max) * 100;
        const color = d.color ?? PALETA_DEFECTO[i % PALETA_DEFECTO.length];
        return (
          <div
            key={d.label}
            title={`${d.label}: ${d.value}`}
            className="group flex-1 flex flex-col items-center justify-end gap-1.5 h-full cursor-default"
          >
            <span className="text-xs font-bold text-texto transition-transform group-hover:-translate-y-0.5">{d.value}</span>
            <div className="w-full flex items-end justify-center flex-1 rounded-lg bg-fondo/40 group-hover:bg-fondo/70 transition-colors px-1 pt-1.5">
              <div
                className={`w-full max-w-10 sm:max-w-12 rounded-t-md ${color} shadow-sm transition-all duration-700 ease-out group-hover:brightness-110`}
                style={{
                  height: montado ? `${alturaPct}%` : "0%",
                  minHeight: montado && d.value > 0 ? 6 : 0,
                  transitionDelay: `${i * 80}ms`,
                }}
              />
            </div>
            <span className="text-[10px] sm:text-[11px] text-texto-secundario text-center leading-tight">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
