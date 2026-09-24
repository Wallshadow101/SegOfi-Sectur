import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import Logo from "../components/Logo";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // TODO: conectar con POST /api/auth/forgot-password
    navigate("/login");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-fondo px-4">
      <div className="w-full max-w-[400px] bg-white rounded-2xl shadow-lg border border-borde p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo />
          <div className="text-center">
            <h1 className="text-lg font-bold text-guinda uppercase leading-tight">
              Recuperar contraseña
            </h1>
            <p className="text-xs text-texto-secundario">
              Te enviaremos instrucciones a tu correo institucional
            </p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input label="Correo institucional" type="email" placeholder="nombre@puebla.gob.mx" required />

          <Button type="submit" className="w-full mt-2">
            Enviar instrucciones
          </Button>

          <Link to="/login" className="text-center text-sm text-guinda hover:underline">
            Volver a inicio de sesión
          </Link>
        </form>
      </div>
    </div>
  );
}
