"use client"

import { useState } from "react"
import Image from "next/image"
import { Star, ShoppingCart, Check, Minus, Plus } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../components/context/cart-context"

interface ProductSpec {
  name: string
  options: string[]
  required?: boolean
}

interface ProductDetails {
  id: number
  name: string
  category: string
  price: number
  originalPrice?: number
  image: string
  rating: number
  reviews: number
  inStock: boolean
  featured: boolean
  description: string
  sizes?: string[]
  specs?: ProductSpec[]
  colors?: string[]
}

interface ProductDetailsModalProps {
  product: ProductDetails | null
  isOpen: boolean
  onClose: () => void
}

export function ProductDetailsModal({ product, isOpen, onClose }: ProductDetailsModalProps) {
  const [selectedSize, setSelectedSize] = useState<string>("")
  const [selectedColor, setSelectedColor] = useState<string>("")
  const [selectedSpecs, setSelectedSpecs] = useState<Record<string, string>>({})
  const [quantity, setQuantity] = useState(1)

  const { addItem, isInCart, getItemQuantity } = useCart()

  if (!product) return null

  const inCart = isInCart(product.id)
  const cartQuantity = getItemQuantity(product.id)

  const handleSpecChange = (specName: string, value: string) => {
    setSelectedSpecs((prev) => ({
      ...prev,
      [specName]: value,
    }))
  }

  const canAddToCart = () => {
    if (!product.inStock) return false

    // Para ropa, verificar que se haya seleccionado talla
    if (product.category === "Ropa" && product.sizes && !selectedSize) {
      return false
    }

    // Para tecnología, verificar specs requeridas
    if (product.category === "Electrónicos" && product.specs) {
      const requiredSpecs = product.specs.filter((spec) => spec.required)
      return requiredSpecs.every((spec) => selectedSpecs[spec.name])
    }

    return true
  }

  const handleAddToCart = () => {
    if (!canAddToCart()) return

    const cartItem = {
      id: product.id,
      name: product.name,
      price: product.price,
      image: product.image,
      category: product.category,
      inStock: product.inStock,
    }

    // Agregar la cantidad seleccionada
    for (let i = 0; i < quantity; i++) {
      addItem(cartItem)
    }

    // Resetear selecciones
    setSelectedSize("")
    setSelectedColor("")
    setSelectedSpecs({})
    setQuantity(1)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{product.name}</DialogTitle>
        </DialogHeader>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Imagen del producto */}
          <div className="space-y-4">
            <div className="relative aspect-square overflow-hidden rounded-lg">
              <Image src={product.image || "/placeholder.svg"} alt={product.name} fill className="object-cover" />
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
            </div>
          </div>

          {/* Detalles del producto */}
          <div className="space-y-6">
            <div>
              <Badge variant="outline" className="mb-2">
                {product.category}
              </Badge>
              <div className="flex items-center gap-1 mb-2">
                <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                <span className="text-sm font-medium">{product.rating}</span>
                <span className="text-xs text-muted-foreground">({product.reviews} reseñas)</span>
              </div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl font-bold">${product.price}</span>
                {product.originalPrice && (
                  <span className="text-lg text-muted-foreground line-through">${product.originalPrice}</span>
                )}
              </div>
              <p className="text-muted-foreground">{product.description}</p>
            </div>

            <Separator />

            {/* Opciones específicas por categoría */}
            <div className="space-y-4">
              {/* Colores (para todos los productos) */}
              {product.colors && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Color:</label>
                  <div className="flex gap-2">
                    {product.colors.map((color) => (
                      <button
                        key={color}
                        onClick={() => setSelectedColor(color)}
                        className={`w-8 h-8 rounded-full border-2 ${
                          selectedColor === color ? "border-primary" : "border-gray-300"
                        }`}
                        style={{ backgroundColor: color.toLowerCase() }}
                        title={color}
                      />
                    ))}
                  </div>
                </div>
              )}

              {/* Tallas para ropa */}
              {product.category === "Ropa" && product.sizes && (
                <div>
                  <label className="text-sm font-medium mb-2 block">Talla: *</label>
                  <Select value={selectedSize} onValueChange={setSelectedSize}>
                    <SelectTrigger>
                      <SelectValue placeholder="Selecciona una talla" />
                    </SelectTrigger>
                    <SelectContent>
                      {product.sizes.map((size) => (
                        <SelectItem key={size} value={size}>
                          {size}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              )}

              {/* Especificaciones para tecnología */}
              {product.category === "Electrónicos" && product.specs && (
                <div className="space-y-3">
                  <h4 className="font-medium">Configuración:</h4>
                  {product.specs.map((spec) => (
                    <div key={spec.name}>
                      <label className="text-sm font-medium mb-2 block">
                        {spec.name}: {spec.required && "*"}
                      </label>
                      <Select
                        value={selectedSpecs[spec.name] || ""}
                        onValueChange={(value) => handleSpecChange(spec.name, value)}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder={`Selecciona ${spec.name.toLowerCase()}`} />
                        </SelectTrigger>
                        <SelectContent>
                          {spec.options.map((option) => (
                            <SelectItem key={option} value={option}>
                              {option}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              )}

              {/* Cantidad */}
              <div>
                <label className="text-sm font-medium mb-2 block">Cantidad:</label>
                <div className="flex items-center gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="h-8 w-8 p-0"
                  >
                    <Minus className="h-3 w-3" />
                  </Button>
                  <span className="text-sm font-medium w-8 text-center">{quantity}</span>
                  <Button variant="outline" size="sm" onClick={() => setQuantity(quantity + 1)} className="h-8 w-8 p-0">
                    <Plus className="h-3 w-3" />
                  </Button>
                </div>
              </div>
            </div>

            <Separator />

            {/* Botones de acción */}
            <div className="space-y-2">
              <Button
                className="w-full"
                disabled={!canAddToCart()}
                onClick={handleAddToCart}
                variant={inCart ? "secondary" : "default"}
                size="lg"
              >
                {inCart ? (
                  <>
                    <Check className="h-4 w-4 mr-2" />
                    En carrito ({cartQuantity})
                  </>
                ) : (
                  <>
                    <ShoppingCart className="h-4 w-4 mr-2" />
                    Agregar al carrito
                  </>
                )}
              </Button>

              {!canAddToCart() && product.inStock && (
                <p className="text-xs text-muted-foreground text-center">
                  {product.category === "Ropa" && !selectedSize && "Selecciona una talla"}
                  {product.category === "Electrónicos" &&
                    product.specs?.some((spec) => spec.required && !selectedSpecs[spec.name]) &&
                    "Completa la configuración requerida"}
                </p>
              )}
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
