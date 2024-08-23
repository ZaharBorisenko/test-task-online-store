import { useWalletStore } from "@/store/store-payment";
import { useProductOrder } from "@/store/store-product";
import { ProductsType } from "@/utils/types/products";
import { generateOrderNumber } from "./helpers";

export function handlePayment(
  type: "dollar" | "coin",
  productCard: ProductsType[],
  sum: number,
  clearCart: () => void
) {
  const dollarBalance = useWalletStore.getState().dollarBalance;
  const coinBalance = useWalletStore.getState().coinBalance;
  const deductDollars = useWalletStore.getState().deductDollars;
  const deductCoins = useWalletStore.getState().deductCoins;
  const convertDollarsToCoins = useWalletStore.getState().convertDollarsToCoins;
  const addOrder = useProductOrder.getState().setOrderProduct;

  if (productCard.length === 0) return alert("There are no items in the cart");

  let paymentSuccessful = false;

  if (type === "coin") {
    if (coinBalance >= sum) {
      deductCoins(sum);
      paymentSuccessful = true;
    } else {
      const deficit = sum - coinBalance;
      if (dollarBalance >= deficit) {
        convertDollarsToCoins(deficit);
        deductCoins(sum);
        paymentSuccessful = true;
        alert(
          `Payment successful using Coins with ${deficit.toFixed(
            2
          )} $ converted to Coins`
        );
      }
    }
  } else if (type === "dollar" && dollarBalance >= sum) {
    deductDollars(sum);
    paymentSuccessful = true;
  }

  if (paymentSuccessful) {
    const orderNumber = generateOrderNumber();
    addOrder({
      orderNumber,
      items: productCard,
      totalAmount: sum,
      paymentMethod: type,
    });
    clearCart();
    alert(
      `Payment successful using ${
        type === "dollar" ? "Dollar" : "Coins"
      } Balance. Order Number: ${orderNumber}`
    );
  } else {
    alert("Insufficient balance in both Coins and Dollars");
  }
}
