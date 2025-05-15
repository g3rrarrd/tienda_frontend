import { useEffect, useState } from 'react';
import { fetchProductoInventario } from '@/lib/producto';

interface ProductoInfoProps {
  producto: {
    codigo_inventario: string;
  };
}

export default function ProductoInfo({ producto }: ProductoInfoProps) {
  const [productos, setProductos] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!producto?.codigo_inventario) return;

    fetchProductoInventario(producto.codigo_inventario)
      .then(setProductos)
      .catch((err) => setError(err.message));
  }, [producto]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!productos.length) return <p>No hay productos en este inventario.</p>;

  return (
    <ul className="mt-4 space-y-2">
      {productos.map((p) => (
        <li key={p.codigo_producto} className="border p-2 rounded bg-white shadow-sm">
          <strong>{p.tipo_producto}</strong> — Talla: {p.talla} | Color: {p.color}
        </li>
      ))}
    </ul>
  );
}