"use client";

import { useEffect, useState } from 'react';
import { fetchInventario } from '@/lib/inventario';

interface ProductoInfoProps {
  producto: {
    codigo_producto: string;
  };
}

export default function ProductoInventarioInfo({ producto }: ProductoInfoProps) {
  const [inventario, setInventario] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!producto?.codigo_producto) return;

    fetchInventario(producto.codigo_producto)
      .then(setInventario)
      .catch((err) => setError(err.message));
  }, [producto]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!inventario.length) return <p>No hay productos en este inventario.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {inventario.map((p) => (
        <li key={p.codigo_inventario} className="border p-2 rounded bg-white shadow-sm">
          <button>{p.talla}</button>
        </li>
      ))}
    </ul>
  );
}