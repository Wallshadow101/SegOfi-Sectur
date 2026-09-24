import { useState, type ReactNode } from "react";
import { AuthContext, type Usuario } from "./authTypes";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  const login = (u: Usuario) => setUsuario(u);
  const logout = () => setUsuario(null);

  return <AuthContext.Provider value={{ usuario, login, logout }}>{children}</AuthContext.Provider>;
}
