import { Link } from "react-router-dom";
import Card from "../../components/Card";
import { TIPOS_DOCUMENTO } from "../../Data/tiposDocumento";

export default function NuevoDocumento() {
  return (
    <Card title="Nuevo documento">
      <p className="text-sm text-texto-secundario mb-5">
        Elige el tipo de documento que vas a generar.
      </p>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        {TIPOS_DOCUMENTO.map(({ value, label, icon: Icon }, i) => (
          <Link
            key={value}
            to={`/crear-oficio/${value}`}
            style={{ animationDelay: `${i * 40}ms` }}
            className="flex flex-col items-center justify-center gap-3 rounded-2xl bg-guinda p-6 text-center
              shadow-sm hover:shadow-lg hover:-translate-y-0.5 transition-all
              animate-in fade-in slide-in-from-bottom-2 duration-300 fill-mode-both"
          >
            <span className="h-12 w-12 rounded-full bg-dorado text-white flex items-center justify-center">
              <Icon size={22} />
            </span>
            <span className="text-sm font-semibold text-dorado-light">{label}</span>
          </Link>
        ))}
      </div>
    </Card>
  );
}
