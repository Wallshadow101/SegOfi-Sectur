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

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 px-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-6 text-center shadow-xl">
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
