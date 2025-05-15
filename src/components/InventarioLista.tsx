import { fetchInventario } from "@/lib/api";

export default async function InventarioLista(){
    const inventario = await fetchInventario();

    return(
        <div className="grid grid-cols-3 gap-4">
            {inventario.map((inv: any) => (
                console.log(inv),
                <div key={inv.codigo_inventario} className="border p-4 rounded-lg">
                <h3 className="font-bold">{inv.nombre}</h3>
                <p>Precio: ${inv.precio_venta}</p>
                <button className="bg-blue-500 text-white px-3 py-1 rounded mt-2">
                    Añadir al carrito
                </button>
                </div>
            ))}
        </div>
    );
}