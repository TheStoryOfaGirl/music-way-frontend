import { classnames } from "@utils";
import styles from "./AccordionCompletedHomework.module.css";
import ChevronIcon from "@assets/icons/chevron-bottom.svg?react";
import { useState } from "react";
import { CompletedHomeworkTask } from "@models";

interface AccordionCompletedHomeworkProps {
  name: string;
  totalMark: number;
  mark: number;
  tasks: CompletedHomeworkTask[];
}

export const AccordionCompletedHomework = ({
  name,
  totalMark,
  mark,
  tasks,
}: AccordionCompletedHomeworkProps) => {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div>
      <div
        className={styles.container}
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <div className={classnames(styles.content, "text_24_b")}>
          {isOpen ? (
            <ChevronIcon
              className={classnames(
                styles.chevron_icon,
                styles.chevron_icon_up,
              )}
            />
          ) : (
            <ChevronIcon className={styles.chevron_icon} />
          )}
          {name}
        </div>
        <p
          className={classnames(styles.mark, "text_24_b")}
        >{`${mark}/${totalMark} баллов`}</p>
      </div>
      {isOpen && (
        <>
          {tasks.map((task) => (
            <div className={styles.task} key={task.number}>
              <p className="text_24_r">{`Задание ${task.number}`}</p>
              <p
                className={classnames(styles.mark, "text_24_b")}
              >{`${task.student_mark}/${task.max_mark} баллов`}</p>
            </div>
          ))}
        </>
      )}
    </div>
  );
};
