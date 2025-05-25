import { ContentTaskDefinitionByEar } from "@models";
import styles from "./TaskDefinitionByEar.module.css";
import { classnames } from "@utils";
import { useCheckTaskTrainingSimulator } from "@api";
import { useEffect, useState } from "react";
import { Button } from "@components/shared";

interface TaskDefinitionByEarProps {
  id: string;
  condition: string;
  task_type_variant: string;
  description: string;
  content: ContentTaskDefinitionByEar;
  isPending: boolean;
  onClick: () => void;
}

export const TaskDefinitionByEar = ({
  id,
  content,
  isPending,
  onClick,
}: TaskDefinitionByEarProps) => {
  const [activeAudioNumber, setActiveAudioNumber] = useState(
    content.audio_urls[0].number,
  );
  const [wrongInterval, setWrongInterval] = useState<number>();
  const [rightIntervals, setRightIntervals] = useState(
    (JSON.parse(
      localStorage.getItem("definitionByEarRightIntervals") || "[]",
    ) as number[]) || ([] as number[]),
  );
  const { mutate } = useCheckTaskTrainingSimulator();
  const handleClick = (interval: string, number: number) => {
    mutate(
      {
        taskId: id,
        data: {
          delete_it: rightIntervals.length === content.audio_urls.length - 1,
          check_data: {
            audio_number: activeAudioNumber,
            interval: interval,
          },
        },
      },
      {
        onSuccess: (data) => {
          if (data.data.is_right) {
            setRightIntervals((prev) => [...prev, number]);
            setActiveAudioNumber((prev) =>
              rightIntervals.length < content.audio_urls.length - 1
                ? content.audio_urls[prev + 1].number
                : content.audio_urls[prev].number,
            );
            setWrongInterval(-1);
            if (rightIntervals.length === content.audio_urls.length - 1) {
              localStorage.setItem(
                "definitionByEarRightIntervals",
                JSON.stringify([...rightIntervals, number]),
              );
            }
          } else {
            setWrongInterval(number);
          }
        },
      },
    );
  };
  useEffect(() => {
    return () => {
      localStorage.removeItem("definitionByEar");
      localStorage.removeItem("definitionByEarRightIntervals");
    };
  }, []);
  return (
    <div className={styles.task}>
      <div className={styles.audio}>
        <audio src={content.audio_urls[activeAudioNumber].audio_url} controls />
      </div>
      <div className={styles.image_container}>
        <img
          src={content.image_url}
          alt="Спрятанная картинка"
          className={styles.image}
        />
        <div className={styles.grid_overlay}>
          {content.intervals.map((interval, index) => (
            <div
              key={index}
              className={classnames(
                styles.card,
                "heading_1",
                wrongInterval === index ? styles.wrong_interval : "",
                rightIntervals.includes(index) ? styles.card_hidden : "",
              )}
              onClick={() => handleClick(interval, index)}
            >
              {interval.toUpperCase()}
            </div>
          ))}
        </div>
      </div>
      {rightIntervals.length === content.audio_urls.length && (
        <div className={styles.container_right}>
          <p className={classnames("heading_3")}>{content.image_name}</p>
          <p className={classnames("text_24_r")}>Молодец, отличная работа!</p>
          <Button
            className={styles.btn_next}
            onClick={() => {
              onClick();
              setRightIntervals([]);
              setWrongInterval(-1);
              setActiveAudioNumber(content.audio_urls[0].number);
              localStorage.removeItem("definitionByEarRightIntervals");
            }}
            disabled={isPending}
          >
            {isPending ? "Загрузка..." : "К следующему"}
          </Button>
        </div>
      )}
    </div>
  );
};
