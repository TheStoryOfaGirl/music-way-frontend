import { InputHTMLAttributes, useState } from "react";
import styles from "./Checkbox.module.css";
import { classnames } from "@utils";

interface CheckboxProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  onClick?: () => void;
}

export const Checkbox = ({
  label,
  className,
  labelClassName,
  containerClassName,
  onClick,
  ...props
}: CheckboxProps) => {
  const [isChecked, setIsChecked] = useState(false);
  const handleChange = () => {
    setIsChecked((prev) => !prev);
    if (onClick) onClick();
  };
  return (
    <div className={classnames(styles.container, containerClassName)}>
      <input
        type="checkbox"
        className={classnames(styles.input_checkbox, className)}
        checked={isChecked}
        onChange={handleChange}
        {...props}
      />
      {label && (
        <label
          htmlFor={props.id}
          className={classnames(
            styles.label_checkbox,
            "text_20_r",
            labelClassName,
          )}
          onClick={handleChange}
        >
          {label}
        </label>
      )}
    </div>
  );
};
