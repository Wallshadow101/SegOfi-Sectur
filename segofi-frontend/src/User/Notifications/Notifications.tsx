import { useState } from "react";
import Card from "../../components/Card";
import { NOTIFICACIONES, type TipoNotificacion } from "../../Data/notificaciones";

type Tab = "Todos" | TipoNotificacion;

const TABS: Tab[] = ["Todos", "Recibidos", "Seguimiento", "Urgentes"];

export default function Notifications() {
  const [tab, setTab] = useState<Tab>("Todos");
  const items = NOTIFICACIONES.filter((n) => tab === "Todos" || n.tipo === tab);

  return (
    <Card title="Notificaciones">
      <div className="flex gap-2 mb-5 border-b border-borde">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            className={`px-4 py-2 text-sm font-medium border-b-2 -mb-px transition-colors ${
              tab === t
                ? "border-guinda text-guinda"
                : "border-transparent text-texto-secundario hover:text-texto"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <ul className="flex flex-col divide-y divide-borde">
        {items.map((n, i) => {
          const Icono = n.icono;
          return (
            <li key={i} className="flex items-start gap-4 py-4">
              <span className="h-10 w-10 shrink-0 rounded-full bg-guinda/10 text-guinda flex items-center justify-center">
                <Icono size={18} />
              </span>
              <div className="flex-1">
                <p className="text-sm text-texto">{n.texto}</p>
                <p className="text-xs text-texto-secundario mt-0.5">{n.fecha}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </Card>
  );
}
