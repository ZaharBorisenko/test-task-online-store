"use client";
import { ProductCard } from "@/components/ProductCard";
import { useProductOrder } from "@/store/store-product";

export default function Page() {
  const order = useProductOrder((state) => state.orderProduct);
  return (
    <div>
      {order.map((o) => (
        <div key={o.orderNumber} className="my-10">
          <div className="my-5">
            <h2>Order № {o.orderNumber}</h2>
            <div>Payment using :{o.paymentMethod}</div>
            <div>Quantity: {o.totalAmount}</div>
          </div>

          {o.items.map((product) => (
            <ProductCard product={product} key={product.id} />
          ))}
        </div>
      ))}
    </div>
  );
}
