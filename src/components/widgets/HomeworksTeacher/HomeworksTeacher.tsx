import { HomeworkShortTeacher } from "@models";
import styles from "./HomeworksTeacher.module.css";
import { useNavigate } from "react-router-dom";
import { useGetCompletedHomeworksTeacher } from "@api";
import { useState } from "react";
import {
  ActiveHomeworkRow,
  CompletedHomeworkRow,
  Tab,
} from "@components/dummies";
import NoteIcon from "@assets/icons/MusicNote.svg?react";
import { Button } from "@components/shared";
import { URLS } from "@utils";

interface HomeworksTeacherProps {
  activeHomeworks: HomeworkShortTeacher[];
  activeClassId: string;
}

export const HomeworksTeacher = ({
  activeHomeworks,
  activeClassId,
}: HomeworksTeacherProps) => {
  const [activeTab, setActiveTab] = useState("Активные");
  const {
    data: dataCompletedHomeworks,
    isSuccess: isSuccessCompletedHomeworks,
  } = useGetCompletedHomeworksTeacher(activeClassId);
  const navigate = useNavigate();
  return (
    <div className={styles.content}>
      <div className={styles.heading_btn}>
        <div className={styles.heading}>
          <h2 className="heading_2">Домашние задания</h2>
          <NoteIcon />
        </div>
        <Button
          color="purple"
          className={styles.btn}
          onClick={() =>
            navigate(
              `${URLS.TEACHER.CLASSES}/${activeClassId}/homeworks/create`,
            )
          }
        >
          Назначить задание
        </Button>
      </div>
      <div className={styles.tabs}>
        <Tab
          name="Активные"
          active={activeTab}
          onClick={() => setActiveTab("Активные")}
        />
        <Tab
          name="Завершенные"
          active={activeTab}
          onClick={() => setActiveTab("Завершенные")}
        />
      </div>
      <div className={styles.homework_list}>
        {activeTab === "Активные" &&
          activeHomeworks.length > 0 &&
          activeHomeworks.map((homework) => (
            <ActiveHomeworkRow
              key={homework.id}
              {...homework}
              variant="Преподаватель"
              onClick={() =>
                navigate(
                  `${URLS.TEACHER.CLASSES}/${activeClassId}/homeworks/${homework.id}/active`,
                )
              }
            />
          ))}
        {activeTab === "Активные" && activeHomeworks.length === 0 && (
          <p className="text_24_r">{`Нет активных домашних заданий`}</p>
        )}
        {activeTab === "Завершенные" &&
          isSuccessCompletedHomeworks &&
          dataCompletedHomeworks.data.length !== 0 &&
          dataCompletedHomeworks.data.map((homework) => (
            <CompletedHomeworkRow
              key={homework.id}
              {...homework}
              variant="Преподаватель"
              onClick={() =>
                navigate(
                  `${URLS.TEACHER.CLASSES}/${activeClassId}/homeworks/${homework.id}/completed`,
                )
              }
            />
          ))}
        {activeTab === "Завершенные" &&
          isSuccessCompletedHomeworks &&
          dataCompletedHomeworks.data.length === 0 && (
            <p className="text_24_r">{`Нет завершенных домашних заданий`}</p>
          )}
      </div>
    </div>
  );
};
