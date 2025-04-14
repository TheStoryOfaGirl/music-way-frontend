import { FormProvider, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { LoginData } from "@models";
import { Button, Input } from "@components/shared";
import { classnames } from "@utils";
import { useNavigate } from "react-router-dom";

export const LoginForm = () => {
  const navigate = useNavigate();
  const methods = useForm<LoginData>();
  const onSubmit = (data: LoginData) => console.log(data);
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <h1 className="heading_1">Вход</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            <Input
              variant="default"
              name="login"
              placeholder="Логин"
              rules={{ required: "Поле обязательно для заполнения" }}
              className={styles.input}
            />
            <Input
              variant="default"
              name="password"
              placeholder="Пароль"
              rules={{ required: "Поле обязательно для заполнения" }}
              className={styles.input}
            />
            <Button
              className={classnames(styles.btn, "text_20_b")}
              type="submit"
              color="purple"
            >
              Войти
            </Button>
          </form>
        </FormProvider>
        <Button
          className={classnames(styles.btn, "text_20_b")}
          type="submit"
          color="purple"
          variant="secondary"
          onClick={() => navigate("/register")}
        >
          Зарегистрироваться как ученик
        </Button>
      </div>
    </div>
  );
};
