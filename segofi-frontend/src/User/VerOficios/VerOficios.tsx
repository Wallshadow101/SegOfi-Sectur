import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FilePlus2, FolderOpen, Search, FileText } from "lucide-react";
import Card from "../../components/Card";
import PageHeader from "../../components/PageHeader";
import Input from "../../components/Input";
import DataTable, { type Column } from "../../components/DataTable";
import StatusBadge, { type EstadoOficio } from "../../components/StatusBadge";
import Button from "../../components/Button";
import DocumentPreviewModal from "../../components/DocumentPreviewModal";
import { OFICIOS_DEMO, type Oficio } from "../../Data/oficio";
import { useAuth } from "../../Guards/useAuth";
import { oficiosVisibles, tieneAccesoTotal } from "../../Guards/alcance";

const FILTROS: ("Todos" | EstadoOficio)[] = [
  "Todos",
  "Recibido",
  "Turnado",
  "En seguimiento",
  "Respondido",
  "Cerrado",
];

const columns: Column<Oficio>[] = [
  {
    header: "N° documento",
    render: (o) => (
      <span className="inline-flex items-center gap-2 font-medium">
        <span className="h-8 w-8 rounded-lg bg-guinda/10 text-guinda flex items-center justify-center">
          <FileText size={15} />
        </span>
        {o.numero}
      </span>
    ),
  },
  { header: "Asunto", render: (o) => o.asunto },
  { header: "Departamento", render: (o) => o.departamento },
  { header: "Fecha", render: (o) => o.fecha },
  { header: "Estado", render: (o) => <StatusBadge estado={o.estado} /> },
];

export default function VerOficios() {
  const navigate = useNavigate();
  const { usuario } = useAuth();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");
  const [busqueda, setBusqueda] = useState("");
  const [enPreview, setEnPreview] = useState<Oficio | null>(null);

  const alcance = oficiosVisibles(usuario, OFICIOS_DEMO);
  const esGlobal = tieneAccesoTotal(usuario);

  const cuenta = (f: (typeof FILTROS)[number]) =>
    f === "Todos"
      ? alcance.length
      : alcance.filter((o) => o.estado === f).length;

  const q = busqueda.trim().toLowerCase();
  const filas = alcance.filter(
    (o) =>
      (filtro === "Todos" || o.estado === filtro) &&
      (!q ||
        `${o.numero} ${o.asunto} ${o.departamento}`.toLowerCase().includes(q)),
  );

  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        icon={FolderOpen}
        title="Ver oficios"
        description={
          esGlobal
            ? "Consulta, filtra y revisa todos los documentos"
            : `Documentos de ${usuario?.dependencia} o turnados a ti`
        }
        action={
          esGlobal && (
            <Button
              variant="light"
              icon={<FilePlus2 size={18} />}
              onClick={() => navigate("/crear-oficio")}
            >
              Nuevo documento
            </Button>
          )
        }
      />

      <Card>
        <div className="max-w-md mb-4">
          <Input
            label="Buscar"
            icon={<Search size={18} />}
            placeholder="Número, asunto o departamento…"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          {FILTROS.map((f) => (
            <button
              key={f}
              onClick={() => setFiltro(f)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all ${
                filtro === f
                  ? "bg-guinda text-white border-guinda shadow-sm"
                  : "bg-white text-texto-secundario border-borde hover:border-guinda hover:text-guinda"
              }`}
            >
              {f}
              <span
                className={`min-w-5 rounded-full px-1.5 text-[11px] font-bold ${
                  filtro === f
                    ? "bg-white/25 text-white"
                    : "bg-guinda/10 text-guinda"
                }`}
              >
                {cuenta(f)}
              </span>
            </button>
          ))}
        </div>

        <DataTable
          columns={columns}
          rows={filas}
          onView={setEnPreview}
          emptyMessage="Ningún oficio coincide con tu búsqueda."
        />

        {enPreview && (
          <DocumentPreviewModal
            open
            numero={enPreview.numero}
            asunto={enPreview.asunto}
            archivo={enPreview.archivo}
            onClose={() => setEnPreview(null)}
          />
        )}
      </Card>
    </div>
  );
}
