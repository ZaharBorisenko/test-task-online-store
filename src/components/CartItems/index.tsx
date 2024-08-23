import { useMemo } from "react";

import { ProductCard } from "@/components/ProductCard";
import { ProductsType } from "@/utils/types/products";

interface CartItemsProps {
  products: ProductsType[];
}

export function CartItems({ products }: CartItemsProps) {
  const memoizedProductCard = useMemo(() => products, [products]);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {memoizedProductCard.map((product) => (
        <ProductCard key={product.id} product={product} type="cart" />
      ))}
    </div>
  );
}
