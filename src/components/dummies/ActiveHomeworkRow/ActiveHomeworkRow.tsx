import { Button } from "@components/shared";
import styles from "./ActiveHomeworkRow.module.css";
import {
  classnames,
  formatDateRange,
  formatFinishDate,
  pluralize,
} from "@utils";
import ArrowRightIcon from "@assets/icons/arrow-right.svg?react";

interface ActiveHomeworkRowProps {
  topic: string;
  start_date?: string;
  end_date: string;
  max_mark: number;
  count?: number;
  variant: "Ученик" | "Преподаватель";
  onClick: () => void;
}

export const ActiveHomeworkRow = ({
  topic,
  start_date,
  end_date,
  max_mark,
  count,
  variant,
  onClick,
}: ActiveHomeworkRowProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>
        <p className={classnames(styles.name, "text_24_b")}>{topic}</p>
        <div className={styles.info}>
          {variant === "Ученик" ? (
            <>
              <p className={classnames(styles.finish_date, "text_24_r")}>
                {formatFinishDate(end_date)}
              </p>
              <p
                className={classnames(styles.mark, "text_24_b")}
              >{`Максимум ${pluralize(max_mark as number, [
                "балл",
                "балла",
                "баллов",
              ])}`}</p>
            </>
          ) : (
            <>
              <p className={classnames(styles.date, "text_24_r")}>
                {formatDateRange(start_date as string, end_date)}
              </p>
              <p className={classnames(styles.count_tasks, "text_24_r")}>
                {pluralize(count as number, [
                  "задание",
                  "задания",
                  "заданий",
                ])}
              </p>
            </>
          )}
        </div>
      </div>
      {variant === "Ученик" ? (
        <Button
          className="text_24_b"
          icon={<ArrowRightIcon style={{ width: "32px", height: "32px" }} />}
          iconPosition="right"
          variant="tertiary"
          onClick={onClick}
        >
          Перейти
        </Button>
      ) : (
        <p
          className={classnames(styles.mark_big, "text_24_b")}
        >{`Максимум ${pluralize(max_mark as number, [
          "балл",
          "балла",
          "баллов",
        ])}`}</p>
      )}
    </div>
  );
};
