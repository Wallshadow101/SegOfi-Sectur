import { Link } from "react-router-dom";
import {
  FileText,
  ListChecks,
  FolderOpen,
  Building2,
  Users,
  FileStack,
  Clock3,
  CheckCircle2,
  Archive,
} from "lucide-react";
import { useAuth } from "../../Guards/useAuth";
import type { Rol } from "../../Guards/authTypes";
import Card from "../../components/Card";
import BarChart from "../../components/BarChart";
import { OFICIOS_DEMO } from "../../Data/oficio";

const ADMIN_ROLES: Rol[] = ["Administrador", "Directora"];

// Máximo 5 accesos rápidos — solo lo más importante (el resto vive en el menú lateral)
const ACCESOS = [
  { to: "/crear-oficio", label: "Nuevo documento", icon: FileText },
  { to: "/seguimiento", label: "Seguimiento", icon: ListChecks },
  { to: "/ver-oficios", label: "Ver oficios", icon: FolderOpen },
  { to: "/departamentos", label: "Departamentos", icon: Building2, rolesPermitidos: ADMIN_ROLES },
  { to: "/cuentas", label: "Cuentas", icon: Users, rolesPermitidos: ADMIN_ROLES },
];

const ESTADOS_ORDEN = ["Recibido", "Turnado", "En seguimiento", "Respondido", "Cerrado"] as const;

export default function Dashboard() {
  const { usuario } = useAuth();

  const accesos = ACCESOS.filter(
    (a) => !a.rolesPermitidos || (usuario && a.rolesPermitidos.includes(usuario.rol))
  );

  const esAdmin = usuario && ADMIN_ROLES.includes(usuario.rol);

  const conteos = ESTADOS_ORDEN.map((estado) => ({
    label: estado,
    value: OFICIOS_DEMO.filter((o) => o.estado === estado).length,
  }));

  const pendientes = OFICIOS_DEMO.filter((o) => ["Recibido", "Turnado", "En seguimiento"].includes(o.estado)).length;
  const respondidos = OFICIOS_DEMO.filter((o) => o.estado === "Respondido").length;
  const cerrados = OFICIOS_DEMO.filter((o) => o.estado === "Cerrado").length;

  const estadisticas = [
    { label: "Total", valor: OFICIOS_DEMO.length, icon: FileStack, color: "text-guinda" },
    { label: "Pendientes", valor: pendientes, icon: Clock3, color: "text-amber-600" },
    { label: "Respondidos", valor: respondidos, icon: CheckCircle2, color: "text-emerald-600" },
    { label: "Cerrados", valor: cerrados, icon: Archive, color: "text-texto-secundario" },
  ];

  const gridColsClase: Record<number, string> = {
    1: "sm:grid-cols-1",
    2: "sm:grid-cols-2",
    3: "sm:grid-cols-3",
    4: "sm:grid-cols-4",
    5: "sm:grid-cols-5",
  };

  return (
    <div className="flex flex-col gap-5">
      {esAdmin && (
        <Card title="Resumen de oficios" bodyClassName="p-5">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-5">
            {estadisticas.map(({ label, valor, icon: Icon, color }) => (
              <div key={label} className="flex items-center gap-3 rounded-xl bg-fondo/40 px-4 py-3">
                <span className={`h-10 w-10 shrink-0 rounded-full bg-white flex items-center justify-center ${color}`}>
                  <Icon size={18} />
                </span>
                <div>
                  <p className="text-xl font-bold text-texto leading-none">{valor}</p>
                  <p className="text-xs text-texto-secundario">{label}</p>
                </div>
              </div>
            ))}
          </div>
          <p className="text-sm font-semibold text-texto mb-2">Oficios por estado</p>
          <BarChart data={conteos} height={150} />
        </Card>
      )}

      <div className={`grid grid-cols-3 ${gridColsClase[accesos.length] ?? "sm:grid-cols-5"} gap-3`}>
        {accesos.map(({ to, label, icon: Icon }, i) => (
          <Link
            key={label}
            to={to}
            style={{ animationDelay: `${i * 40}ms` }}
            className="flex flex-col items-center justify-center gap-2 rounded-xl bg-guinda px-3 py-5 text-center
              shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all
              animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
          >
            <span className="h-10 w-10 rounded-full bg-dorado text-white flex items-center justify-center">
              <Icon size={18} />
            </span>
            <span className="text-xs font-semibold text-dorado-light leading-tight">{label}</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
