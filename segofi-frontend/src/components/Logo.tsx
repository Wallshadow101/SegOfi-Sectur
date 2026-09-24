import { useState } from "react";
import { ShieldCheck } from "lucide-react";

interface LogoProps {
  size?: number;
}

export default function Logo({ size = 64 }: LogoProps) {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div
        className="rounded-full bg-guinda flex items-center justify-center text-white"
        style={{ height: size, width: size }}
      >
        <ShieldCheck size={size * 0.47} />
      </div>
    );
  }

  return (
    <img
      src="/src/assets/logopuebla.png"
      alt="Gobierno del Estado de Puebla"
      style={{ height: size, width: size }}
      className="object-contain"
      onError={() => setError(true)}
    />
  );
}
