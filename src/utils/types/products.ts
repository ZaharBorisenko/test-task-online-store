export interface ProductsType {
  id: number;
  price: number;
  title: string;
  quantity?: number;
}
export interface ProductStore {
  product: ProductsType[];
  setProduct: (products: ProductsType[]) => void;
  selectedProduct: ProductsType | null;
  setSelectedProduct: (product: ProductsType) => void;
}
export interface CartStore {
  productCart: ProductsType[];
  addProductToCart: (product: ProductsType) => void;
  removeProductFromCart: (productId: number) => void;
  incrementProductQuantity: (productId: number) => void;
  decrementProductQuantity: (productId: number) => void;
  clearCart: () => void;
}
export interface OrderProduct {
  orderNumber: string;
  items: ProductsType[];
  totalAmount: number;
  paymentMethod: "dollar" | "coin";
}

export interface OrderStore {
  orderProduct: OrderProduct[];
  setOrderProduct: (newOrder: OrderProduct) => void;
}

export interface WalletStore {
  dollarBalance: number;
  coinBalance: number;
  addDollars: (amount: number) => void;
  addCoins: (amount: number) => void;
  deductDollars: (amount: number) => void;
  deductCoins: (amount: number) => void;
  convertDollarsToCoins: (amount: number) => void;
}
