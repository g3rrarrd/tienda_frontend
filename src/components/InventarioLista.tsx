"use client";

import { useEffect, useState } from "react";
import { fetchInventario } from "@/lib/inventario";
import ProductoInfo from "./ProductoInfo";

export default function InventarioLista() {
  const [inventario, setInventario] = useState<any[]>([]);
  const [productSelect, setProductSelect] = useState<any | null>(null);

  useEffect(() => {
    async function loadInventario() {
      const data = await fetchInventario();
      setInventario(data);
    }

    loadInventario();
  }, []);

  return (
    <div className="p-4">
      <div className="grid grid-cols-3 gap-4">
        {inventario.map((inv) => (
          <div key={inv.codigo_inventario} className="border p-4 rounded-lg">
            <h3 className="font-bold">{inv.nombre || inv.codigo_inventario}</h3>
            <p>Precio: ${inv.precio_venta}</p>
            <button
              onClick={() => setProductSelect(inv)}
              className="bg-blue-500 text-white px-3 py-1 rounded mt-2"
            >
              Ver detalles
            </button>
          </div>
        ))}
      </div>

      {/* Mostrar detalles del producto seleccionado */}
      {productSelect && (
        <ProductoInfo producto={productSelect} />
      )}
    </div>
  );
}

