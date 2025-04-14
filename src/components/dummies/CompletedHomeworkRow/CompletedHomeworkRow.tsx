import styles from "./CompletedHomework.module.css";
import { classnames } from "@utils";

interface CompletedHomeworkRowProps {
  name: string;
  totalMark?: number;
  mark?: number;
  variant: "student" | "teacher";
  onClick?: () => void;
}

export const CompletedHomeworkRow = ({
  name,
  mark,
  totalMark,
  variant,
  onClick,
}: CompletedHomeworkRowProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={classnames(styles.name, "text_24_r")}>{name}</p>
      {variant === "student" && (
        <div className={styles.marks}>
          <p
            className={classnames(styles.mark, "heading_3")}
          >{`${mark}/${totalMark}`}</p>
          <p className={classnames(styles.mark, "text_24_b")}>баллов</p>
        </div>
      )}
    </div>
  );
};
