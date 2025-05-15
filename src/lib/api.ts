const API_URL = "http://localhost:8000/api/"

export const fetchInventario = async() =>
{
    const res = await fetch(`${API_URL}inventario/inventario/`)
    return await res.json()
};