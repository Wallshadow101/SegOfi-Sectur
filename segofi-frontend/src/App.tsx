import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider } from "./Guards/AuthContext";
import RoleGuard from "./Guards/RoleGuard";

import Login from "./Login/Login";
import Register from "./Login/Register";
import ForgotPassword from "./Login/ForgotPassword";
import Sidebar from "./User/Sidebar/Sidebar";
import Dashboard from "./User/Dashboard/Dashboard";
import VerOficios from "./User/VerOficios/VerOficios";
import NuevoDocumento from "./User/Documents/NuevoDocumento";
import Documents from "./User/Documents/Documents";
import Seguimiento from "./User/Seguimiento/Seguimiento";
import SeguimientoPersonas from "./User/SeguimientoPersonas/SeguimientoPersonas";
import Notifications from "./User/Notifications/Notifications";
import Reportes from "./User/Reportes/Reportes";
import Departamentos from "./User/Departamentos/Departamentos";
import Cuentas from "./User/Cuentas/Cuentas";
import Perfil from "./User/Perfil/Perfil";

const ROLES_ADMIN = ["Administrador", "Directora"] as const;

export default function App() {
  return (
    <BrowserRouter basename={import.meta.env.BASE_URL}>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registro" element={<Register />} />
          <Route path="/recuperar-password" element={<ForgotPassword />} />

          {/* Requiere sesión iniciada */}
          <Route element={<RoleGuard />}>
            <Route element={<Sidebar />}>
              <Route path="/dashboard" element={<Dashboard />} />
              {/* Requiere además rol Administrador o Directora */}
              <Route element={<RoleGuard rolesPermitidos={[...ROLES_ADMIN]} />}>
                <Route path="/crear-oficio" element={<NuevoDocumento />} />
                <Route path="/crear-oficio/:tipo" element={<Documents />} />
                <Route path="/reportes" element={<Reportes />} />
                <Route path="/departamentos" element={<Departamentos />} />
                <Route path="/cuentas" element={<Cuentas />} />
                <Route
                  path="/seguimiento-personas"
                  element={<SeguimientoPersonas />}
                />
              </Route>
              <Route path="/ver-oficios" element={<VerOficios />} />
              <Route path="/seguimiento" element={<Seguimiento />} />
              <Route path="/notifications" element={<Notifications />} />
              <Route path="/perfil" element={<Perfil />} />
            </Route>
          </Route>

          <Route path="*" element={<Navigate to="/login" replace />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
