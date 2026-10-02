import { useEffect, useRef } from "react";
import { CheckCircle2 } from "lucide-react";

interface ToastProps {
  mensaje: string | null;
  onClose: () => void;
}

export default function Toast({ mensaje, onClose }: ToastProps) {
  const cerrarRef = useRef(onClose);

  useEffect(() => {
    cerrarRef.current = onClose;
  });

  useEffect(() => {
    if (!mensaje) return;
    const t = setTimeout(() => cerrarRef.current(), 2600);
    return () => clearTimeout(t);
  }, [mensaje]);

  if (!mensaje) return null;

  return (
    <div className="fixed bottom-6 right-6 z-[60] flex items-center gap-3 rounded-xl bg-guinda text-white px-4 py-3 shadow-xl animate-in fade-in slide-in-from-bottom-4 duration-200">
      <CheckCircle2 size={18} className="text-dorado-light" />
      <span className="text-sm font-medium">{mensaje}</span>
    </div>
  );
}
