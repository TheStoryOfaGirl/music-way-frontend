import { FormProvider, useForm } from "react-hook-form";
import styles from "./LoginForm.module.css";
import { LoginData } from "@models";
import { Button, Input, Modal } from "@components/shared";
import { classnames, URLS } from "@utils";
import { useNavigate } from "react-router-dom";
import { useLogin } from "@api";
import { useAuthStore } from "@stores";
import { useEffect, useState } from "react";
import { ChangePasswordForm } from "../ChangePasswordForm/ChangePasswordForm";

export const LoginForm = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const methods = useForm<LoginData>();
  const { role, isChangedPassword } = useAuthStore();
  const { mutate, isPending, data } = useLogin();
  console.log(isChangedPassword);

  const onSubmit = (data: LoginData) => {
    mutate(data);
  };

  useEffect(() => {
    console.log("use effect", isChangedPassword, role, data?.status === 200);
    if (data?.status === 200 && !isChangedPassword && role === "Преподаватель") {
      setShowModal(true);
    }
  }, [data]);
  return (
    <>
      <div className={styles.content}>
        <h1 className="heading_1">Вход</h1>
        <FormProvider {...methods}>
          <form
            onSubmit={methods.handleSubmit(onSubmit)}
            className={styles.form}
          >
            <Input
              name="username"
              placeholder="Логин"
              rules={{ required: "Поле обязательно для заполнения" }}
              className={styles.input}
            />
            <Input
              name="password"
              placeholder="Пароль"
              rules={{ required: "Поле обязательно для заполнения" }}
              className={styles.input}
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
        <Button
          className={classnames(styles.btn, "text_20_b")}
          type="submit"
          color="purple"
          variant="secondary"
          onClick={() => navigate(URLS.AUTH.REGISTER)}
        >
          Зарегистрироваться как ученик
        </Button>
      </div>
      {role === "Преподаватель" && !isChangedPassword && (
        <Modal isOpen={showModal}>
          <ChangePasswordForm />
        </Modal>
      )}
    </>
  );
};
