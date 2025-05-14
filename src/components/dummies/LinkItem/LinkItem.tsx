import { Link } from "react-router-dom";
import styles from "./LinkItem.module.css";
import { classnames } from "@utils";

interface LinkItemProps {
  name: string;
  path: string;
  className?: string;
}

export const LinkItem = ({ name, path, className }: LinkItemProps) => {
  return (
    <li className={styles.link}>
      <Link className={classnames("text_24_r", className)} to={path}>
        {name}
      </Link>
    </li>
  );
};
