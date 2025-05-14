import { ComponentProps } from "react";
import styles from "./Input.module.css";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { classnames } from "@utils";

interface InputProps extends ComponentProps<"input"> {
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
  readonly?: boolean;
}

export const Input = ({
  name,
  placeholder,
  rules,
  className,
  ...props
}: InputProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={styles.container}>
      <input
        {...register(name, rules)}
        className={classnames(
          styles.input,
          className,
          error && styles.input_error,
          "text_20_m",
        )}
        placeholder={placeholder}
        {...props}
      />
      {error && (
        <p className={classnames(styles.error_message, "text_16_m")}>
          {error.message as string}
        </p>
      )}
    </div>
  );
};
