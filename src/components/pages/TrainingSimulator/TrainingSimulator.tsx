import { useLocation, useNavigate } from "react-router-dom";
import styles from "./TrainingSimulator.module.css";
import { IconContainer, Modal } from "@components/shared";
import QuestionCircle from "@assets/icons/QuestionCircle.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { useState } from "react";
import {
  TaskDefinitionByEar,
  TaskMelodyOnPiano,
  TaskSinging,
} from "@components/widgets";
import { ContentTaskDefinitionByEar, ContentTaskMelodyOnPiano } from "@models";
import { useCreateTaskTrainingSimulator } from "@api";

function TrainingSimulator() {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const { state } = useLocation();
  const [currentTask, setCurrentTask] = useState(
    JSON.parse(localStorage.getItem("definitionByEar") || "null") || state.task,
  );
  const { mutate, isPending } = useCreateTaskTrainingSimulator();
  const handleClick = () => {
    mutate(
      {
        variant_id: state.variant_id,
        settings: state.settings,
      },
      {
        onSuccess: (data) => {
          setCurrentTask(data.data);
          localStorage.setItem("definitionByEar", JSON.stringify(data.data));
        },
      },
    );
  };
  window.addEventListener("unload", () => {
    const navEntries = performance.getEntriesByType("navigation");
    if (
      navEntries.length > 0 &&
      (navEntries[0] as PerformanceNavigationTiming).type !== "reload"
    ) {
      localStorage.removeItem("definitionByEar");
    }
  });
  const getActiveTask = () => {
    switch (currentTask.task_type_variant) {
      case "Пропевание":
        return <TaskSinging {...currentTask} isHomework={false}/>;
      case "Мелодия на клавиатуре":
        return (
          <TaskMelodyOnPiano
            {...currentTask}
            content={currentTask.content as ContentTaskMelodyOnPiano}
            isHomework={false}
          />
        );
      case "Определение на слух":
        return (
          <TaskDefinitionByEar
            {...currentTask}
            content={currentTask.content as ContentTaskDefinitionByEar}
            onClick={handleClick}
            isPending={isPending}
          />
        );
    }
  };
  return (
    <div className={styles.container}>
      <div className={styles.training_name_container}>
        <div className={styles.training_name}>
          <IconContainer
            color="blue"
            content="icon"
            shape="circle"
            shadow
            onClick={() => {
              navigate(-1);
            }}
          >
            <ChevronLeftIcon width={48} height={48} />
          </IconContainer>
          <p className="heading_2">{currentTask.task_type_variant}</p>
        </div>
        <QuestionCircle
          onClick={() => setShowModal(true)}
          className={styles.icon}
        />
      </div>
      <div className={styles.task_container}>
        <div className={styles.task}>{getActiveTask()}</div>
      </div>
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <div className={styles.heading_modal}>
          <p className="heading_3">{currentTask.task_type_variant}</p>
          <CloseIcon
            onClick={() => setShowModal(false)}
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <p className="text_24_r">{currentTask.description}</p>
      </Modal>
    </div>
  );
}

export default TrainingSimulator;
