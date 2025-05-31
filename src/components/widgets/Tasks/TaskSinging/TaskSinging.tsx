import { Button, Modal } from "@components/shared";
import styles from "./TaskSinging.module.css";
import QuestionCircle from "@assets/icons/QuestionCircle.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import { useState } from "react";
import { PianoCustom, SingingCard } from "@components/widgets";
import { useTasksStore } from "@stores";
import { getActiveNoteAndStatus } from "@utils";
import { useParams } from "react-router-dom";

interface TaskSingingProps {
  id: string;
  condition: string;
  task_type_variant: string;
  description: string;
  isHomework: boolean;
}

export const TaskSinging = ({
  id,
  condition,
  task_type_variant,
  description,
  isHomework,
}: TaskSingingProps) => {
  const [showModal, setShowModal] = useState(false);
  const { id: homework_id } = useParams();
  const [activeNote, setActiveNote] = useState(
    getActiveNoteAndStatus(id, homework_id as string),
  );
  const tasks = useTasksStore();
  return (
    <>
      {isHomework ? (
        <>
          <div className={styles.task_name}>
            <p className="heading_3">{task_type_variant}</p>
            <QuestionCircle
              onClick={() => setShowModal(true)}
              className={styles.icon}
            />
          </div>
          <div className={styles.condition}>
            <p className="text_32_r">{condition}</p>
            <Button
              variant="secondary"
              className={styles.btn}
              onClick={() => {
                tasks["Пропевание"].reset(id, homework_id as string);
                setActiveNote({ note: "first", saved: false });
              }}
            >
              Записать заново
            </Button>
          </div>
          <div className={styles.piano}>
            <PianoCustom />
          </div>
          <div className={styles.cards}>
            <SingingCard
              saved={activeNote.note === "second"}
              name="first"
              activeNote={activeNote.note}
              setActiveNote={setActiveNote}
              taskId={id}
            />
            <SingingCard
              saved={activeNote.note === "second" && activeNote.saved}
              name="second"
              activeNote={activeNote.note}
              setActiveNote={setActiveNote}
              taskId={id}
            />
          </div>
        </>
      ) : (
        <p className="text_24_r">Упражнение находится в разработке, но скоро появится!</p>
      )}
      <Modal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        className={styles.modal}
      >
        <div className={styles.heading_modal}>
          <p className="heading_3">{task_type_variant}</p>
          <CloseIcon
            onClick={() => setShowModal(false)}
            style={{ width: "40px", height: "40px" }}
          />
        </div>
        <p className="text_24_r">{description}</p>
      </Modal>
    </>
  );
};
