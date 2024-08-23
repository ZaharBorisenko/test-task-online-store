import { create } from "zustand";
import { immer } from "zustand/middleware/immer";
import { persist } from "zustand/middleware";
import { WalletStore } from "@/utils/types/products";

export const useWalletStore = create<WalletStore>()(
  persist(
    immer((set) => ({
      dollarBalance: 50,
      coinBalance: 20,

      addDollars: (amount) =>
        set((state) => {
          state.dollarBalance += amount;
        }),

      addCoins: (amount) =>
        set((state) => {
          state.coinBalance += amount;
        }),

      deductDollars: (amount) =>
        set((state) => {
          state.dollarBalance -= amount;
        }),

      deductCoins: (amount) =>
        set((state) => {
          state.coinBalance -= amount;
        }),

      convertDollarsToCoins: (amount) =>
        set((state) => {
          if (state.dollarBalance >= amount) {
            state.dollarBalance -= amount;
            state.coinBalance += amount;
          }
        }),
    })),
    {
      name: "wallet-store",
    }
  )
);
