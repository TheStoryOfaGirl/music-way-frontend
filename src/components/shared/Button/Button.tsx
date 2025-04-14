import { ComponentProps, ReactNode } from "react";
import styles from "./Button.module.css";
import { classnames } from "@utils";

interface ButtonProps extends ComponentProps<"button"> {
  children: ReactNode;
  variant?: "primary" | "secondary" | "tertiary";
  color?: "blue" | "purple" | "sky";
  className?: string;
  icon?: ReactNode;
  iconPosition?: "left" | "right";
  iconStyles?: string;
  active?: boolean;
  disabled?: boolean;
}

export const Button = ({
  children,
  variant = "primary",
  color = "blue",
  className,
  icon,
  iconPosition,
  iconStyles,
  active,
  disabled = false,
  ...props
}: ButtonProps) => {
  return (
    <button
      className={classnames(
        styles.base,
        styles[color],
        styles[variant],
        disabled ? styles.disabled : "",
        "text_24_b",
        active ? styles.active : "",
        className,
      )}
      type={props.type ?? "button"}
      disabled={disabled}
      {...props}
    >
      {icon && iconPosition === "left" && (
        <span className={classnames(styles.icon, iconStyles)}>{icon}</span>
      )}
      {children}
      {icon && iconPosition === "right" && (
        <span className={classnames(styles.icon, iconStyles)}>{icon}</span>
      )}
    </button>
  );
};
