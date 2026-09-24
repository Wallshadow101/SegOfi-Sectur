import { useRef, useState } from "react";
import { UploadCloud, FileText } from "lucide-react";

interface FileUploadFieldProps {
  label: string;
  accept?: string;
  onFileSelected?: (file: File | null) => void;
}

export default function FileUploadField({
  label,
  accept = "application/pdf",
  onFileSelected,
}: FileUploadFieldProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [fileName, setFileName] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] ?? null;
    setFileName(file?.name ?? null);
    onFileSelected?.(file);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <span className="text-sm font-medium text-texto">{label}</span>
      <button
        type="button"
        onClick={() => inputRef.current?.click()}
        className="flex h-28 w-full flex-col items-center justify-center gap-2 rounded-lg border-2
          border-dashed border-borde bg-white text-texto-secundario
          hover:border-guinda hover:text-guinda transition-colors"
      >
        {fileName ? (
          <>
            <FileText size={26} />
            <span className="text-sm">{fileName}</span>
          </>
        ) : (
          <>
            <UploadCloud size={26} />
            <span className="text-sm">Haz clic para adjuntar el PDF</span>
          </>
        )}
      </button>
      <input ref={inputRef} type="file" accept={accept} className="hidden" onChange={handleChange} />
    </div>
  );
}
