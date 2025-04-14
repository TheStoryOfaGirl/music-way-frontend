import { Link } from "react-router-dom";
import styles from "./LinkItem.module.css";

interface LinkItemProps {
  name: string;
  path: string;
}

export const LinkItem = ({ name, path }: LinkItemProps) => {
  return (
    <li className={styles.link}>
      <Link className="text_24_r" to={path}>
        {name}
      </Link>
    </li>
  );
};
