"use client";
import { useProductStore } from "@/store/store-product";
import { useProductsQuery } from "@/hooks/useProductsQuery";
import { ProductCard } from "@/components/ProductCard";
import { useMemo } from "react";

export default function Page() {
  const products = useProductStore((state) => state.product);
  const memoizedProducts = useMemo(() => products, [products]);

  const { data, isError, isLoading } = useProductsQuery();

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      <h1 className="text-center mb-5 text-4xl font-extrabold">All Products</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 px-5 md:px-0">
        {memoizedProducts.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </>
  );
}
