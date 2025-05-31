import styles from "./TaskMelodyOnPiano.module.css";
import { PianoCustom } from "@components/widgets";
import { ContentTaskMelodyOnPiano } from "@models";
import { SheetMusic } from "./../../SheetMusic/SheetMusic";
import { useRef, useState } from "react";
import QuestionCircle from "@assets/icons/QuestionCircle.svg?react";
import { Button, Modal } from "@components/shared";
import CloseIcon from "@assets/icons/X.svg?react";
import { useTasksStore } from "@stores";
import { useParams } from "react-router-dom";
import {
  checkSavingTaskInLocalStorage,
  getInitialNotesForMelodyOnPiano,
  noteToMidi,
} from "@utils";

interface TaskMelodyOnPianoProps {
  id: string;
  condition: string;
  task_type_variant: string;
  description: string;
  content: ContentTaskMelodyOnPiano;
  isHomework: boolean;
}

export const TaskMelodyOnPiano = ({
  id,
  condition,
  task_type_variant,
  description,
  content,
  isHomework,
}: TaskMelodyOnPianoProps) => {
  const { id: homeworkId } = useParams();
  const [showModal, setShowModal] = useState(false);
  const [saved, setSaved] = useState(
    checkSavingTaskInLocalStorage(homeworkId as string, id),
  );
  const [activeNotes, setActiveNotes] = useState<string[]>(
    getInitialNotesForMelodyOnPiano(
      id,
      homeworkId as string,
      content.initial_note,
    ),
  );
  const [isPlaying, setIsPlaying] = useState(false);
  const playNoteRef = useRef<(midiNumber: number) => void>(() => {});

  const playMelody = async () => {
    if (isPlaying || !playNoteRef.current) return;
    setIsPlaying(true);
    for (let i = 0; i < activeNotes.length; i++) {
      playNoteRef.current(noteToMidi(activeNotes[i]));
      await new Promise((resolve) => setTimeout(resolve, 500));
    }
    setIsPlaying(false);
  };
  const tasks = useTasksStore();
  return (
    <div className={styles.task}>
      <div className={styles.task_name}>
        <p className="heading_3">{task_type_variant}</p>
        <QuestionCircle
          onClick={() => setShowModal(true)}
          className={styles.icon}
        />
      </div>
      {isHomework ? (
        <>
          <div className={styles.condition}>
            <p className="text_32_r">
              {activeNotes.length < 2
                ? condition
                : content.intervals[
                    activeNotes.length !== content.intervals.length + 2
                      ? activeNotes.length - 2
                      : content.intervals.length - 1
                  ]}
            </p>
            <Button
              variant="secondary"
              className={styles.btn}
              onClick={() => {
                setActiveNotes([content.initial_note]);
                setSaved(false);
                tasks["Мелодия на клавиатуре"].reset(id, homeworkId as string);
              }}
            >
              Записать заново
            </Button>
          </div>
          <SheetMusic
            notes={activeNotes}
            totalCountNotes={content.intervals.length + 2}
          />
          <div className={styles.piano}>
            <PianoCustom
              setNotes={setActiveNotes}
              disabled={activeNotes.length === content.intervals.length + 2}
              playNoteFunction={(fn) => (playNoteRef.current = fn)}
            />
          </div>
          {activeNotes.length === content.intervals.length + 2 && (
            <div className={styles.btn_container}>
              <Button
                className={styles.btn}
                variant="secondary"
                color="purple"
                onClick={playMelody}
                disabled={isPlaying}
              >
                {isPlaying ? "Играется..." : "Прослушать мелодию"}
              </Button>
              <Button
                className={styles.btn}
                variant="primary"
                color="purple"
                onClick={() => {
                  tasks["Мелодия на клавиатуре"].saveMelody(
                    activeNotes,
                    id,
                    homeworkId as string,
                  );
                  setSaved(true);
                }}
                disabled={saved}
              >
                {saved ? "Сохранено" : "Сохранить"}
              </Button>
            </div>
          )}
        </>
      ) : (
        <p>Упражнение находится в разработке, но скоро появится!</p>
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
    </div>
  );
};
