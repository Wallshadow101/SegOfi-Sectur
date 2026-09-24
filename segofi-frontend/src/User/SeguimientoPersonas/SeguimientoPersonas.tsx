import { useMemo, useState } from "react";
import Card from "../../components/Card";
import { OFICIOS_DEMO } from "../../Data/oficio";
import { ChevronDown, User } from "lucide-react";

interface AccionPersona {
  oficio: string;
  accion: string;
  fecha: string;
}

interface Persona {
  nombre: string;
  acciones: AccionPersona[];
}

export default function SeguimientoPersonas() {
  const [expandido, setExpandido] = useState<string | null>(null);

  const personas = useMemo<Persona[]>(() => {
    const mapa = new Map<string, AccionPersona[]>();
    for (const oficio of OFICIOS_DEMO) {
      for (const ev of oficio.seguimiento) {
        const lista = mapa.get(ev.autor) ?? [];
        lista.push({ oficio: oficio.numero, accion: ev.accion, fecha: ev.fecha });
        mapa.set(ev.autor, lista);
      }
    }
    return Array.from(mapa.entries())
      .map(([nombre, acciones]) => ({ nombre, acciones }))
      .sort((a, b) => b.acciones.length - a.acciones.length);
  }, []);

  return (
    <Card title="Seguimiento por persona">
      <p className="text-sm text-texto-secundario mb-5">
        Acciones registradas por cada persona sobre los oficios (turnados, observaciones, respuestas y confirmaciones de lectura).
      </p>

      <div className="flex flex-col gap-3">
        {personas.map((p) => {
          const abierto = expandido === p.nombre;
          return (
            <div key={p.nombre} className="rounded-xl border border-borde overflow-hidden">
              <button
                onClick={() => setExpandido(abierto ? null : p.nombre)}
                className="w-full flex items-center justify-between gap-4 px-4 py-3 hover:bg-fondo/30 transition-colors"
              >
                <div className="flex items-center gap-3">
                  <span className="h-10 w-10 rounded-full bg-dorado/15 text-dorado flex items-center justify-center">
                    <User size={18} />
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-semibold text-texto">{p.nombre}</p>
                    <p className="text-xs text-texto-secundario">
                      {p.acciones.length} {p.acciones.length === 1 ? "acción registrada" : "acciones registradas"}
                    </p>
                  </div>
                </div>
                <ChevronDown size={18} className={`text-texto-secundario transition-transform ${abierto ? "rotate-180" : ""}`} />
              </button>

              {abierto && (
                <ul className="divide-y divide-borde border-t border-borde animate-in fade-in slide-in-from-top-1 duration-150">
                  {p.acciones.map((a, i) => (
                    <li key={i} className="px-4 py-3 pl-16">
                      <p className="text-sm text-texto">
                        <span className="font-medium">{a.oficio}</span> — {a.accion}
                      </p>
                      <p className="text-xs text-texto-secundario mt-0.5">{a.fecha}</p>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          );
        })}
      </div>
    </Card>
  );
}
