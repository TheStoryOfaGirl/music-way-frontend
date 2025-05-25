import {
  ActiveHomeworkRow,
  CompletedHomeworkRow,
  Tab,
} from "@components/dummies";
import styles from "./Homeworks.module.css";
import NoteIcon from "@assets/icons/note.svg?react";
import { useState } from "react";
import { useCheckAuth, useGetHomeworks } from "@api";
import { useLocation, useNavigate } from "react-router-dom";
import { URLS } from "@utils";
import { Loader } from "@components/shared";

const Homeworks = () => {
  const location = useLocation();
  const { isLoading: isLoadingAuth } = useCheckAuth(location.pathname);
  const [activeTab, setActiveTab] = useState("Активные");
  const {
    data: dataActiveHomeworks,
    isSuccess: isSuccessActiveHomeworks,
    isLoading: isLodaingActiveHomeworks,
    isError: isErrorActiveHomework,
    error: errorActiveHomework,
  } = useGetHomeworks(true);
  const {
    data: dataCompletedHomeworks,
    isSuccess: isSuccessCompletedHomeworks,
    isLoading: isLodaingCompletedHomeworks,
    isError: isErrorCompletedHomework,
    error: errorCompletedHomework,
  } = useGetHomeworks(false);
  const navigate = useNavigate();
  if (
    isLodaingActiveHomeworks ||
    isLodaingCompletedHomeworks ||
    isLoadingAuth
  ) {
    return <Loader />;
  }
  return (
    <div className={styles.container}>
      <div className={styles.heading}>
        <h1 className="heading_1">Домашние задания</h1>
        <NoteIcon />
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
          isSuccessActiveHomeworks &&
          dataActiveHomeworks.data.length !== 0 &&
          dataActiveHomeworks.data.map((homework) => (
            <ActiveHomeworkRow
              key={homework.id}
              {...homework}
              variant="Ученик"
              onClick={() =>
                navigate(`${URLS.STUDENT.HOMEWORKS}/${homework.id}/active`)
              }
            />
          ))}
        {activeTab === "Активные" &&
          isErrorActiveHomework &&
          errorActiveHomework.response?.data.detail ===
            "Не найден класс с таким user_id" && (
            <p className="text_24_r">{`Ты пока не состоишь ни в одном классе. Подожди, пока тебя внесут в список класса`}</p>
          )}
        {activeTab === "Завершенные" &&
          isErrorCompletedHomework &&
          errorCompletedHomework.response?.data.detail ===
            "Не найден класс с таким user_id" && (
            <p className="text_24_r">{`Ты пока не состоишь ни в одном классе. Подожди, пока тебя внесут в список класса`}</p>
          )}
        {activeTab === "Активные" &&
          isSuccessActiveHomeworks &&
          dataActiveHomeworks.data.length === 0 && (
            <p className="text_24_r">{`Домашних заданий на сегодня нет, гуляй смело :)`}</p>
          )}
        {activeTab === "Завершенные" &&
          isSuccessCompletedHomeworks &&
          dataCompletedHomeworks.data.length !== 0 &&
          dataCompletedHomeworks.data.map((homework) => (
            <CompletedHomeworkRow
              key={homework.id}
              {...homework}
              variant="Ученик"
              onClick={() =>
                navigate(`${URLS.STUDENT.HOMEWORKS}/${homework.id}/completed`)
              }
            />
          ))}
        {activeTab === "Завершенные" &&
          isSuccessCompletedHomeworks &&
          dataCompletedHomeworks.data.length === 0 && (
            <p className="text_24_r">{`Ты пока не выполнил ни одного домашнего задания, но всё впереди!`}</p>
          )}
      </div>
    </div>
  );
};

export default Homeworks;
