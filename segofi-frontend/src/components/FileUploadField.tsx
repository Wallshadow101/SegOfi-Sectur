import { useRef, useState } from "react";
import { UploadCloud, FileText, X } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  onFileSelected?: (file: File | null) => void;
}

function tamano(bytes: number): string {
  return bytes > 1024 * 1024 ? `${(bytes / 1024 / 1024).toFixed(1)} MB` : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

export default function FileUploadField({ label, accept = "application/pdf", onFileSelected }: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [arrastrando, setArrastrando] = useState(false);

  const seleccionar = (f: File | null) => {
    setFile(f);
    onFileSelected?.(f);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-texto">{label}</span>

      {file ? (
        <div className="flex items-center gap-3 rounded-lg border border-emerald-200 bg-emerald-50 px-4 py-4 animate-in fade-in duration-200">
          <span className="h-10 w-10 shrink-0 rounded-lg bg-white text-guinda flex items-center justify-center shadow-sm">
            <FileText size={20} />
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm font-medium text-texto truncate">{file.name}</p>
            <p className="text-xs text-texto-secundario">{tamano(file.size)} · listo para adjuntar</p>
          </div>
          <button
            type="button"
            onClick={() => seleccionar(null)}
            className="p-2 rounded-full text-texto-secundario hover:text-guinda hover:bg-guinda/10 transition-colors"
            aria-label="Quitar archivo"
          >
            <X size={16} />
          </button>
        </div>
      ) : (
        <button
          type="button"
          onClick={() => inputRef.current?.click()}
          onDragOver={(e) => {
            e.preventDefault();
            setArrastrando(true);
          }}
          onDragLeave={() => setArrastrando(false)}
          onDrop={(e) => {
            e.preventDefault();
            setArrastrando(false);
            seleccionar(e.dataTransfer.files?.[0] ?? null);
          }}
          className={`flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed transition-all
            ${
              arrastrando
                ? "border-guinda bg-guinda/5 text-guinda scale-[1.01]"
                : "border-borde bg-white text-texto-secundario hover:border-guinda hover:text-guinda hover:bg-guinda/5"
            }`}
        >
          <UploadCloud size={26} className={arrastrando ? "animate-bounce" : ""} />
          <span className="text-sm">
            {arrastrando ? "Suelta el PDF aquí" : "Arrastra el PDF aquí o haz clic para adjuntarlo"}
          </span>
        </button>
      )}

      <input
        ref={inputRef}
        type="file"
        accept={accept}
        className="hidden"
        onChange={(e) => seleccionar(e.target.files?.[0] ?? null)}
      />
    </div>
  );
}
