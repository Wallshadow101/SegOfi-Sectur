import { FileText, X, Download } from "lucide-react";

interface DocumentPreviewModalProps {
  open: boolean;
  numero: string;
  asunto: string;
  archivo: string;
  onClose: () => void;
}

export default function DocumentPreviewModal({
  open,
  numero,
  asunto,
  archivo,
  onClose,
}: DocumentPreviewModalProps) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-xl rounded-2xl bg-white shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <div className="flex items-center justify-between px-6 py-4 border-b border-borde">
          <div>
            <h3 className="text-lg font-semibold text-guinda">{numero}</h3>
            <p className="text-sm text-texto-secundario">{asunto}</p>
          </div>
          <button onClick={onClose} className="p-1.5 rounded-full text-texto-secundario hover:bg-fondo" aria-label="Cerrar">
            <X size={18} />
          </button>
        </div>

        <div className="px-6 py-10 flex flex-col items-center gap-3 text-center">
          <span className="h-16 w-16 rounded-2xl bg-guinda/10 text-guinda flex items-center justify-center">
            <FileText size={30} />
          </span>
          <p className="text-sm font-medium text-texto">{archivo}</p>
          <p className="text-xs text-texto-secundario max-w-xs">
            La vista previa se activará cuando el backend entregue el archivo real. Por ahora solo se muestra la referencia.
          </p>
          <button
            disabled
            className="mt-2 inline-flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium
              text-texto-secundario border border-borde cursor-not-allowed"
          >
            <Download size={16} />
            Descargar (pendiente de backend)
          </button>
        </div>
      </div>
    </div>
  );
}
