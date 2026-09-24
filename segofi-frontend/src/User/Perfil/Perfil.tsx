import { useState } from "react";
import Card from "../../components/Card";
import Input from "../../components/Input";
import Button from "../../components/Button";
import { useAuth } from "../../Guards/useAuth";
import { User } from "lucide-react";

export default function Perfil() {
  const { usuario } = useAuth();
  const [nombre, setNombre] = useState(usuario?.nombre ?? "");
  const [cargo, setCargo] = useState(usuario?.cargo ?? "");
  const [dependencia, setDependencia] = useState(usuario?.dependencia ?? "");

  return (
    <div className="flex flex-col gap-6 max-w-xl">
      <Card>
        <div className="flex items-center gap-4">
          <span className="h-16 w-16 rounded-full bg-dorado text-white flex items-center justify-center">
            <User size={28} />
          </span>
          <div>
            <h1 className="text-lg font-bold text-guinda">{usuario?.nombre}</h1>
            <p className="text-sm text-texto-secundario">{usuario?.rol}</p>
          </div>
        </div>
      </Card>

      <Card title="Datos personales">
        <form className="flex flex-col gap-4" onSubmit={(e) => e.preventDefault()}>
          <Input label="Nombre completo" value={nombre} onChange={(e) => setNombre(e.target.value)} />
          <Input label="Cargo" value={cargo} onChange={(e) => setCargo(e.target.value)} />
          <Input label="Dependencia" value={dependencia} onChange={(e) => setDependencia(e.target.value)} />
          <Input label="Nueva contraseña" type="password" placeholder="Dejar en blanco para no cambiarla" />

          <div className="flex justify-end pt-2">
            <Button type="submit">Guardar cambios</Button>
          </div>
        </form>
      </Card>
    </div>
  );
}
