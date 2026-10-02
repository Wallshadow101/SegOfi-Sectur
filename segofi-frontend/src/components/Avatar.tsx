const COLORES = ["bg-guinda", "bg-dorado", "bg-blue-600", "bg-emerald-600", "bg-amber-600", "bg-purple-600"];

function iniciales(nombre: string): string {
  const limpio = nombre.replace(/^(Lic\.|Ing\.|Mtra\.|Mtro\.|Dr\.|Dra\.)\s*/i, "");
  const partes = limpio.split(" ").filter(Boolean);
  return ((partes[0]?.[0] ?? "") + (partes[1]?.[0] ?? "")).toUpperCase();
}

function colorPara(nombre: string): string {
  const suma = Array.from(nombre).reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return COLORES[suma % COLORES.length];
}

interface AvatarProps {
  nombre: string;
  size?: number;
}

export default function Avatar({ nombre, size = 36 }: AvatarProps) {
  return (
    <span
      className={`shrink-0 rounded-full ${colorPara(nombre)} text-white font-semibold flex items-center justify-center shadow-sm`}
      style={{ height: size, width: size, fontSize: size * 0.38 }}
    >
      {iniciales(nombre)}
    </span>
  );
}
