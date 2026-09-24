import { FileText, FileEdit, Megaphone, FileQuestion, type LucideIcon } from "lucide-react";

export interface TipoDocumento {
  value: "oficio" | "memo" | "circular" | "otro";
  label: string;
  icon: LucideIcon;
}

export const TIPOS_DOCUMENTO: TipoDocumento[] = [
  { value: "oficio", label: "Oficio", icon: FileText },
  { value: "memo", label: "Memorándum", icon: FileEdit },
  { value: "circular", label: "Circular", icon: Megaphone },
  { value: "otro", label: "Otro", icon: FileQuestion },
];
