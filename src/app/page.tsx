'use client';

import { useState } from "react";
import LoginInfo from "@/components/Login";

export default function Login() {
  const [dni, setDni] = useState("");
  const [password, setPassword] = useState('');
  const [credenciales, setCredenciales] = useState<{dni : string; password : string} | null>(null);

  const handleLogin = () => {
    if (!dni || !password){
      alert("Debe ingresar ambos campos");
      return;
    }

    setCredenciales({dni, password})
  };

   return (
    <main className="container mx-auto py-8 max-w-md">
      <h1 className="text-2xl font-bold mb-4">Iniciar sesión</h1>

      <label className="block mb-4">
        <p className="mb-1">DNI</p>
        <input
          type="text"
          id="dni"
          className="border px-3 py-2 w-full rounded"
          value={dni}
          onChange={(e) => setDni(e.target.value)}
        />
      </label>

      <label className="block mb-4">
        <p className="mb-1">Contraseña</p>
        <input
          type="password"
          id="password"
          className="border px-3 py-2 w-full rounded"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
      </label>

      <button
        onClick={handleLogin}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        Validar usuario
      </button>

      {/* Mostrar resultados */}
      {credenciales && <LoginInfo credenciales={credenciales} />}
    </main>
  );
}
