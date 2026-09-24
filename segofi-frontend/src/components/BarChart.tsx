interface BarChartDatum {
  label: string;
  value: number;
}

interface BarChartProps {
  data: BarChartDatum[];
  height?: number;
}

export default function BarChart({ data, height = 180 }: BarChartProps) {
  const max = Math.max(...data.map((d) => d.value), 1);

  return (
    <div className="flex items-end gap-4" style={{ height }}>
      {data.map((d) => {
        const alturaPct = (d.value / max) * 100;
        return (
          <div key={d.label} className="flex-1 flex flex-col items-center justify-end gap-2 h-full">
            <span className="text-xs font-semibold text-texto">{d.value}</span>
            <div className="w-full flex items-end justify-center flex-1">
              <div
                className="w-8 sm:w-10 rounded-t-md bg-guinda transition-all duration-500"
                style={{ height: `${alturaPct}%`, minHeight: d.value > 0 ? 4 : 0 }}
              />
            </div>
            <span className="text-[11px] text-texto-secundario text-center leading-tight">{d.label}</span>
          </div>
        );
      })}
    </div>
  );
}
