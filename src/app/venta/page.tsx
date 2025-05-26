"use client";

import { useState } from "react";
import CreateSell from "@/components/venta";

export default function VentaPage() {
  const [metodoPago, setMetodoPago] = useState<string>("efectivo");
  const [credito, setCredito] = useState<string>("");
  const [empleado, setEmpleado] = useState<string>("");
  const [producto, setProducto] = useState<string>("");
  const [ventaData, setVentaData] = useState<any | null>(null);
  const [precioUnitario, setprecioUnitario] = useState<number>(0);
  const [cantidad, setCantidad] = useState<number>(0);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!producto || !metodoPago || !empleado || !precioUnitario || !cantidad) {
        alert("Todos los campos obligatorios deben estar llenos.");
        return;
      }
      

    setVentaData({
      metodo_pago: metodoPago,
      credito,
      empleado,
      producto,
      precioUnitario,
      cantidad,
    });
  };

  return (
    <main className="container mx-auto max-w-md py-8">
      <h1 className="text-2xl font-bold mb-4">Crear nueva venta</h1>

      <form onSubmit={handleSubmit} className="space-y-4">

        <div>
          <label>Método de pago:</label>
          <select
            value={metodoPago}
            onChange={(e) => setMetodoPago(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          >
            <option value="efectivo">Efectivo</option>
            <option value="transferencia">Transferencia</option>
          </select>
        </div>

        <div>
          <label>Empleado ID:</label>
          <input
            type="text"
            value={empleado}
            onChange={(e) => setEmpleado(e.target.value)}
            className="w-full border px-3 py-2 rounded"
            required
          />
        </div>

        <div>
          <label>Crédito ID (opcional):</label>
          <input
            type="text"
            value={credito}
            onChange={(e) => setCredito(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <div>
          <label>Producto:</label>
          <input
            type="text"
            value={producto}
            onChange={(e) => setProducto(e.target.value)}
            className="w-full border px-3 py-2 rounded"
          />
        </div>

        <input 
        type="number"
        value={precioUnitario}
        onChange={(e) => setprecioUnitario(parseFloat(e.target.value))}
        className="w-full border px-3 py-2 rounded"
        />

        <input
        type="number"
        value={cantidad}
        onChange={(e) => setCantidad(parseFloat(e.target.value))}
        className="w-full border px-3 py-2 rounded"
        />


        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Crear venta
        </button>
      </form>

      {ventaData && <CreateSell infoVenta={ventaData} />}
    </main>
  );
}