import { useMemo, useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import DataTable, { type Column } from "../../components/DataTable";
import { OFICIOS_DEMO } from "../../Data/oficio";
import { FileDown, FileSpreadsheet, FileStack, Clock3, CheckCircle2, Archive } from "lucide-react";

interface RegistroAuditoria {
  usuario: string;
  accion: string;
  documento: string;
  fecha: string;
}

type Periodo = "Semanal" | "Mensual" | "Anual";

const REGISTROS: RegistroAuditoria[] = OFICIOS_DEMO.flatMap((o) =>
  o.seguimiento.map((ev) => ({ usuario: ev.autor, accion: ev.accion, documento: o.numero, fecha: ev.fecha }))
);

// "dd/mm/yyyy hh:mm" -> Date
function parseFecha(f: string): Date {
  const [fecha, hora] = f.split(" ");
  const [d, m, y] = fecha.split("/").map(Number);
  const [hh, mm] = (hora ?? "00:00").split(":").map(Number);
  return new Date(y, m - 1, d, hh, mm);
}

function aISO(d: Date): string {
  return d.toISOString().slice(0, 10);
}

const columns: Column<RegistroAuditoria>[] = [
  { header: "Usuario", render: (r) => r.usuario },
  { header: "Acción", render: (r) => r.accion },
  { header: "Documento", render: (r) => <span className="font-medium">{r.documento}</span> },
  { header: "Fecha", render: (r) => r.fecha },
];

const ESTADISTICAS = [
  { label: "Total de oficios", valor: OFICIOS_DEMO.length, icon: FileStack, color: "text-guinda" },
  {
    label: "Pendientes",
    valor: OFICIOS_DEMO.filter((o) => ["Recibido", "Turnado", "En seguimiento"].includes(o.estado)).length,
    icon: Clock3,
    color: "text-amber-600",
  },
  { label: "Respondidos", valor: OFICIOS_DEMO.filter((o) => o.estado === "Respondido").length, icon: CheckCircle2, color: "text-emerald-600" },
  { label: "Cerrados", valor: OFICIOS_DEMO.filter((o) => o.estado === "Cerrado").length, icon: Archive, color: "text-texto-secundario" },
];

export default function Reportes() {
  const [periodo, setPeriodo] = useState<Periodo | null>(null);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");

  const seleccionarPeriodo = (p: Periodo) => {
    const hoy = new Date();
    let inicio = new Date(hoy);
    if (p === "Semanal") {
      inicio.setDate(hoy.getDate() - hoy.getDay());
    } else if (p === "Mensual") {
      inicio = new Date(hoy.getFullYear(), hoy.getMonth(), 1);
    } else {
      inicio = new Date(hoy.getFullYear(), 0, 1);
    }
    setPeriodo(p);
    setDesde(aISO(inicio));
    setHasta(aISO(hoy));
  };

  const filas = useMemo(() => {
    if (!desde && !hasta) return REGISTROS;
    return REGISTROS.filter((r) => {
      const f = parseFecha(r.fecha);
      if (desde && f < new Date(desde)) return false;
      if (hasta && f > new Date(hasta + "T23:59:59")) return false;
      return true;
    });
  }, [desde, hasta]);

  const exportarExcel = () => {
    const encabezado = "Usuario,Acción,Documento,Fecha\n";
    const cuerpo = filas.map((r) => `"${r.usuario}","${r.accion}","${r.documento}","${r.fecha}"`).join("\n");
    const blob = new Blob([encabezado + cuerpo], { type: "text/csv;charset=utf-8;" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-auditoria.csv";
    a.click();
    URL.revokeObjectURL(url);
  };

  const exportarPdf = () => window.print();

  return (
    <div className="flex flex-col gap-6">
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {ESTADISTICAS.map(({ label, valor, icon: Icon, color }) => (
          <Card key={label}>
            <div className="flex items-center gap-3">
              <span className={`h-10 w-10 rounded-full bg-fondo flex items-center justify-center ${color}`}>
                <Icon size={20} />
              </span>
              <div>
                <p className="text-xl font-bold text-texto">{valor}</p>
                <p className="text-xs text-texto-secundario">{label}</p>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Card
        title="Generar reporte de auditoría"
        action={
          <div className="flex gap-2">
            <Button icon={<FileSpreadsheet size={18} />} variant="secondary" onClick={exportarExcel}>
              Excel
            </Button>
            <Button icon={<FileDown size={18} />} variant="outline" onClick={exportarPdf}>
              PDF
            </Button>
          </div>
        }
      >
        <div className="flex flex-wrap gap-2 mb-4">
          {(["Semanal", "Mensual", "Anual"] as Periodo[]).map((p) => (
            <button
              key={p}
              onClick={() => seleccionarPeriodo(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
                periodo === p
                  ? "bg-guinda text-white border-guinda"
                  : "bg-white text-texto-secundario border-borde hover:border-guinda"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-5">
          <Input label="Desde" type="date" value={desde} onChange={(e) => { setPeriodo(null); setDesde(e.target.value); }} />
          <Input label="Hasta" type="date" value={hasta} onChange={(e) => { setPeriodo(null); setHasta(e.target.value); }} />
          {(desde || hasta) && (
            <Button variant="outline" onClick={() => { setPeriodo(null); setDesde(""); setHasta(""); }}>
              Limpiar
            </Button>
          )}
        </div>

        <DataTable columns={columns} rows={filas} emptyMessage="No hay registros en el rango seleccionado." />
      </Card>
    </div>
  );
}
