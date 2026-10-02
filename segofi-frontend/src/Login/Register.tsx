import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Info } from "lucide-react";
import Input from "../components/Input";
import PasswordInput from "../components/PasswordInput";
import Button from "../components/Button";
import Logo from "../components/Logo";
import AuthBackground from "../components/AuthBackground";

export default function Register() {
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setEnviado(true);
  };

  return (
    <AuthBackground>
      <div className="relative w-full max-w-[420px] bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo />
          <div className="text-center">
            <h1 className="text-lg font-bold text-guinda uppercase leading-tight">
              Crear cuenta
            </h1>
            <p className="text-xs text-texto-secundario">
              Gobierno del Estado de Puebla
            </p>
          </div>
        </div>

        {enviado ? (
          <div className="flex flex-col items-center gap-3 text-center animate-in fade-in zoom-in-95 duration-300">
            <span className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </span>
            <p className="text-sm text-texto">
              Tu cuenta fue creada. Un Administrador o Directora te asignará
              cargo, dependencia y rol antes de que puedas iniciar sesión.
            </p>
            <Link
              to="/login"
              className="mt-2 text-sm font-medium text-guinda hover:underline"
            >
              Volver a inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Nombre completo"
              placeholder="Nombre y apellidos"
              required
            />
            <Input
              label="Correo institucional"
              type="email"
              placeholder="nombre@puebla.gob.mx"
              required
            />
            <PasswordInput label="Contraseña" placeholder="••••••••" required />
            <PasswordInput
              label="Confirmar contraseña"
              placeholder="••••••••"
              required
            />

            <div className="flex items-start gap-2 rounded-lg bg-guinda/5 border border-guinda/15 px-3 py-2.5">
              <Info size={16} className="text-guinda shrink-0 mt-0.5" />
              <p className="text-xs text-texto-secundario">
                Tu cargo, dependencia y rol los asigna un Administrador o
                Directora después de crear tu cuenta — no los capturas tú.
              </p>
            </div>

            <Button type="submit" className="w-full mt-1">
              Crear cuenta
            </Button>

            <p className="text-center text-sm text-texto-secundario">
              ¿Ya tienes cuenta?{" "}
              <Link to="/login" className="text-guinda hover:underline">
                Inicia sesión
              </Link>
            </p>
          </form>
        )}
      </div>
    </AuthBackground>
  );
}
