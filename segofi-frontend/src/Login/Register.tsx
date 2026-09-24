import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function Register() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con POST /api/auth/register
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-fondo px-4">
      <div className="w-full max-w-[420px] bg-white rounded-2xl shadow-lg border border-borde p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo />
          <div className="text-center">
            <h1 className="text-lg font-bold text-guinda uppercase leading-tight">Crear cuenta</h1>
            <p className="text-xs text-texto-secundario">Gobierno del Estado de Puebla</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Nombre completo" placeholder="Nombre y apellidos" required />
          <Input label="Correo institucional" type="email" placeholder="nombre@puebla.gob.mx" required />
          <Input label="Cargo" placeholder="Ej. Directora, Jefe de Departamento" required />
          <Input label="Dependencia" placeholder="Ej. Secretaría de Desarrollo Turístico" required />
          <Input label="Contraseña" type="password" placeholder="••••••••" required />
          <Input label="Confirmar contraseña" type="password" placeholder="••••••••" required />

          <Button type="submit" className="w-full mt-2">
            Crear cuenta
          </Button>

          <p className="text-center text-sm text-texto-secundario">
            ¿Ya tienes cuenta?{" "}
            <Link to="/login" className="text-guinda hover:underline">
              Inicia sesión
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
