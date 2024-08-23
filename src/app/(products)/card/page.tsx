"use client";
import { useState } from "react";

import { Button } from "@/ui/Button";
import { useCartStore } from "@/store/store-product";
import { calculateTotalSum } from "@/utils/helpers";
import { CartItems } from "@/components/CartItems";
import { PaymentSidebar } from "@/components/PaymentSidebar";
import { handlePayment } from "@/utils/paymentHandler";

export default function Page() {
  const [activePayment, setActivePayment] = useState<boolean>(false);
  const [paymentMethod, setPaymentMethod] = useState<"dollar" | "coin">(
    "dollar"
  );

  const productCard = useCartStore((state) => state.productCart);
  const clearCart = useCartStore((state) => state.clearCart);

  const sum = calculateTotalSum(productCard);

  return (
    <div>
      <div className="flex flex-col gap-y-5 md:flex-row justify-between items-center mb-5">
        <div className="max-w-96 w-full">
          <Button type="primary" onClick={clearCart}>
            Clear cart
          </Button>
        </div>
        <div className="max-w-96 w-full">
          <Button type="primaryBlue" onClick={() => setActivePayment(true)}>
            Payment(${sum.toFixed(2)})
          </Button>
        </div>
      </div>

      {productCard.length === 0 && (
        <h1 className="text-center text-4xl font-extrabold">
          The cart is empty...
        </h1>
      )}

      <CartItems products={productCard} />

      {activePayment && (
        <PaymentSidebar
          active={activePayment}
          sum={sum}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          setActivePayment={setActivePayment}
          handlePayment={() =>
            handlePayment(paymentMethod, productCard, sum, clearCart)
          }
        />
      )}
    </div>
  );
}
