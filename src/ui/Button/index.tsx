import React from "react";

interface ButtonProps {
  type:
    | "primary"
    | "passed"
    | "secondary"
    | "borderedPrimary"
    | "borderedSecondary"
    | "primaryBlue";
  onClick?: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  children: React.ReactNode;
}

const buttonStyles = {
  primary: "bg-[#FF5290] text-white",
  secondary: "bg-[#BD235B] text-white",
  primaryBlue: "bg-[#531CCA] text-white font-medium",
  borderedPrimary: "bg-transparent border border-[#FF5290] text-[#FF5290]",
  borderedSecondary: "bg-transparent border border-[#BD235B] text-[#BD235B]",
  disabled: "bg-[#CCCCCC] text-white cursor-not-allowed",
  passed: "bg-[#49DE9F] text-white",
};

export const Button = ({
  type,
  onClick,
  disabled = false,
  children,
}: ButtonProps) => {
  const getButtonClass = () => {
    if (disabled) {
      return buttonStyles.disabled;
    }

    return buttonStyles[type];
  };

  return (
    <button
      disabled={disabled}
      onClick={onClick}
      className={`w-full py-2.5 px-3.5 flex justify-center items-center gap-x-2 rounded-xl text-lg mini-w:text-base font-semibold ${getButtonClass()}`}
    >
      <p>{children}</p>
    </button>
  );
};
