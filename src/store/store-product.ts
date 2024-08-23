import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { CartStore, OrderStore, ProductStore } from "@/utils/types/products";

export const useProductStore = create<ProductStore>()(
  immer((set) => ({
    product: [],
    selectedProduct: null,
    setProduct: (products) => set({ product: products }),
    setSelectedProduct: (product) => set({ selectedProduct: product }),
  }))
);

export const useProductOrder = create<OrderStore>()(
  persist(
    immer((set) => ({
      orderProduct: [],
      setOrderProduct: (newOrder) =>
        set((state) => {
          state.orderProduct.push(newOrder);
        }),
    })),
    {
      name: "order-store",
    }
  )
);

export const useCartStore = create<CartStore>()(
  persist(
    immer((set) => ({
      productCart: [],
      addProductToCart: (product) =>
        set((state) => {
          const existingProduct = state.productCart.find(
            (item) => item.id === product.id
          );

          if (existingProduct) {
            return {
              productCart: state.productCart.map((item) =>
                item.id === product.id
                  ? {
                      ...item,
                      quantity: (item.quantity ?? 1) + 1,
                    }
                  : item
              ),
            };
          } else {
            return {
              productCart: [...state.productCart, { ...product, quantity: 1 }],
            };
          }
        }),
      removeProductFromCart: (productId) =>
        set((state) => ({
          productCart: state.productCart.filter(
            (item) => item.id !== productId
          ),
        })),
      incrementProductQuantity: (productId) =>
        set((state) => ({
          productCart: state.productCart.map((item) =>
            item.id === productId
              ? { ...item, quantity: (item.quantity ?? 1) + 1 }
              : item
          ),
        })),
      decrementProductQuantity: (productId) =>
        set((state) => ({
          productCart: state.productCart.map((item) =>
            item.id === productId && (item.quantity ?? 1) > 1
              ? { ...item, quantity: (item.quantity ?? 1) - 1 }
              : item
          ),
        })),
      clearCart: () =>
        set({
          productCart: [],
        }),
    })),
    {
      name: "cart-store",
    }
  )
);
