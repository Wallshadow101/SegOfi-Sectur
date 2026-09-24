export type EstadoOficio = "Recibido" | "Turnado" | "En seguimiento" | "Respondido" | "Cerrado";

const estiloPorEstado: Record<EstadoOficio, string> = {
  Recibido: "bg-blue-50 text-blue-700 border-blue-200",
  Turnado: "bg-dorado/10 text-dorado-light border-dorado/30",
  "En seguimiento": "bg-amber-50 text-amber-700 border-amber-200",
  Respondido: "bg-emerald-50 text-emerald-700 border-emerald-200",
  Cerrado: "bg-gray-100 text-gray-600 border-gray-300",
};

export default function StatusBadge({ estado }: { estado: EstadoOficio }) {
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-medium border ${estiloPorEstado[estado]}`}
    >
      {estado}
    </span>
  );
}
