import { ProductsType } from "@/utils/types/products";

export function generateOrderNumber() {
  return "ORD-" + new Date().getTime();
}

export function calculateTotalSum(productCard: ProductsType[]) {
  return productCard.reduce((acc, product) => {
    const productQuantity = product.quantity ?? 1;
    return acc + product.price * productQuantity;
  }, 0);
}
