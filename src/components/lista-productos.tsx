"use client"

import { useState, useMemo } from "react"
import Image from "next/image"
import { Search, Filter, Grid, List, Star, ShoppingCart, Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardFooter } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuCheckboxItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useCart } from "../components/context/cart-context"
import { CartDrawer } from "../components/ui/cart-drawer"

// Datos de ejemplo de productos
const products = [
  {
    id: 1,
    name: "Smartphone Galaxy Pro",
    category: "Electrónicos",
    price: 899.99,
    originalPrice: 999.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.5,
    reviews: 128,
    inStock: true,
    featured: true,
  },
  {
    id: 2,
    name: "Laptop Gaming RGB",
    category: "Electrónicos",
    price: 1299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.8,
    reviews: 89,
    inStock: true,
    featured: false,
  },
  {
    id: 3,
    name: "Auriculares Bluetooth",
    category: "Electrónicos",
    price: 199.99,
    originalPrice: 249.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.3,
    reviews: 256,
    inStock: true,
    featured: true,
  },
  {
    id: 4,
    name: "Camiseta Deportiva",
    category: "Ropa",
    price: 29.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.1,
    reviews: 45,
    inStock: true,
    featured: false,
  },
  {
    id: 5,
    name: "Zapatillas Running",
    category: "Ropa",
    price: 129.99,
    originalPrice: 159.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.6,
    reviews: 178,
    inStock: false,
    featured: true,
  },
  {
    id: 6,
    name: "Cafetera Automática",
    category: "Hogar",
    price: 299.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.4,
    reviews: 92,
    inStock: true,
    featured: false,
  },
  {
    id: 7,
    name: "Set de Sartenes",
    category: "Hogar",
    price: 89.99,
    originalPrice: 119.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.2,
    reviews: 67,
    inStock: true,
    featured: false,
  },
  {
    id: 8,
    name: "Libro de Cocina",
    category: "Libros",
    price: 24.99,
    image: "/placeholder.svg?height=300&width=300",
    rating: 4.7,
    reviews: 134,
    inStock: true,
    featured: false,
  },
]

const categories = ["Todos", "Electrónicos", "Ropa", "Hogar", "Libros"]

