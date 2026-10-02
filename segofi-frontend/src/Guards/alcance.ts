import type { Usuario } from "./authTypes";
import type { Oficio } from "../Data/oficio";
import type { Notificacion } from "../Data/notificaciones";

export const ROLES_ACCESO_TOTAL: Usuario["rol"][] = ["Administrador", "Directora"];

export function tieneAccesoTotal(usuario: Usuario | null): boolean {
  return !!usuario && ROLES_ACCESO_TOTAL.includes(usuario.rol);
}

/**
 * Un oficio es visible si:
 * - el usuario tiene un rol de acceso total (Administrador/Directora), o
 * - el oficio es de su mismo departamento, o
 * - el oficio se le turnó a él directamente (destinatariosPersonas)
 */
export function puedeVerOficio(usuario: Usuario | null, oficio: Oficio): boolean {
  if (!usuario) return false;
  if (tieneAccesoTotal(usuario)) return true;
  if (oficio.departamento === usuario.dependencia) return true;
  if (oficio.destinatariosPersonas?.includes(usuario.nombre)) return true;
  return false;
}

export function oficiosVisibles(usuario: Usuario | null, oficios: Oficio[]): Oficio[] {
  return oficios.filter((o) => puedeVerOficio(usuario, o));
}

/**
 * Una notificación es visible si no tiene departamento asociado (aviso general)
 * o si coincide con el departamento del usuario — salvo acceso total, que ve todo.
 */
export function puedeVerNotificacion(usuario: Usuario | null, n: Notificacion): boolean {
  if (!usuario) return false;
  if (tieneAccesoTotal(usuario)) return true;
  if (!n.departamento) return true;
  return n.departamento === usuario.dependencia;
}

export function notificacionesVisibles(usuario: Usuario | null, notificaciones: Notificacion[]): Notificacion[] {
  return notificaciones.filter((n) => puedeVerNotificacion(usuario, n));
}
