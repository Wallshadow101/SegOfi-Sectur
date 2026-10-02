import { Link } from "react-router-dom";
import { FilePlus2, ArrowRight } from "lucide-react";
import PageHeader from "../../components/PageHeader";
import { TIPOS_DOCUMENTO } from "../../Data/tiposDocumento";

export default function NuevoDocumento() {
  return (
    <div className="flex flex-col gap-5">
      <PageHeader
        icon={FilePlus2}
        title="Nuevo documento"
        description="Elige el tipo de documento que vas a generar"
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {TIPOS_DOCUMENTO.map(({ value, label, descripcion, icon: Icon }, i) => (
          <Link
            key={value}
            to={`/crear-oficio/${value}`}
            style={{ animationDelay: `${i * 60}ms` }}
            className="group relative overflow-hidden flex flex-col gap-4 rounded-2xl bg-white border border-borde p-6
              shadow-sm hover:shadow-xl hover:-translate-y-1 hover:border-guinda/40 transition-all duration-200
              animate-in fade-in slide-in-from-bottom-3 duration-300 fill-mode-both"
          >
            <span className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-guinda/5 transition-transform duration-300 group-hover:scale-150" />
            <span className="relative h-14 w-14 rounded-2xl bg-gradient-to-br from-guinda to-guinda-light text-white flex items-center justify-center shadow-md transition-transform duration-200 group-hover:scale-110 group-hover:-rotate-6">
              <Icon size={26} />
            </span>
            <div className="relative">
              <h3 className="text-lg font-bold text-guinda">{label}</h3>
              <p className="text-sm text-texto-secundario mt-1">
                {descripcion}
              </p>
            </div>
            <span className="relative mt-auto inline-flex items-center gap-1.5 text-sm font-semibold text-dorado transition-all group-hover:gap-3">
              Crear
              <ArrowRight size={16} />
            </span>
          </Link>
        ))}
      </div>
    </div>
  );
}
