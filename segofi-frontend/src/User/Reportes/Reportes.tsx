import { useMemo, useState } from "react";
import {
  FileDown,
  FileSpreadsheet,
  FileStack,
  Clock3,
  CheckCircle2,
  Archive,
  BarChart3,
  CalendarRange,
} from "lucide-react";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import StatCard from "../../components/StatCard";
import Input from "../../components/Input";
import Button from "../../components/Button";
import Avatar from "../../components/Avatar";
import Toast from "../../components/Toast";
import DataTable, { type Column } from "../../components/DataTable";
import { OFICIOS_DEMO } from "../../Data/oficio";

interface RegistroAuditoria {
  usuario: string;
  accion: string;
  documento: string;
  fecha: string;
}

type Periodo = "Semanal" | "Mensual" | "Anual";

const REGISTROS: RegistroAuditoria[] = OFICIOS_DEMO.flatMap((o) =>
  o.seguimiento.map((ev) => ({
    usuario: ev.autor,
    accion: ev.accion,
    documento: o.numero,
    fecha: ev.fecha,
  })),
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
  {
    header: "Usuario",
    render: (r) => (
      <span className="inline-flex items-center gap-2">
        <Avatar nombre={r.usuario} size={28} />
        {r.usuario}
      </span>
    ),
  },
  { header: "Acción", render: (r) => r.accion },
  {
    header: "Documento",
    render: (r) => <span className="font-medium">{r.documento}</span>,
  },
  { header: "Fecha", render: (r) => r.fecha },
];

export default function Reportes() {
  const [periodo, setPeriodo] = useState<Periodo | null>(null);
  const [desde, setDesde] = useState("");
  const [hasta, setHasta] = useState("");
  const [aviso, setAviso] = useState<string | null>(null);

  const pendientes = OFICIOS_DEMO.filter((o) =>
    ["Recibido", "Turnado", "En seguimiento"].includes(o.estado),
  ).length;
  const respondidos = OFICIOS_DEMO.filter(
    (o) => o.estado === "Respondido",
  ).length;
  const cerrados = OFICIOS_DEMO.filter((o) => o.estado === "Cerrado").length;

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
    const cuerpo = filas
      .map((r) => `"${r.usuario}","${r.accion}","${r.documento}","${r.fecha}"`)
      .join("\n");
    const blob = new Blob([encabezado + cuerpo], {
      type: "text/csv;charset=utf-8;",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "reporte-auditoria.csv";
    a.click();
    URL.revokeObjectURL(url);
    setAviso("Reporte descargado");
  };

  const exportarPdf = () => window.print();

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        icon={BarChart3}
        title="Generar reporte"
        description="Auditoría de acciones por periodo, con exportación a Excel y PDF"
        action={
          <>
            <Button
              variant="secondary"
              icon={<FileSpreadsheet size={18} />}
              onClick={exportarExcel}
            >
              Excel
            </Button>
            <Button
              variant="outlineLight"
              icon={<FileDown size={18} />}
              onClick={exportarPdf}
            >
              PDF
            </Button>
          </>
        }
      />

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <StatCard
          label="Total de oficios"
          value={OFICIOS_DEMO.length}
          icon={FileStack}
          tone="guinda"
        />
        <StatCard
          label="Pendientes"
          value={pendientes}
          icon={Clock3}
          tone="amber"
        />
        <StatCard
          label="Respondidos"
          value={respondidos}
          icon={CheckCircle2}
          tone="emerald"
        />
        <StatCard
          label="Cerrados"
          value={cerrados}
          icon={Archive}
          tone="gray"
        />
      </div>

      <Card>
        <div className="flex flex-wrap items-center gap-2 mb-4">
          <CalendarRange size={18} className="text-guinda mr-1" />
          {(["Semanal", "Mensual", "Anual"] as Periodo[]).map((p) => (
            <button
              key={p}
              onClick={() => seleccionarPeriodo(p)}
              className={`px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                periodo === p
                  ? "bg-guinda text-white border-guinda shadow-sm"
                  : "bg-white text-texto-secundario border-borde hover:border-guinda hover:text-guinda"
              }`}
            >
              {p}
            </button>
          ))}
        </div>

        <div className="flex flex-wrap items-end gap-4 mb-5">
          <div className="w-44">
            <Input
              label="Desde"
              type="date"
              value={desde}
              onChange={(e) => {
                setPeriodo(null);
                setDesde(e.target.value);
              }}
            />
          </div>
          <div className="w-44">
            <Input
              label="Hasta"
              type="date"
              value={hasta}
              onChange={(e) => {
                setPeriodo(null);
                setHasta(e.target.value);
              }}
            />
          </div>
          {(desde || hasta) && (
            <Button
              variant="outline"
              onClick={() => {
                setPeriodo(null);
                setDesde("");
                setHasta("");
              }}
            >
              Limpiar
            </Button>
          )}
          <span className="ml-auto text-sm text-texto-secundario pb-3">
            {filas.length} registros
          </span>
        </div>

        <DataTable
          columns={columns}
          rows={filas}
          emptyMessage="No hay registros en el rango seleccionado."
        />
      </Card>

      <Toast mensaje={aviso} onClose={() => setAviso(null)} />
    </div>
  );
}

