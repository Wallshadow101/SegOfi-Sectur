import { Navigate, useParams, Link } from "react-router-dom";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Select from "../../components/Select";
import FileUploadField from "../../components/FileUploadField";
import Button from "../../components/Button";
import { TIPOS_DOCUMENTO } from "../../Data/tiposDocumento";
import { ArrowLeft } from "lucide-react";

const DEPARTAMENTOS = [
  { value: "protocolos", label: "Protocolos" },
  { value: "18ote", label: "18 Ote" },
  { value: "promocion", label: "Promoción Turística" },
  { value: "desarrollo", label: "Desarrollo Turístico" },
];

export default function Documents() {
  const { tipo } = useParams<{ tipo: string }>();
  const tipoDoc = TIPOS_DOCUMENTO.find((t) => t.value === tipo);

  // El tipo viene fijo desde el backend (enum TipoDocumento); si no es válido, regresa al hub.
  if (!tipoDoc) return <Navigate to="/crear-oficio" replace />;

  return (
    <Card
      title={`Nuevo ${tipoDoc.label.toLowerCase()}`}
      action={
        <Link
          to="/crear-oficio"
          className="flex items-center gap-2 text-sm font-medium text-guinda hover:underline"
        >
          <ArrowLeft size={16} />
          Cambiar tipo
        </Link>
      }
    >
      <form className="grid grid-cols-1 md:grid-cols-2 gap-5" onSubmit={(e) => e.preventDefault()}>
        <Select
          label="Tipo de documento"
          options={TIPOS_DOCUMENTO}
          value={tipoDoc.value}
          disabled
        />
        <Input label="Número de documento" placeholder="Ej. OF-0143/2026" required />

        <Input label="Asunto" placeholder="Asunto del documento" className="md:col-span-2" required />

        <div className="md:col-span-2 flex flex-col gap-1.5">
          <label className="text-sm font-medium text-texto">Objeto (captura completa)</label>
          <textarea
            rows={4}
            placeholder="Describe el contenido del documento…"
            className="w-full rounded-lg border border-borde bg-white px-4 py-3 text-base
              focus:outline-none focus:ring-2 focus:ring-guinda/40 focus:border-guinda"
          />
        </div>

        <Select label="Dirigido a" options={DEPARTAMENTOS} placeholder="Selecciona un departamento" required />
        <Select label="Remitente" options={DEPARTAMENTOS} placeholder="Selecciona el remitente" required />

        <Input label="Fecha del documento" type="date" required />
        <div className="grid grid-cols-2 gap-3">
          <Input label="Fecha de recepción" type="date" required />
          <Input label="Hora de recepción" type="time" required />
        </div>

        <Input label="Fecha de turno" type="date" />
        <Input label="Hora de turno" type="time" />

        <label className="md:col-span-2 flex items-center gap-2 text-sm text-texto">
          <input type="checkbox" className="h-4 w-4 accent-guinda" />
          Este documento tiene término / plazo de atención
        </label>
        <Input label="Fecha límite de término" type="date" className="md:col-span-2" />

        <div className="md:col-span-2">
          <FileUploadField label="Documento en PDF" />
        </div>

        <div className="md:col-span-2 flex justify-end gap-3 pt-2">
          <Button type="button" variant="outline">
            Cancelar
          </Button>
          <Button type="submit">Guardar</Button>
        </div>
      </form>
    </Card>
  );
}
