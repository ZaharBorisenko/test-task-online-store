import { fetchProductById } from "@/api/api";
import { useProductStore } from "@/store/store-product";
import { useQuery } from "react-query";

export const useProductQuery = (id: number) => {
  const setSelectedProduct = useProductStore(
    (state) => state.setSelectedProduct
  );

  return useQuery(["product", id], () => fetchProductById(id), {
    onSuccess: (response) => {
      const product = {
        id: response.data.id,
        title: response.data.title,
        price: response.data.price,
      };
      setSelectedProduct(product);
    },
  });
};
