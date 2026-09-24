import type { ReactNode } from "react";
import { X } from "lucide-react";
import Button from "./Button";

interface FormModalProps {
  open: boolean;
  title: string;
  onClose: () => void;
  onSubmit: () => void;
  submitLabel?: string;
  children: ReactNode;
}

export default function FormModal({
  open,
  title,
  onClose,
  onSubmit,
  submitLabel = "Guardar",
  children,
}: FormModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-lg rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-borde">
          <h3 className="text-lg font-semibold text-guinda">{title}</h3>
          <button
            onClick={onClose}
            className="p-1.5 rounded-full text-texto-secundario hover:bg-fondo"
            aria-label="Cerrar"
          >
            <X size={18} />
          </button>
        </div>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            onSubmit();
          }}
          className="flex flex-col gap-4 px-6 py-5"
        >
          {children}

          <div className="flex justify-end gap-3 pt-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancelar
            </Button>
            <Button type="submit">{submitLabel}</Button>
          </div>
        </form>
      </div>
    </div>
  );
}