export default function ProductList() {
  const [searchTerm, setSearchTerm] = useState("")
  const [selectedCategory, setSelectedCategory] = useState("Todos")
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [priceRange, setPriceRange] = useState<string[]>([])
  const [showInStockOnly, setShowInStockOnly] = useState(false)

  const { addItem, isInCart, getItemQuantity } = useCart()

  // Filtrar y ordenar productos
  const filteredProducts = useMemo(() => {
    const filtered = products.filter((product) => {
      const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase())
      const matchesCategory = selectedCategory === "Todos" || product.category === selectedCategory
      const matchesStock = !showInStockOnly || product.inStock

      let matchesPrice = true
      if (priceRange.length > 0) {
        matchesPrice = priceRange.some((range) => {
          switch (range) {
            case "0-50":
              return product.price <= 50
            case "50-100":
              return product.price > 50 && product.price <= 100
            case "100-500":
              return product.price > 100 && product.price <= 500
            case "500+":
              return product.price > 500
            default:
              return true
          }
        })
      }

      return matchesSearch && matchesCategory && matchesStock && matchesPrice
    })

    // Ordenar productos
    switch (sortBy) {
      case "price-low":
        filtered.sort((a, b) => a.price - b.price)
        break
      case "price-high":
        filtered.sort((a, b) => b.price - a.price)
        break
      case "rating":
        filtered.sort((a, b) => b.rating - a.rating)
        break
      case "name":
        filtered.sort((a, b) => a.name.localeCompare(b.name))
        break
      default:
        filtered.sort((a, b) => (b.featured ? 1 : 0) - (a.featured ? 1 : 0))
    }

    return filtered
  }, [searchTerm, selectedCategory, sortBy, priceRange, showInStockOnly])

  const handlePriceRangeChange = (range: string, checked: boolean) => {
    if (checked) {
      setPriceRange([...priceRange, range])
    } else {
      setPriceRange(priceRange.filter((r) => r !== range))
    }
  }

  const handleAddToCart = (product: (typeof products)[0]) => {
    addItem({
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
    })
  }

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Header con carrito */}
      <div className="mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-bold mb-2">Catálogo de Productos</h1>
          <p className="text-muted-foreground">Descubre nuestra amplia variedad de productos</p>
        </div>
        <CartDrawer />
      </div>

      {/* Barra de búsqueda y filtros */}
      <div className="mb-6 space-y-4">
        {/* Búsqueda principal */}
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            placeholder="Buscar productos..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 h-12"
          />
        </div>

        {/* Filtros y controles */}
        <div className="flex flex-wrap gap-4 items-center justify-between">
          <div className="flex flex-wrap gap-4 items-center">
            {/* Categorías */}
            <Select value={selectedCategory} onValueChange={setSelectedCategory}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Categoría" />
              </SelectTrigger>
              <SelectContent>
                {categories.map((category) => (
                  <SelectItem key={category} value={category}>
                    {category}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Filtro de precio */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="outline">
                  <Filter className="h-4 w-4 mr-2" />
                  Precio
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56">
                <DropdownMenuLabel>Rango de precio</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem
                  checked={priceRange.includes("0-50")}
                  onCheckedChange={(checked) => handlePriceRangeChange("0-50", checked)}
                >
                  $0 - $50
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priceRange.includes("50-100")}
                  onCheckedChange={(checked) => handlePriceRangeChange("50-100", checked)}
                >
                  $50 - $100
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priceRange.includes("100-500")}
                  onCheckedChange={(checked) => handlePriceRangeChange("100-500", checked)}
                >
                  $100 - $500
                </DropdownMenuCheckboxItem>
                <DropdownMenuCheckboxItem
                  checked={priceRange.includes("500+")}
                  onCheckedChange={(checked) => handlePriceRangeChange("500+", checked)}
                >
                  $500+
                </DropdownMenuCheckboxItem>
                <DropdownMenuSeparator />
                <DropdownMenuCheckboxItem checked={showInStockOnly} onCheckedChange={setShowInStockOnly}>
                  Solo en stock
                </DropdownMenuCheckboxItem>
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Ordenar */}
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Destacados</SelectItem>
                <SelectItem value="name">Nombre A-Z</SelectItem>
                <SelectItem value="price-low">Precio: Menor a Mayor</SelectItem>
                <SelectItem value="price-high">Precio: Mayor a Menor</SelectItem>
                <SelectItem value="rating">Mejor Valorados</SelectItem>
              </SelectContent>
            </Select>
          </div>

          {/* Vista */}
          <div className="flex gap-2">
            <Button variant={viewMode === "grid" ? "default" : "outline"} size="sm" onClick={() => setViewMode("grid")}>
              <Grid className="h-4 w-4" />
            </Button>
            <Button variant={viewMode === "list" ? "default" : "outline"} size="sm" onClick={() => setViewMode("list")}>
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Resultados */}
      <div className="mb-4">
        <p className="text-sm text-muted-foreground">
          Mostrando {filteredProducts.length} de {products.length} productos
        </p>
      </div>

      {/* Lista de productos */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-12">
          <p className="text-lg text-muted-foreground mb-2">No se encontraron productos</p>
          <p className="text-sm text-muted-foreground">Intenta ajustar tus filtros de búsqueda</p>
        </div>
      ) : (
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6" : "space-y-4"
          }
        >
          {filteredProducts.map((product) => {
            const inCart = isInCart(product.id)
            const quantity = getItemQuantity(product.id)

            return (
              <Card
                key={product.id}
                className={`group hover:shadow-lg transition-shadow ${viewMode === "list" ? "flex flex-row" : ""}`}
              >
                <div className={viewMode === "list" ? "w-48 flex-shrink-0" : ""}>
                  <div className="relative overflow-hidden rounded-t-lg">
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      width={300}
                      height={300}
                      className={`object-cover group-hover:scale-105 transition-transform ${
                        viewMode === "list" ? "h-32 w-full" : "h-48 w-full"
                      }`}
                    />
                    {product.featured && (
                      <Badge className="absolute top-2 left-2" variant="secondary">
                        Destacado
                      </Badge>
                    )}
                    {product.originalPrice && (
                      <Badge className="absolute top-2 right-2" variant="destructive">
                        Oferta
                      </Badge>
                    )}
                    {!product.inStock && (
                      <div className="absolute inset-0 bg-black/50 flex items-center justify-center">
                        <Badge variant="secondary">Agotado</Badge>
                      </div>
                    )}
                    {inCart && (
                      <Badge className="absolute bottom-2 right-2 bg-green-500">En carrito ({quantity})</Badge>
                    )}
                  </div>
                </div>

                <div className="flex-1">
                  <CardContent className={`p-4 ${viewMode === "list" ? "pb-2" : ""}`}>
                    <div className="space-y-2">
                      <Badge variant="outline" className="text-xs">
                        {product.category}
                      </Badge>
                      <h3 className="font-semibold line-clamp-2">{product.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{product.rating}</span>
                        <span className="text-xs text-muted-foreground">({product.reviews} reseñas)</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-lg font-bold">${product.price}</span>
                        {product.originalPrice && (
                          <span className="text-sm text-muted-foreground line-through">${product.originalPrice}</span>
                        )}
                      </div>
                    </div>
                  </CardContent>

                  <CardFooter className={`p-4 pt-0 ${viewMode === "list" ? "mt-auto" : ""}`}>
                    <Button
                      className="w-full"
                      disabled={!product.inStock}
                      onClick={() => handleAddToCart(product)}
                      variant={inCart ? "secondary" : "default"}
                    >
                      {inCart ? (
                        <>
                          <Check className="h-4 w-4 mr-2" />
                          Agregado ({quantity})
                        </>
                      ) : (
                        <>
                          <ShoppingCart className="h-4 w-4 mr-2" />
                          {product.inStock ? "Agregar al carrito" : "Agotado"}
                        </>
                      )}
                    </Button>
                  </CardFooter>
                </div>
              </Card>
            )
          })}
        </div>
      )}
    </div>
  )
}
