import { useRef, useState } from "react";
import { NavLink, Outlet, useNavigate, useLocation } from "react-router-dom";
import {
  LayoutDashboard,
  FileText,
  ListChecks,
  Bell,
  BarChart3,
  LogOut,
  User,
  FolderOpen,
  Building2,
  Users,
  UsersRound,
  ChevronDown,
} from "lucide-react";
import { useAuth } from "../../Guards/useAuth";
import type { Rol } from "../../Guards/authTypes";
import ConfirmDialog from "../../components/ConfirmDialog";
import Logo from "../../components/Logo";
import { NOTIFICACIONES } from "../../Data/notificaciones";

interface NavItem {
  to: string;
  label: string;
  icon: React.ReactNode;
  rolesPermitidos?: Rol[];
}

const ADMIN_ROLES: Rol[] = ["Administrador", "Directora"];

const MENU_PRINCIPAL: NavItem[] = [
  { to: "/dashboard", label: "Inicio", icon: <LayoutDashboard size={18} /> },
];

const ACCIONES: NavItem[] = [
  { to: "/crear-oficio", label: "Nuevo documento", icon: <FileText size={18} /> },
  { to: "/seguimiento", label: "Seguimiento", icon: <ListChecks size={18} /> },
  { to: "/seguimiento-personas", label: "Seguimiento por persona", icon: <UsersRound size={18} />, rolesPermitidos: ADMIN_ROLES },
  { to: "/ver-oficios", label: "Ver oficios", icon: <FolderOpen size={18} /> },
];

const ADMINISTRAR: NavItem[] = [
  { to: "/departamentos", label: "Departamentos", icon: <Building2 size={18} />, rolesPermitidos: ADMIN_ROLES },
  { to: "/cuentas", label: "Cuentas", icon: <Users size={18} />, rolesPermitidos: ADMIN_ROLES },
  { to: "/reportes", label: "Generar reporte", icon: <BarChart3 size={18} />, rolesPermitidos: ADMIN_ROLES },
];

function visiblesPara(items: NavItem[], rol?: Rol) {
  return items.filter((item) => !item.rolesPermitidos || (rol && item.rolesPermitidos.includes(rol)));
}

function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="px-4 pt-4 pb-1 text-[11px] font-semibold uppercase tracking-wide text-white/50">
      {children}
    </p>
  );
}

