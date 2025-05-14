import { Button, Modal } from "@components/shared";
import styles from "./TaskSinging.module.css";
import QuestionCircle from "@assets/icons/QuestionCircle.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import { useState } from "react";
import { PianoCustom, SingingCard} from "@components/widgets";

interface TaskSingingProps {
  id: string;
  condition: string;
  task_type_variant: string;
  description: string;
  content: {};
}

export const TaskSinging = ({
  id,
  condition,
  task_type_variant,
  description,
}: TaskSingingProps) => {
  const [showModal, setShowModal] = useState(false);
  const [activeNote, setActiveNote] = useState("first");
  // const handleVoiceRecorded = (cardId: string, audioBlob: Blob) => {
  //   console.log(`Аудио записано для карточки ${cardId}`, audioBlob);
  // };
  return (
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
        <Button variant="secondary" className={styles.btn}>
          Записать заново
        </Button>
      </div>
      <div className={styles.piano}>
        <PianoCustom />
      </div>
      <div className={styles.cards}>
        <SingingCard name="first" activeNote={activeNote} setActiveNote={setActiveNote}/>
        <SingingCard name="second" activeNote={activeNote} setActiveNote={setActiveNote}/>
      </div>
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
