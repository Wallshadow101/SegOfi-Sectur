export interface Departamento {
  id: number;
  nombre: string;
  codigo: string;
  responsable: string;
}

export const DEPARTAMENTOS_DEMO: Departamento[] = [
  { id: 1, nombre: "Promoción Turística", codigo: "DEP-01", responsable: "Mtra. Fernanda Ibarra Solís" },
  { id: 2, nombre: "Protocolos", codigo: "DEP-02", responsable: "Lic. Carlos Eduardo Martínez López" },
  { id: 3, nombre: "18 Ote", codigo: "DEP-03", responsable: "Lic. Ana Patricia Rojas Vega" },
  { id: 4, nombre: "Desarrollo Turístico", codigo: "DEP-04", responsable: "Ing. Jorge Luis Cano Pérez" },
];
