import { classnames } from "@utils";
import styles from "./Card.module.css";
import SingIcon from "@assets/images/sing.svg?react";

interface CardProps {
  name: string;
  pathImage: string;
  hover: "outline" | "up";
  onClick?: () => void;
}

export const Card = ({ name, pathImage, hover, onClick }: CardProps) => {
  return (
    <div
      className={classnames(
        styles.container,
        hover === 'outline' ? styles.outline : styles.up,
      )}
      onClick={onClick}
    >
      <img src={pathImage} alt={name} className={styles.img}/>
      <p className="text_24_b">{name}</p>
    </div>
  );
};
