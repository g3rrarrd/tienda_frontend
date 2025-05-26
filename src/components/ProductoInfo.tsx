"use client";

import { useEffect, useState } from "react";
import { fetchProducto } from "@/lib/producto";
import ProductoInventarioInfo from "./InventarioLista";

export default function ProductoInfo() {
  const [productos, setProductos] = useState<any[]>([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState<any | null>(null);

  useEffect(() => {
    async function loadProductos() {
      const data = await fetchProducto();
      setProductos(data);
    }

    loadProductos();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {productos.map((prod) => (
          <div key={prod.codigo_producto} className="border p-4 rounded-lg">
            <h3 className="font-bold">{prod.nombre}</h3>
            <p>producto: {prod.tipo_producto}</p>
            <p>precio_venta: {prod.precio_venta}</p>
            <button
              onClick={() => setProductoSeleccionado(prod)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {productoSeleccionado && (
        <ProductoInventarioInfo producto={productoSeleccionado} />
      )}
    </div>
  );
}