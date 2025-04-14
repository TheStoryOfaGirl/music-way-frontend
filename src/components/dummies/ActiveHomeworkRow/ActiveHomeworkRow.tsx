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
  name: string;
  startDate?: string;
  finishDate: string;
  mark: number;
  countTasks?: number;
  variant: "student" | "teacher";
  onClick?: () => void;
}

export const ActiveHomeworkRow = ({
  name,
  startDate,
  finishDate,
  mark,
  countTasks,
  variant,
  onClick,
}: ActiveHomeworkRowProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <div className={styles.content}>
        <p className={classnames(styles.name, "text_24_b")}>{name}</p>
        <div className={styles.info}>
          {variant === "student" ? (
            <>
              <p className={classnames(styles.finish_date, "text_20_r")}>
                {formatFinishDate(finishDate)}
              </p>
              <p
                className={classnames(styles.mark, "text_20_b")}
              >{`Максимум ${mark} баллов`}</p>
            </>
          ) : (
            <>
              <p className={classnames(styles.date, "text_20_r")}>
                {formatDateRange(startDate as string, finishDate)}
              </p>
              <p className={classnames(styles.count_tasks, "text_20_r")}>
                {pluralize(countTasks as number, [
                  "задание",
                  "задания",
                  "заданий",
                ])}
              </p>
            </>
          )}
        </div>
      </div>
      {variant === "student" ? (
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
        >{`Максимум ${mark} баллов`}</p>
      )}
    </div>
  );
};
