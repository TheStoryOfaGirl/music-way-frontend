import styles from "./CompletedHomework.module.css";
import { classnames } from "@utils";

interface CompletedHomeworkRowProps {
  topic: string;
  max_mark?: number;
  student_mark?: number;
  variant: "Ученик" | "Преподаватель";
  onClick?: () => void;
}

export const CompletedHomeworkRow = ({
  topic,
  student_mark,
  max_mark,
  variant,
  onClick,
}: CompletedHomeworkRowProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className={classnames(styles.name, "text_24_r")}>{topic}</p>
      {variant === "Ученик" && (
        <div className={styles.marks}>
          <p
            className={classnames(styles.mark, "heading_3")}
          >{`${student_mark}/${max_mark}`}</p>
          <p className={classnames(styles.mark, "text_24_b")}>баллов</p>
        </div>
      )}
    </div>
  );
};
