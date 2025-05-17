import { Button, IconContainer, Modal } from "@components/shared";
import styles from "./HomeworkStudent.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import {
  useGetActiveHomeworkInfo,
  useGetTask,
  useSubmitHomeworkStudent,
} from "@api";
import { useState } from "react";
import { TaskSinging } from "@components/widgets";
import { classnames, URLS } from "@utils";
import { CheckHomework } from "@models";

function HomeworkStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [activeTask, setActiveTask] = useState(1);
  const { data: homework, isSuccess: isSuccessHomework } =
    useGetActiveHomeworkInfo(id as string);
  const { mutate, isPending } = useSubmitHomeworkStudent();
  const { data: task, isSuccess: isSuccessTask } = useGetTask(id as string, activeTask);
  const getActiveTask = () => {
    if (isSuccessTask) {
      switch (task.data.task_type_variant) {
        case "Пропевание":
          return <TaskSinging {...task.data} />;
      }
    }
  };
  const handleClick = () => {
    console.log(
      "data",
      JSON.parse(localStorage.getItem("homeworks") as string),
    );
    const homeworks = JSON.parse(
      localStorage.getItem("homeworks") as string,
    ) as { homework_id: string; answers: CheckHomework[] }[];
    mutate(
      {
        homework_id: id as string,
        data: homeworks.find((homework) => homework.homework_id === id)
          ?.answers,
      },
      {
        onSuccess: () => {
          navigate(`${URLS.STUDENT.HOMEWORKS}/${id}/completed`);
        },
      },
    );
  };
  return (
    <>
      {isSuccessHomework && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.topic}>
              <IconContainer
                color="sky"
                content="icon"
                shape="square"
                shadow
                onClick={() => {
                  navigate(-1);
                }}
              >
                <ChevronLeftIcon width={48} height={48} />
              </IconContainer>
              <h2 className="heading_2">{homework.data.topic}</h2>
            </div>
            <Button
              color="purple"
              className={styles.btn}
              onClick={() => setShowModal(true)}
            >
              Завершить
            </Button>
          </div>
          <div className={styles.number_list}>
            {Array.from({ length: homework.data.count }, (_, i) => (
              <IconContainer
                color="blue"
                content="text"
                dataNumber={`${i + 1}`}
                className="text_24_b"
                active={activeTask === i + 1}
                onClick={() => setActiveTask(i + 1)}
              />
            ))}
          </div>
          <div className={styles.task_container}>
            <div className={styles.task}>{getActiveTask()}</div>
          </div>
        </div>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <h3 className="heading_3">Ты точно хочешь завершить?</h3>
        <p className="text_24_r">
          Перед тем, как завершить, проверь, сохранил ли ты все ответы.
        </p>
        <div className={styles.btn_contaniner}>
          <Button
            color="purple"
            variant="secondary"
            onClick={() => setShowModal(false)}
            className={styles.btn_ready}
          >
            Вернуться к заданиям
          </Button>
          <Button
            color="purple"
            onClick={handleClick}
            className={styles.btn_ready}
          >
            {isPending ? "Загрузка..." : "Завершить"}
          </Button>
        </div>
      </Modal>
    </>
  );
}

export default HomeworkStudent;
