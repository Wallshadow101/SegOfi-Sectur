import { useState } from "react";
import { Link } from "react-router-dom";
import { CheckCircle2, Mail } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";
import AuthBackground from "../components/AuthBackground";

export default function ForgotPassword() {
  const [correo, setCorreo] = useState("");
  const [enviado, setEnviado] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con POST /api/auth/forgot-password
    setEnviado(true);
  };

  return (
    <AuthBackground>
      <div className="relative w-full max-w-[400px] bg-white rounded-2xl shadow-2xl p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo />
          <div className="text-center">
            <h1 className="text-lg font-bold text-guinda uppercase leading-tight">Recuperar contraseña</h1>
            <p className="text-xs text-texto-secundario">
              Te enviaremos instrucciones a tu correo institucional
            </p>
          </div>
        </div>

        {enviado ? (
          <div className="flex flex-col items-center gap-3 text-center animate-in fade-in zoom-in-95 duration-300">
            <span className="h-16 w-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
              <CheckCircle2 size={32} />
            </span>
            <p className="text-sm text-texto">
              Si <span className="font-semibold">{correo}</span> está registrado, recibirás las instrucciones en unos minutos.
            </p>
            <Link to="/login" className="mt-2 text-sm font-medium text-guinda hover:underline">
              Volver a inicio de sesión
            </Link>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <Input
              label="Correo institucional"
              type="email"
              icon={<Mail size={18} />}
              placeholder="nombre@puebla.gob.mx"
              value={correo}
              onChange={(e) => setCorreo(e.target.value)}
              required
            />

            <Button type="submit" className="w-full mt-2">
              Enviar instrucciones
            </Button>

            <Link to="/login" className="text-center text-sm text-guinda hover:underline">
              Volver a inicio de sesión
            </Link>
          </form>
        )}
      </div>
    </AuthBackground>
  );
}
