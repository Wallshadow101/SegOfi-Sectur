import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface LogoProps {
  height?: number;
}

export default function Logo({ height = 48 }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="rounded-full bg-guinda flex items-center justify-center text-white"
        style={{ height, width: height }}
      >
        <ShieldCheck size={height * 0.47} />
      </div>
    );
  }

  return (
    <img
      src="/public/logopuebla.png"
      alt="Gobierno del Estado de Puebla"
      style={{ height }}
      className="w-auto object-contain"
      onError={() => setError(true)}
    />
  );
}
