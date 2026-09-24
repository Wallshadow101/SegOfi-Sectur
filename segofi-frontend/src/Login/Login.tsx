import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Input from "../components/Input";
import Button from "../components/Button";
import { useAuth } from "../Guards/useAuth";
import { TEST_USERS } from "../Guards/testUsers";
import Logo from "../components/Logo";

export default function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [correo, setCorreo] = useState("");
  const [contrasena, setContrasena] = useState("");
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);

    // TODO: reemplazar por POST /api/auth/login — el backend regresa el JWT
    // con el rol como claim; login() debe recibir ese rol real, no uno fijo.
    // Mientras tanto, valida contra Guards/testUsers.ts.
    const usuario = TEST_USERS.find(
      (u) => u.correo === correo.trim().toLowerCase() && u.contrasena === contrasena
    );

    if (!usuario) {
      setError("Correo o contraseña incorrectos.");
      return;
    }

    login(usuario);
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center bg-fondo px-4">
      <div className="w-fullmax-w-[400px] bg-white rounded-2xl shadow-lg border border-borde p-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
        <div className="flex flex-col items-center gap-3 mb-6">
          <Logo />
          <div className="text-center">
            <h1 className="text-lg font-bold text-guinda uppercase leading-tight">
              Sistema de Correspondencia
            </h1>
            <p className="text-xs text-texto-secundario">Gobierno del Estado de Puebla</p>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <Input
            label="Correo institucional"
            type="email"
            placeholder="nombre@puebla.gob.mx"
            value={correo}
            onChange={(e) => setCorreo(e.target.value)}
            required
          />
          <Input
            label="Contraseña"
            type="password"
            placeholder="••••••••"
            value={contrasena}
            onChange={(e) => setContrasena(e.target.value)}
            required
          />

          {error && (
            <p className="text-sm text-red-600 -mt-1 animate-in fade-in duration-200">{error}</p>
          )}

          <Button type="submit" className="w-full mt-2">
            Iniciar sesión
          </Button>

          <Link to="/recuperar-password" className="text-center text-sm text-guinda hover:underline">
            ¿Olvidaste tu contraseña?
          </Link>

          <p className="text-center text-sm text-texto-secundario">
            ¿No tienes cuenta?{" "}
            <Link to="/registro" className="text-guinda hover:underline">
              Crear cuenta
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
}
