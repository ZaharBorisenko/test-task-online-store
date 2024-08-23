import { Button } from "@/ui/Button";
import { Sidebar } from "@/ui/Sidebar";
import { useWalletStore } from "@/store/store-payment";

interface PaymentSidebarProps {
  active: boolean;
  sum: number;
  paymentMethod: "dollar" | "coin";
  setPaymentMethod: (method: "dollar" | "coin") => void;
  setActivePayment: (active: boolean) => void;
  handlePayment: () => void;
}

export function PaymentSidebar({
  active,
  sum,
  paymentMethod,
  setPaymentMethod,
  setActivePayment,
  handlePayment,
}: PaymentSidebarProps) {
  const coinBalance = useWalletStore((state) => state.coinBalance);
  const dollarBalance = useWalletStore((state) => state.dollarBalance);
  const convertDollarsToCoins = useWalletStore(
    (state) => state.convertDollarsToCoins
  );

  const handleConvertToCoins = () => {
    const deficit = sum - coinBalance;
    if (dollarBalance >= deficit) {
      convertDollarsToCoins(deficit);
      alert(`Converted ${deficit.toFixed(2)} $ to Coins`);
    } else {
      alert("Insufficient dollars to convert to Coins");
    }
  };

  return (
    <Sidebar
      active={active}
      onClick={() => setActivePayment(false)}
      onPayment={handlePayment}
    >
      <div className="p-5">
        <h2 className="text-2xl mb-4">Choose Payment Method</h2>
        <div className="mb-4">
          <Button
            onClick={() => setPaymentMethod("coin")}
            type={paymentMethod === "coin" ? "primaryBlue" : "primary"}
          >
            Bonus wallet: {coinBalance.toFixed(2)} Coin
          </Button>
          {coinBalance < sum && (
            <div className="text-red-500 mt-2">
              Not enough Coins. You need {(sum - coinBalance).toFixed(2)}
              <Button onClick={handleConvertToCoins} type="primary">
                Convert $ to Coins
              </Button>
            </div>
          )}
        </div>
        <Button
          onClick={() => setPaymentMethod("dollar")}
          type={paymentMethod === "dollar" ? "primaryBlue" : "primary"}
        >
          internal wallet: (${dollarBalance.toFixed(2)})
        </Button>
      </div>
    </Sidebar>
  );
}
