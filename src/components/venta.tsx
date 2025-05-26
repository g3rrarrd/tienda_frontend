import { useEffect, useState } from 'react';
import { fetchCreateSell } from '@/lib/venta'; 

interface VentaInfoProps {
  infoVenta: {
    metodo_pago : string;
    credito : string;
    empleado_id : string; 
    cantidad : number;
    precio_unitario : number;
    producto_id : string;
  };
}

export default function CreateSell({ infoVenta }: VentaInfoProps) {
  const [venta, setVenta] = useState<any[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!infoVenta?.producto_id || 
        !infoVenta?.metodo_pago ||
        !infoVenta?.empleado_id
    ) return;

    fetchCreateSell(infoVenta)
      .then(setVenta)
      .catch((err) => setError(err.message));
  }, [infoVenta]);

  if (error) return <p className="text-red-500">{error}</p>;
  if (!venta) return <p>No se pudo hacer la venta</p>;

  return (
    <ul className="mt-4 space-y-2">
      <p>Venta hecha</p>
    </ul>
  );
}