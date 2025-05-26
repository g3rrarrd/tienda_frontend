const API_URL = 'http://localhost:8000/api/';

export async function fetchCreateSell(venta : {'metodo_pago' : string, 'credito' : string, 'empleado_id' : string, 'cantidad' : number, 'precio_unitario' : number, 'producto_id' : string }) {

  const url = `${API_URL}venta/crear/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      metodo_pago : venta.metodo_pago,
      fecha : Date.now(),
      credito_id : venta.credito,
      empleado_id : venta.empleado_id,
      cantidad : venta.cantidad,
      producto_id : venta.producto_id,
      precio_unitario : venta.precio_unitario
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Error ${res.status}`);
  }

  return res.json(); 
}