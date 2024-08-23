import React from "react";
import { Button } from "@/ui/Button";

interface SidebarProps {
  active: boolean;
  onClick: (active: boolean) => void;
  onPayment: () => void;
  children: React.ReactNode;
}

export const Sidebar = ({
  active,
  onClick,
  children,
  onPayment,
}: SidebarProps) => {
  return (
    <div
      className={`fixed top-0 right-0 w-80 h-full bg-white shadow-lg transform transition-transform duration-300 ${
        active ? "translate-x-0" : "translate-x-full"
      }`}
    >
      <div className="h-full flex flex-col justify-between">
        <div className="p-5 overflow-auto">{children}</div>
        <div className="p-5 bg-white flex justify-between items-center gap-x-4">
          <Button onClick={onPayment} type="passed">
            Payment
          </Button>
          <Button onClick={() => onClick(false)} type="primary">
            Close
          </Button>
        </div>
      </div>
    </div>
  );
};
