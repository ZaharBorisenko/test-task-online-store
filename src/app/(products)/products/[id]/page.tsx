"use client";

import { ProductCard } from "@/components/ProductCard";
import { useProductQuery } from "@/hooks/useProductQuery";
import { useProductStore } from "@/store/store-product";

export default function Page({ params }: { params: { id: string } }) {
  const product = useProductStore((state) => state.selectedProduct);
  const { data, isError, isLoading } = useProductQuery(Number(params.id));

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error</p>;

  return (
    <>
      <h1 className="text-center mb-5 text-4xl font-extrabold">
        Product:{product?.title}
      </h1>
      {product && <ProductCard product={product} mode="full" />}
    </>
  );
}
