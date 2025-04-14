import { classnames, navListStudent, navListTeacher } from "@utils";
import styles from "./Header.module.css";
import { Button, Logo } from "@components/shared";
import { Link } from "react-router-dom";
import ExitIcon from "@assets/icons/BoxArrowRight.svg?react";

interface HeaderProps {
  variant: "teacher" | "student" | "default";
}

export const Header = ({ variant }: HeaderProps) => {
  const navList =
    variant === "student"
      ? navListStudent
      : variant === "teacher"
        ? navListTeacher
        : [];
  return (
    <header className={styles.header_container}>
      <Logo />
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
        <p className="text_24_r">Имя</p>
        <Button
          className="text_24_b"
          variant="secondary"
          color="sky"
          icon={<ExitIcon className={styles.exitIcon} />}
          iconPosition="right"
        >
          Выйти
        </Button>
      </div>
    </header>
  );
};
