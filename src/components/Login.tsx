"use client";

import { useEffect, useState } from 'react';
import { fetchValidateUser } from '@/lib/usuario';

interface UsuarioInfoProps {
  credenciales: {
    dni: string;
    password: string;
  };
}

export default function LoginInfo({ credenciales }: UsuarioInfoProps) {
  const [usuarioValido, setUsuarioValido] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!credenciales?.dni || !credenciales?.password) return;

    fetchValidateUser(credenciales.dni, credenciales.password)
      .then(setUsuarioValido)
      .catch((err) => setError(err.message));
  }, [credenciales]);

  if (error) return <p className="text-red-500">Error: {error}</p>;
  if (!usuarioValido) return <p>No es usuario válido</p>;

  return (
    <div className="mt-4 p-4 border rounded bg-gray-50">
      <p className="text-green-600 font-bold">Usuario válido:</p>
      <ul>
        <li><strong>ID:</strong> {usuarioValido.identidad}</li>
        <li><strong>Nombre:</strong> {usuarioValido.nombres}</li>
        <li><strong>Correo:</strong> {usuarioValido.correo}</li>
      </ul>
    </div>
  );
}
