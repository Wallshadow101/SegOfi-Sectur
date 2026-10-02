import { FileText, FileEdit, Megaphone, FileQuestion, type LucideIcon } from "lucide-react";

export interface TipoDocumento {
  value: "oficio" | "memo" | "circular" | "otro";
  label: string;
  descripcion: string;
  icon: LucideIcon;
}

// Debe coincidir 1 a 1 con el enum TipoDocumento del backend (Memo, Oficio, Circular, Otro)
export const TIPOS_DOCUMENTO: TipoDocumento[] = [
  { value: "oficio", label: "Oficio", descripcion: "Comunicación formal entre dependencias", icon: FileText },
  { value: "memo", label: "Memorándum", descripcion: "Comunicación interna breve entre áreas", icon: FileEdit },
  { value: "circular", label: "Circular", descripcion: "Aviso dirigido a varias áreas o personas", icon: Megaphone },
  { value: "otro", label: "Otro", descripcion: "Cualquier otro tipo de documento", icon: FileQuestion },
];
