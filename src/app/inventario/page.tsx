import InventarioLista from "@/components/InventarioLista";

export default function inventarioPage() {
  return (
    <main className="container mx-auto py-8">
      <h1 className="text-3xl font-bold mb-6">Tienda Online</h1>
      <InventarioLista />
    </main>
  );
}