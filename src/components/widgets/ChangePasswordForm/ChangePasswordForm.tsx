import { useChangePassword, useRegister } from "@api";
import { Input, Button } from "@components/shared";
import { ChangePasswordData } from "@models";
import { classnames } from "@utils";
import { useForm, FormProvider } from "react-hook-form";
import styles from "./ChangePasswordForm.module.css";

export const ChangePasswordForm = () => {
  const { mutate, isPending } = useChangePassword();
  const methods = useForm<ChangePasswordData>();
  const password = methods.watch("new_password");
  const onSubmit = (data: ChangePasswordData) => mutate(data);
  return (
      <div className={styles.content}>
        <h1 className="heading_3">Смена временного пароля</h1>
        <div className={styles.form_container}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <Input
                name="new_password"
                placeholder="Новый пароль"
                className={styles.input}
                rules={{
                  required: "Поле обязательно для заполнения",
                  minLength: {
                    value: 8,
                    message: "Пароль должен быть не менее 8 символов",
                  },
                  maxLength: {
                    value: 30,
                    message: "Пароль должен быть не более 30 символов",
                  },
                  pattern: {
                    value:
                      /^(?=.*[A-Z])(?=.*\d)(?=.*[~!?@#$%^&*\-_+\(\)\[\]{}><\/\\|\"\'.:,])[a-zA-Z\d~!?@#$%^&*\-_+\(\)\[\]{}><\/\\|\"\'.:,]+$/,
                    message:
                      "Пароль должен содержать минимум 1 цифру, 1 заглавную букву, 1 из символов ~ ! ? @ # $ % ^ & * _ - + ( ) [ ] { } > < / \\ | \" \' . , :",
                  },
                }}
                type="password"
              />
              <Input
                name="repeatPassword"
                placeholder="Повторите новый пароль"
                className={styles.input}
                rules={{
                  required: "Поле обязательно для заполнения",
                  validate: (value) =>
                    value === password || "Пароли не совпадают",
                }}
                type="password"
              />
              <Button
                className={classnames(styles.btn, "text_20_b")}
                type="submit"
                color="purple"
                disabled={isPending}
              >
                {isPending ? "Загрузка..." : "Войти"}
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
  );
};
