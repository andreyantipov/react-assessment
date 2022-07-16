import { forwardRef } from "react";
import $ from "./Input.module.css";
import { classNames } from "app/utils";

export type InputProps = {
  variant?: "default" | "unstyled";
} & React.HTMLProps<HTMLInputElement>;

export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ variant, ...props }, ref) => {
    const classess = classNames($, {
      base: true,
      "variant-unstyled": variant === "unstyled",
    });

    return <input ref={ref} {...props} className={classess} />;
  }
);
