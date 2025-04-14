import { FormProvider, useForm } from "react-hook-form";
import styles from "./RegisterForm.module.css";
import { RegisterData } from "@models";
import { Button, Input } from "@components/shared";
import { classnames } from "@utils";

export const RegisterForm = () => {
  const methods = useForm<RegisterData>();
  const password = methods.watch("password");
  const onSubmit = (data: RegisterData) => console.log(data);
  console.log(new Date("11.04.2003"));
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="heading_1">Регистрация</h1>
        <div className={styles.text_content}>
          <p className="text_24_b">Если тебе сложно, позови взрослого</p>
          <p className="text_20_r">
            Поля со звездочкой * нужно обязательно заполнить
          </p>
        </div>
        <div className={styles.form_container}>
          <FormProvider {...methods}>
            <form
              onSubmit={methods.handleSubmit(onSubmit)}
              className={styles.form}
            >
              <Input
                variant="default"
                name="lastName"
                placeholder="Фамилия*"
                rules={{
                  required: "Поле обязательно для заполнения",
                  minLength: {
                    value: 2,
                    message: "Фамилия должна быть не менее 2 символов",
                  },
                  maxLength: {
                    value: 100,
                    message: "Фамилия должна быть не больее 100 символов",
                  },
                }}
                className={styles.input}
              />
              <Input
                variant="default"
                name="firstName"
                placeholder="Имя*"
                rules={{
                  required: "Поле обязательно для заполнения",
                  minLength: {
                    value: 2,
                    message: "Имя должно быть не менее 2 символов",
                  },
                  maxLength: {
                    value: 100,
                    message: "Имя должно быть не более 100 символов",
                  },
                }}
                className={styles.input}
              />
              <Input
                variant="default"
                name="patronymic"
                placeholder="Отчество"
                className={styles.input}
              />
              <Input
                variant="default"
                name="birthDate"
                placeholder="Дата рождения*"
                className={styles.input}
                rules={{ required: "Поле обязательно для заполнения" }}
                type="date"
              />
              <Input
                variant="default"
                name="login"
                placeholder="Почта*"
                className={styles.input}
                rules={{
                  required: "Поле обязательно для заполнения",
                  pattern: {
                    value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/gm,
                    message: "Почта введена неправильно",
                  },
                }}
              />
              <Input
                variant="default"
                name="password"
                placeholder="Пароль*"
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
                variant="default"
                name="repeatPassword"
                placeholder="Напиши пароль еще раз*"
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
              >
                Зарегистрироваться
              </Button>
            </form>
          </FormProvider>
        </div>
      </div>
    </div>
  );
};
