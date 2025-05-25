import styles from "./Checkbox.module.css";
import { classnames } from "@utils";

interface CheckboxProps {
  className?: string;
  label?: string;
  labelClassName?: string;
  containerClassName?: string;
  checked: boolean;
  id: string;
  onChange?: (checked: boolean) => void;
}

export const Checkbox = ({
  label,
  className,
  labelClassName,
  containerClassName,
  onChange,
  checked,
  ...props
}: CheckboxProps) => {
  const handleChange = () => {
    if (onChange) {
      onChange(!checked);
    }
  };
  return (
    <div className={classnames(styles.container, containerClassName)}>
      <input
        type="checkbox"
        className={classnames(styles.input_checkbox, className)}
        checked={checked}
        onChange={handleChange}
        {...props}
      />
      {label && (
        <label
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