export default function Sidebar() {
  const { usuario, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const enDashboard = location.pathname === "/dashboard";
  const [showLogoutConfirm, setShowLogoutConfirm] = useState(false);
  const [menuAbierto, setMenuAbierto] = useState(false);
  const cerrarConRetraso = useRef<ReturnType<typeof setTimeout> | null>(null);

  const menuPrincipal = visiblesPara(MENU_PRINCIPAL, usuario?.rol);
  const acciones = visiblesPara(ACCIONES, usuario?.rol);
  const administrar = visiblesPara(ADMINISTRAR, usuario?.rol);
  const notisPreview = NOTIFICACIONES.slice(0, 3);

  const confirmarLogout = () => {
    logout();
    navigate("/login");
  };

  const abrirAlEntrar = () => {
    if (cerrarConRetraso.current) clearTimeout(cerrarConRetraso.current);
    setMenuAbierto(true);
  };
  const cerrarAlSalir = () => {
    cerrarConRetraso.current = setTimeout(() => setMenuAbierto(false), 200);
  };

  const linkClass = ({ isActive }: { isActive: boolean }) =>
    `flex items-center gap-3 px-4 py-2.5 rounded-lg text-sm font-medium transition-colors ${
      isActive ? "bg-dorado text-white" : "text-white/85 hover:bg-white/10"
    }`;

  return (
    <div className="min-h-screen w-full flex bg-fondo">
      {/* Navigation Drawer */}
      <aside className="w-64 shrink-0 bg-guinda text-white flex flex-col">
        <div className="px-5 py-5 border-b border-white/10">
          <div className="flex items-center gap-2">
            <Logo size={40} />
            <div>
              <p className="text-sm font-bold uppercase leading-tight">Correspondencia</p>
              <p className="text-[11px] text-white/70">Gobierno de Puebla</p>
            </div>
          </div>
        </div>

        <nav className="flex-1 px-3 pb-4 overflow-y-auto">
          <SectionLabel>Menú principal</SectionLabel>
          <div className="flex flex-col gap-1">
            {menuPrincipal.map((item) => (
              <NavLink key={item.to} to={item.to} className={linkClass}>
                {item.icon}
                {item.label}
              </NavLink>
            ))}
          </div>

          {acciones.length > 0 && (
            <>
              <SectionLabel>Acciones</SectionLabel>
              <div className="flex flex-col gap-1">
                {acciones.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </>
          )}

          {administrar.length > 0 && (
            <>
              <SectionLabel>Administrar</SectionLabel>
              <div className="flex flex-col gap-1">
                {administrar.map((item) => (
                  <NavLink key={item.to} to={item.to} className={linkClass}>
                    {item.icon}
                    {item.label}
                  </NavLink>
                ))}
              </div>
            </>
          )}
        </nav>
      </aside>

      {/* Contenido */}
      <div className="flex-1 flex flex-col">
        {/* Navigation bar superior: un solo botón (Notificaciones) que despliega todo */}
        <header className="h-20 bg-fondo border-b border-borde flex items-center justify-between px-6">
          <div>
            {enDashboard && usuario && (
              <div className="animate-in fade-in duration-200">
                <h1 className="text-lg font-bold text-guinda leading-tight">Bienvenido, {usuario.nombre}</h1>
                <p className="text-xs text-texto-secundario">
                  {usuario.cargo} · {usuario.dependencia}
                </p>
              </div>
            )}
          </div>

          <div className="relative" onMouseEnter={abrirAlEntrar} onMouseLeave={cerrarAlSalir}>
            <button
              onClick={() => setMenuAbierto((v) => !v)}
              className="flex items-center gap-2 pl-4 pr-3 py-2 rounded-full bg-guinda text-white text-sm font-medium
                hover:bg-guinda-dark transition-colors shadow-sm"
            >
              <span className="relative">
                <Bell size={18} />
                <span className="absolute -top-1 -right-1 h-2 w-2 rounded-full bg-dorado" />
              </span>
              Notificaciones
              <ChevronDown size={16} className={`transition-transform ${menuAbierto ? "rotate-180" : ""}`} />
            </button>

            {menuAbierto && (
              <div
                className="absolute right-0 mt-1 w-80 rounded-xl border border-borde bg-white shadow-lg z-20
                  animate-in fade-in slide-in-from-top-2 duration-150"
              >
                <p className="px-4 py-3 text-sm font-semibold text-guinda border-b border-borde">Notificaciones</p>
                <ul className="divide-y divide-borde">
                  {notisPreview.map((n, i) => {
                    const Icono = n.icono;
                    return (
                      <li key={i} className="flex items-start gap-3 px-4 py-3 hover:bg-fondo/40 transition-colors">
                        <span className="h-8 w-8 shrink-0 rounded-full bg-guinda/10 text-guinda flex items-center justify-center">
                          <Icono size={15} />
                        </span>
                        <div>
                          <p className="text-sm text-texto leading-snug">{n.texto}</p>
                          <p className="text-xs text-texto-secundario mt-0.5">{n.fecha}</p>
                        </div>
                      </li>
                    );
                  })}
                </ul>
                <NavLink
                  to="/notifications"
                  onClick={() => setMenuAbierto(false)}
                  className="block text-center text-sm font-medium text-guinda py-2.5 hover:bg-guinda/5 border-t border-borde"
                >
                  Ver todas
                </NavLink>

                <div className="border-t border-borde">
                  <div className="px-4 py-3">
                    <p className="text-sm font-semibold text-texto truncate">{usuario?.nombre}</p>
                    <p className="text-xs text-texto-secundario truncate">{usuario?.cargo}</p>
                  </div>
                  <NavLink
                    to="/perfil"
                    onClick={() => setMenuAbierto(false)}
                    className="flex items-center gap-2 px-4 py-3 text-sm text-texto hover:bg-fondo/50"
                  >
                    <User size={16} />
                    Ver perfil
                  </NavLink>
                  <button
                    onClick={() => {
                      setMenuAbierto(false);
                      setShowLogoutConfirm(true);
                    }}
                    className="flex w-full items-center gap-2 px-4 py-3 text-sm text-guinda hover:bg-guinda/5 rounded-b-xl"
                  >
                    <LogOut size={16} />
                    Cerrar sesión
                  </button>
                </div>
              </div>
            )}
          </div>
        </header>

        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>

      <ConfirmDialog
        open={showLogoutConfirm}
        title="¿Deseas cerrar tu sesión?"
        confirmLabel="Sí"
        cancelLabel="No"
        variant="danger"
        onConfirm={confirmarLogout}
        onCancel={() => setShowLogoutConfirm(false)}
      />
    </div>
  );
}
