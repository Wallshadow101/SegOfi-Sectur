import { createContext } from "react";

export type Rol = "Usuario" | "Administrador" | "Directora" | "JefeDepartamento";

export interface Usuario {
  nombre: string;
  cargo: string;
  dependencia: string;
  rol: Rol;
}

export interface AuthContextValue {
  usuario: Usuario | null;
  login: (usuario: Usuario) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextValue | undefined>(undefined);
