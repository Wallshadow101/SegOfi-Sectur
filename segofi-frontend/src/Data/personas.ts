import type { Rol } from "../Guards/authTypes";

export interface Persona {
  id: number;
  nombre: string;
  correo: string;
  cargo?: string;
  rol?: Rol;
  departamento?: string;
}

export const PERSONAS_DEMO: Persona[] = [
  { id: 1, nombre: "Lic. Carlos Eduardo Martínez López", correo: "usuario@puebla.gob.mx", cargo: "Encargado de Protocolos", rol: "Usuario", departamento: "Protocolos" },
  { id: 2, nombre: "Ing. Jorge Luis Cano Pérez", correo: "admin@puebla.gob.mx", cargo: "Administrador del sistema", rol: "Administrador", departamento: "Desarrollo Turístico" },
  { id: 3, nombre: "Mtra. Fernanda Ibarra Solís", correo: "directora@puebla.gob.mx", cargo: "Directora de Promoción Turística", rol: "Directora", departamento: "Promoción Turística" },
  { id: 4, nombre: "Lic. Ana Patricia Rojas Vega", correo: "jefedepto@puebla.gob.mx", cargo: "Jefa de Departamento", rol: "JefeDepartamento", departamento: "18 Ote" },

  { id: 5, nombre: "Lic. Roberto Sánchez Gómez", correo: "roberto.sanchez@puebla.gob.mx" },
];
