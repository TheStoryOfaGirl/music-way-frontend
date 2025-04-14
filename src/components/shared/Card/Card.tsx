import { classnames } from "@utils";
import styles from "./Card.module.css";
import SingIcon from "@assets/images/sing.svg?react";

interface CardProps {
  name: string;
  path: string;
  width: "fix" | "fill";
  onClick?: () => void;
}

export const Card = ({ name, path, width, onClick }: CardProps) => {
  return (
    <div
      className={classnames(
        styles.container,
        width === "fix" ? styles.container_fix : styles.container_fill,
      )}
      onClick={onClick}
    >
      {/* <img src={path} alt={name} className={styles.img}/> */}
      <SingIcon
        style={{ width: "max(120px, 8.33vw)", height: "max(120px, 8.33vw)" }}
      />
      <p className="text_24_b">{name}</p>
    </div>
  );
};
