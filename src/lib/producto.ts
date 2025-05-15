const API_URL = 'http://localhost:8000/api/';

export async function fetchProductoInventario(codigoInventario: string) {
  
  const url = `${API_URL}producto/inventario/?codigo_inventario=${encodeURIComponent(codigoInventario)}`;

  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    }
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Error ${res.status}`);
  }

  const data = await res.json();
  return data as Array<{
    codigo_producto: string;
    tipo_producto: string;
    talla: string;
    color: string;
  }>;
}
