import { Link, useNavigate } from "react-router-dom";
import styles from "./PageNotFound.module.css";
import { classnames, URLS } from "@utils";
import BackIcon from "@assets/icons/arrow-left.svg?react"
import { useAuthStore } from "@stores";

const PageNotFound = () => {
  const navigate = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.content}>
        <p className="text_24_m">Страница не найдена. Вы попали на несуществующую страницу</p>
        <div className={styles.back}>
        <BackIcon/>
        <Link
          to=""
          className={classnames("text_24_b", styles.link)}
          onClick={(e) => {
            e.preventDefault();
            navigate(-1);
          }}
        >
          Вернуться
        </Link>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;
