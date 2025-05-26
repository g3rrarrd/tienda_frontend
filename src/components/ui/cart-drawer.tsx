"use client"

import { useState } from "react"
import Image from "next/image"
import { Minus, Plus, Trash2, ShoppingCart } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import { Separator } from "@/components/ui/separator"
import { useCart } from "../context/cart-context"
import { CartButton } from "../ui/button-cart"

export function CartDrawer() {
  const [isOpen, setIsOpen] = useState(false)
  const { items, total, removeItem, updateQuantity, clearCart, itemCount } = useCart()

  const handleCheckout = () => {
    // Aquí implementarías la lógica de checkout
    alert("Funcionalidad de checkout - Integrar con pasarela de pago")
    setIsOpen(false)
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <CartButton onClick={() => setIsOpen(true)} />
      </SheetTrigger>
      <SheetContent className="w-full sm:max-w-lg">
        <SheetHeader>
          <SheetTitle>Carrito de Compras</SheetTitle>
          <SheetDescription>
            {itemCount === 0
              ? "Tu carrito está vacío"
              : `${itemCount} ${itemCount === 1 ? "producto" : "productos"} en tu carrito`}
          </SheetDescription>
        </SheetHeader>

        <div className="flex flex-col h-full">
          {items.length === 0 ? (
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center">
                <div className="w-24 h-24 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
                  <ShoppingCart className="w-12 h-12 text-gray-400" />
                </div>
                <p className="text-lg font-medium text-gray-900 mb-2">Tu carrito está vacío</p>
                <p className="text-sm text-gray-500">Agrega algunos productos para comenzar</p>
              </div>
            </div>
          ) : (
            <>
              {/* Lista de productos */}
              <div className="flex-1 overflow-y-auto py-4">
                <div className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex items-center space-x-4 p-4 border rounded-lg">
                      <div className="relative w-16 h-16 flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          fill
                          className="object-cover rounded-md"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-sm font-medium text-gray-900 truncate">{item.name}</h3>
                        <Badge variant="outline" className="text-xs mt-1">
                          {item.category}
                        </Badge>
                        <p className="text-sm font-medium text-gray-900 mt-1">${item.price.toFixed(2)}</p>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>

                        <span className="text-sm font-medium w-8 text-center">{item.quantity}</span>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="h-8 w-8 p-0"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="h-8 w-8 p-0 text-red-500 hover:text-red-700"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              {/* Resumen y acciones */}
              <div className="py-4 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-base font-medium">Total:</span>
                  <span className="text-lg font-bold">${total.toFixed(2)}</span>
                </div>

                <div className="space-y-2">
                  <Button onClick={handleCheckout} className="w-full" size="lg">
                    Proceder al Checkout
                  </Button>

                  <Button variant="outline" onClick={clearCart} className="w-full" disabled={items.length === 0}>
                    Vaciar Carrito
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </SheetContent>
    </Sheet>
  )
}
