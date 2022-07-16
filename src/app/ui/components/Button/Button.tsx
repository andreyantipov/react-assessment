import $ from "./Button.module.css";
import { classNames } from "app/utils";

export type ButtonProps = {
  variant?: "borderless";
} & React.HTMLProps<HTMLButtonElement>;

export const Button: FCC<ButtonProps> = ({ children, variant, ...props }) => {
  const classes = classNames($, {
    'base': true,
    'variant-borderless': variant === "borderless",
  });

  return (
    <button {...props} className={classes} type="button">
      {children}
    </button>
  );
};
