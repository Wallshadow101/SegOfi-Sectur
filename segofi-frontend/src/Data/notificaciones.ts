import { FileStack, ListChecks, AlertTriangle, type LucideIcon } from "lucide-react";

export type TipoNotificacion = "Recibidos" | "Seguimiento" | "Urgentes";

export interface Notificacion {
  tipo: TipoNotificacion;
  icono: LucideIcon;
  texto: string;
  fecha: string;
  departamento?: string;
}

export const NOTIFICACIONES: Notificacion[] = [
  { tipo: "Recibidos", icono: FileStack, texto: "Nuevo oficio recibido: OF-0142/2026", fecha: "Hace 10 min", departamento: "Promoción Turística" },
  { tipo: "Seguimiento", icono: ListChecks, texto: "Se agregó una observación en MEMO-0088/2026", fecha: "Hace 2 h", departamento: "Protocolos" },
  { tipo: "Urgentes", icono: AlertTriangle, texto: "OF-0130/2026 está por vencer su término", fecha: "Hace 5 h", departamento: "Protocolos" },
  { tipo: "Recibidos", icono: FileStack, texto: "Nuevo oficio recibido: CIR-0021/2026", fecha: "Ayer", departamento: "18 Ote" },
];
