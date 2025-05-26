"use client"

import { ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useCart } from "../context/cart-context"

interface CartButtonProps {
  onClick: () => void
}

export function CartButton({ onClick }: CartButtonProps) {
  const { itemCount } = useCart()

  return (
    <Button variant="outline" size="sm" onClick={onClick} className="relative">
      <ShoppingCart className="h-4 w-4" />
      {itemCount > 0 && (
        <Badge
          variant="destructive"
          className="absolute -top-2 -right-2 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs"
        >
          {itemCount > 99 ? "99+" : itemCount}
        </Badge>
      )}
    </Button>
  )
}