import { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import StatusBadge from "../../components/StatusBadge";
import Button from "../../components/Button";
import { OFICIOS_DEMO, type Oficio } from "../../Data/oficio";
import { CheckCircle2, FileText, Search } from "lucide-react";

export default function Seguimiento() {
  const [numeroBuscado, setNumeroBuscado] = useState("");
  const [seleccionado, setSeleccionado] = useState<Oficio | null>(null);
  const [buscado, setBuscado] = useState(false);
  const [nuevaObservacion, setNuevaObservacion] = useState("");
  const [lecturaConfirmada, setLecturaConfirmada] = useState(false);

  const buscar = (e: React.FormEvent) => {
    e.preventDefault();
    const encontrado =
      OFICIOS_DEMO.find((o) => o.numero.toLowerCase() === numeroBuscado.trim().toLowerCase()) ?? null;
    setSeleccionado(encontrado);
    setLecturaConfirmada(false);
    setBuscado(true);
  };

  return (
    <div className="flex flex-col gap-6">
      <Card title="Buscar seguimiento">
        <p className="text-sm text-texto-secundario mb-4">
          Al buscar mediante el número del oficio, se mostrará todo el seguimiento que se le ha dado.
        </p>
        <form onSubmit={buscar} className="flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-texto-secundario pointer-events-none" />
            <Input
              label="Número de oficio"
              placeholder="Ej. OF-0142/2026"
              value={numeroBuscado}
              onChange={(e) => setNumeroBuscado(e.target.value)}
              className="pl-11"
            />
          </div>
          <Button type="submit" className="sm:mt-6">
            Buscar
          </Button>
        </form>
      </Card>

      {!buscado && (
        <Card>
          <p className="text-center text-sm text-texto-secundario py-10">
            Ingresa un número de oficio y presiona “Buscar” para ver su seguimiento.
          </p>
        </Card>
      )}

      {buscado && !seleccionado && (
        <Card>
          <p className="text-center text-sm text-texto-secundario py-10 animate-in fade-in duration-200">
            No se encontró ningún oficio con el número “{numeroBuscado}”.
          </p>
        </Card>
      )}

      {seleccionado && (
        <div className="flex flex-col gap-6 animate-in fade-in slide-in-from-bottom-2 duration-300">
          <Card title={`${seleccionado.numero} — ${seleccionado.asunto}`} action={<StatusBadge estado={seleccionado.estado} />}>
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div className="flex items-center gap-3 text-texto-secundario">
                <FileText size={20} />
                <span className="text-sm">{seleccionado.archivo}</span>
              </div>
              <Button
                icon={<CheckCircle2 size={18} />}
                variant={lecturaConfirmada ? "outline" : "secondary"}
                disabled={lecturaConfirmada}
                onClick={() => setLecturaConfirmada(true)}
              >
                {lecturaConfirmada ? "Lectura confirmada" : "Confirmar lectura"}
              </Button>
            </div>
          </Card>

          <Card title="Seguimiento">
            <ol className="relative border-s-2 border-borde ms-3">
              {seleccionado.seguimiento.map((ev, i) => (
                <li key={i} className="mb-8 ms-6 last:mb-0">
                  <span className="absolute-start-[9px] h-4 w-4 rounded-full bg-guinda" />
                  <p className="text-sm font-semibold text-texto">{ev.autor}</p>
                  <p className="text-sm text-texto-secundario">{ev.accion}</p>
                  <p className="text-xs text-texto-secundario mt-1">{ev.fecha}</p>
                </li>
              ))}
            </ol>

            <div className="flex flex-col gap-2 mt-2">
              <label className="text-sm font-medium text-texto">Agregar observación</label>
              <textarea
                rows={3}
                value={nuevaObservacion}
                onChange={(e) => setNuevaObservacion(e.target.value)}
                placeholder="Escribe un comentario de seguimiento…"
                className="w-full rounded-lg border border-borde bg-white px-4 py-3 text-base
                  transition-all duration-150 focus:outline-none focus:ring-2 focus:ring-guinda/40 focus:border-guinda"
              />
              <div className="flex justify-end">
                <Button disabled={!nuevaObservacion.trim()} onClick={() => setNuevaObservacion("")}>
                  Agregar
                </Button>
              </div>
            </div>
          </Card>
        </div>
      )}
    </div>
  );
}
