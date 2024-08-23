import { useQuery } from "react-query";
import { fetchProducts } from "@/api/api";
import { useProductStore } from "@/store/store-product";
import { ProductsType } from "@/utils/types/products";

export const useProductsQuery = () => {
  const setProduct = useProductStore((state) => state.setProduct);

  return useQuery("products", fetchProducts, {
    onSuccess: (response) => {
      const products: ProductsType[] = response.data.products.map(
        (p: ProductsType) => ({
          id: p.id,
          title: p.title,
          price: p.price,
        })
      );
      setProduct(products);
    },
  });
};
