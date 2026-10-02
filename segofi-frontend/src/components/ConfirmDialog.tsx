import { AlertTriangle, HelpCircle } from "lucide-react";
import Button from "./Button";

interface ConfirmDialogProps {
  open: boolean;
  title: string;
  description?: string;
  confirmLabel?: string;
  cancelLabel?: string;
  variant?: "primary" | "danger";
  onConfirm: () => void;
  onCancel: () => void;
}

export default function ConfirmDialog({
  open,
  title,
  description,
  confirmLabel = "Sí",
  cancelLabel = "No",
  variant = "primary",
  onConfirm,
  onCancel,
}: ConfirmDialogProps) {
  if (!open) return null;

  const Icono = variant === "danger" ? AlertTriangle : HelpCircle;
  const colorIcono = variant === "danger" ? "bg-red-100 text-red-600" : "bg-guinda/10 text-guinda";

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-sm px-4 animate-in fade-in duration-200">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl animate-in fade-in zoom-in-95 duration-200">
        <span className={`mx-auto mb-3 h-14 w-14 rounded-full flex items-center justify-center ${colorIcono}`}>
          <Icono size={26} />
        </span>
        <h3 className="text-lg font-semibold text-guinda uppercase">{title}</h3>
        {description && <p className="mt-2 text-sm text-texto-secundario">{description}</p>}
        <div className="mt-6 flex justify-center gap-3">
          <Button variant="outline" onClick={onCancel} className="w-24">
            {cancelLabel}
          </Button>
          <Button variant={variant} onClick={onConfirm} className="w-24">
            {confirmLabel}
          </Button>
        </div>
      </div>
    </div>
  );
}
