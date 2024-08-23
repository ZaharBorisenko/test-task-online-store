import React from "react";
import Link from "next/link";
import { FaCircleCheck } from "react-icons/fa6";
import { IoIosCart } from "react-icons/io";

import { ProductsType } from "@/utils/types/products";
import { routes } from "@/routes";
import { useCartStore } from "@/store/store-product";

interface ProductCardProps {
  product: ProductsType;
  mode?: "full" | "card";
  type?: "cart" | "card";
}

export const ProductCard = ({
  product,
  mode = "card",
  type = "card",
}: ProductCardProps) => {
  const addProductToCart = useCartStore((state) => state.addProductToCart);
  const productCart = useCartStore((state) => state.productCart);
  const isInCart = productCart.some((item) => item.id === product.id);

  const incrementProductQuantity = useCartStore(
    (state) => state.incrementProductQuantity
  );
  const decrementProductQuantity = useCartStore(
    (state) => state.decrementProductQuantity
  );
  const deleteProduct = useCartStore((state) => state.removeProductFromCart);

  return (
    <div className="w-full bg-white rounded-xl p-5 min-h-96 flex flex-col">
      <div className="bg-gray-200 text-red-500 w-full h-full max-h-48 flex justify-center text-4xl items-center rounded-2xl">
        ?
      </div>

      {mode === "card" ? (
        <Link
          href={routes.product(`${product.id}`)}
          className="text-2xl font-extrabold mt-5 flex-grow"
        >
          {product.title}
        </Link>
      ) : (
        <h3 className="text-2xl font-extrabold mt-5 flex-grow">
          {product.title}
        </h3>
      )}

      <div className="flex justify-between items-center">
        <p className="text-3xl font-extrabold">
          ${(product.price * (product.quantity ?? 1)).toFixed(2)}
        </p>
        <div>
          {type === "card" ? (
            <div>
              {isInCart ? (
                <button className="outline-none bg-slate-200 p-3 rounded-2xl">
                  <FaCircleCheck size={36} color="green" />
                </button>
              ) : (
                <button
                  className="outline-none bg-orange-500 p-3 rounded-2xl"
                  onClick={() => addProductToCart(product)}
                >
                  <IoIosCart size={36} color="#fff" />
                </button>
              )}
            </div>
          ) : (
            <div className="flex items-center gap-x-4">
              <button
                className="p-5 rounded-2xl bg-green-500 text-2xl"
                onClick={() => incrementProductQuantity(product.id)}
              >
                +
              </button>
              <p className="text-4xl font-extrabold">{product.quantity ?? 1}</p>
              <button
                className="p-5 rounded-2xl bg-red-500 text-2xl"
                onClick={() =>
                  product.quantity === 1
                    ? deleteProduct(product.id)
                    : decrementProductQuantity(product.id)
                }
              >
                -
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
