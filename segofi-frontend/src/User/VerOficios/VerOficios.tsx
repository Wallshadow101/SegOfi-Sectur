import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Card from "../../components/Card";
import DataTable, { type Column } from "../../components/DataTable";
import StatusBadge, { type EstadoOficio } from "../../components/StatusBadge";
import Button from "../../components/Button";
import DocumentPreviewModal from "../../components/DocumentPreviewModal";
import { OFICIOS_DEMO, type Oficio } from "../../Data/oficio";
import { FilePlus2 } from "lucide-react";

const FILTROS: ("Todos" | EstadoOficio)[] = ["Todos", "Recibido", "Turnado", "En seguimiento", "Respondido", "Cerrado"];

const columns: Column<Oficio>[] = [
  { header: "N° documento", render: (o) => <span className="font-medium">{o.numero}</span> },
  { header: "Asunto", render: (o) => o.asunto },
  { header: "Departamento", render: (o) => o.departamento },
  { header: "Fecha", render: (o) => o.fecha },
  { header: "Estado", render: (o) => <StatusBadge estado={o.estado} /> },
];

export default function VerOficios() {
  const navigate = useNavigate();
  const [filtro, setFiltro] = useState<(typeof FILTROS)[number]>("Todos");
  const [enPreview, setEnPreview] = useState<Oficio | null>(null);

  const filas = OFICIOS_DEMO.filter((o) => filtro === "Todos" || o.estado === filtro);

  return (
    <Card
      title="Oficios"
      action={
        <Button icon={<FilePlus2 size={18} />} onClick={() => navigate("/crear-oficio")}>
          Nuevo oficio
        </Button>
      }
    >
      <div className="flex flex-wrap gap-2 mb-4">
        {FILTROS.map((f) => (
          <button
            key={f}
            onClick={() => setFiltro(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium border transition-colors ${
              filtro === f
                ? "bg-guinda text-white border-guinda"
                : "bg-white text-texto-secundario border-borde hover:border-guinda"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      <DataTable columns={columns} rows={filas} onView={setEnPreview} />

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
  );
}
