import { URLS } from "@utils";
import { useLocation } from "react-router-dom";
import styles from "./Auth.module.css";
import { LoginForm, RegisterForm } from "@components/widgets";

const AuthPage = () => {
  const location = useLocation();
  const isLogin = location.pathname === URLS.AUTH.LOGIN;

  return (
    <div className={styles.page}>
      {isLogin ? <LoginForm /> : <RegisterForm />}
    </div>
  );
};

export default AuthPage;
