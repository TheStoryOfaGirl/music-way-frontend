import { classnames, navListStudent, navListTeacher, URLS } from "@utils";
import styles from "./Header.module.css";
import { Button, Logo } from "@components/shared";
import { Link, useNavigate } from "react-router-dom";
import ExitIcon from "@assets/icons/BoxArrowRight.svg?react";
import { useAuthStore } from "@stores";
import { useCheckAuth, useLogout } from "@api";

export const Header = () => {
  const {
    role,
    isAuthenticated,
    name,
    isChangedPassword,
  } = useAuthStore();
  const navigate = useNavigate();
  const { mutate } = useLogout();
  const navList =
    role === "Ученик"
      ? navListStudent
      : role === "Преподаватель"
        ? navListTeacher
        : [];
  const handleClick = () => {
    mutate();
  };
  return (
    <header className={styles.header_container}>
      <div
        className={styles.logo}
        onClick={() => {
          navigate(URLS.AUTH.LOGIN);
        }}
      >
        <Logo />
      </div>
      {isAuthenticated && isChangedPassword && (
        <>
          <nav className={styles.nav}>
            {navList.map((navItem) => (
              <Link
                to={navItem.path}
                className={classnames(styles.link, "text_24_b")}
                key={navItem.name}
              >
                {navItem.name}
              </Link>
            ))}
          </nav>
          <div className={styles.btn_name_container}>
            <p className="text_24_r">{name}</p>
            <Button
              className="text_24_b"
              variant="secondary"
              color="sky"
              icon={<ExitIcon className={styles.exitIcon} />}
              iconPosition="right"
              onClick={handleClick}
            >
              Выйти
            </Button>
          </div>
        </>
      )}
    </header>
  );
};
