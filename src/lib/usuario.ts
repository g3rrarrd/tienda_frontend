const API_URL = 'http://localhost:8000/api/';

export async function fetchValidateUser(dni: string, password: string) {
  const url = `${API_URL}usuario/validar/`;

  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      identidad: dni,
      contrasenia: password,
    }),
  });

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}));
    throw new Error(errorBody.error || `Error ${res.status}`);
  }

  return res.json(); 
}