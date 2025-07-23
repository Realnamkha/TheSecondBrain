import type { ReactElement, ReactNode } from "react";

type Variants = "primary" | "secondary" | "destructive" | "transparent";

export interface ButtonProps {
  variant: Variants;
  size: "xm" | "sm" | "md" | "lg";
  text?: string;
  fullwidth?: boolean;
  loading?: boolean;
  startIcon?: ReactElement;
  endIcon?: ReactElement;
  onClick?: () => void;
  children?: ReactNode;
}

const variantStyles = new Map<Variants, string>([
  ["transparent", "bg-white tex-red-500"],
  ["primary", "bg-purple-600 text-white"],
  ["secondary", "bg-purple-300 text-purple-600"],
  ["destructive", "bg-red-600 text-white"],
]);

const sizeStyles = {
  xm: "py-1 px-1",
  sm: "py-2 px-4",
  md: "py-2 px-6",
  lg: "py-3 px-8",
};

const defaultStyles =
  "rounded-md flex items-center justify-center font-light cursor-pointer";

export const Button = (props: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      className={`${variantStyles.get(props.variant)} ${defaultStyles} ${
        sizeStyles[props.size]
      } ${props.fullwidth ? "w-full flex justify-center" : ""} ${
        props.loading ? "opacity-70" : ""
      }`}
    >
      {props.text && props.startIcon ? (
        <div className="pr-2">{props.startIcon}</div>
      ) : (
        <div>{props.startIcon}</div>
      )}
      {props.text}
      {props.endIcon}
    </button>
  );
};
