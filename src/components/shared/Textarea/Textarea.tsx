import { ComponentProps } from "react";
import styles from "./Textarea.module.css";
import { RegisterOptions, useFormContext } from "react-hook-form";
import { classnames } from "@utils";

interface TextareaProps extends ComponentProps<"textarea"> {
  name: string;
  placeholder?: string;
  rules?: RegisterOptions;
  className?: string;
}

export const Textarea = ({
  name,
  placeholder,
  rules,
  className,
  ...props
}: TextareaProps) => {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  const error = errors[name];

  return (
    <div className={styles.container}>
      <textarea
        {...register(name, rules)}
        className={classnames(
          styles.textarea,
          className,
          error && styles.textarea_error,
          "text_20_m",
        )}
        placeholder={placeholder}
        rows={4}
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
