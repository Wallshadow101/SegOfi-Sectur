import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "./useAuth";
import type { Rol } from "./authTypes";

interface RoleGuardProps {
  rolesPermitidos?: Rol[];
}

export default function RoleGuard({ rolesPermitidos }: RoleGuardProps) {
  const { usuario } = useAuth();

  if (!usuario) return <Navigate to="/login" replace />;

  if (rolesPermitidos && !rolesPermitidos.includes(usuario.rol)) {
    return <Navigate to="/dashboard" replace />;
  }

  return <Outlet />;
}
