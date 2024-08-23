export const routes = {
  home() {
    return "/";
  },
  allProduct() {
    return "/products";
  },
  product(slug: string) {
    return `products/${slug}`;
  },
  card() {
    return "/card";
  },
  order() {
    return "/order";
  },
};
