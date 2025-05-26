const API_URL = 'http://localhost:8000/api/';

export const fetchProducto = async() =>
{
    const res = await fetch(`${API_URL}producto/producto/`)
    return await res.json()
};
