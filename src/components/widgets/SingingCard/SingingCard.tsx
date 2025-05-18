import MicIcon from "@assets/icons/MicFill.svg?react";
import styles from "./SingingCard.module.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { classnames } from "@utils";
import { Button } from "@components/shared";
import { useTasksStore } from "@stores";
import CheckIcon from "@assets/icons/CheckLg.svg?react";
import { useParams } from "react-router-dom";

type ConditionSingingNote = "default" | "recording" | "recorded" | "saved";

interface SingingCardProps {
  name: string;
  activeNote: string;
  setActiveNote: Dispatch<SetStateAction<{ note: string; saved: boolean }>>;
  taskId: string;
  saved: boolean;
}

export const SingingCard = ({
  name,
  activeNote,
  setActiveNote,
  taskId,
  saved,
}: SingingCardProps) => {
  const {id} = useParams();
  const [condition, setCondition] = useState<ConditionSingingNote>("default");
  const [base64Audio, setbase64Audio] = useState<string>("");
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    {
      audio: true,
      onStop: async (_, blob) => {
        if (blob.type.includes("audio")) {
          const base64Audio = await convertBlobToBase64(blob);
          setbase64Audio(base64Audio);
          setCondition("recorded");
        }
      },
    },
  );
  const tasks = useTasksStore();
  const convertBlobToBase64 = (blob: Blob): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(blob);
      reader.onloadend = () => {
        if (typeof reader.result === "string") {
          const base64String = reader.result.split(",")[1];
          resolve(base64String);
        } else {
          reject(new Error("Ожидалась строка в результате FileReader"));
        }
      };
      reader.onerror = () => reject(reader.error);
    });
  };
  const toggleRecording = async () => {
    if (
      condition === "default" ||
      condition === "recorded" ||
      (activeNote === "first" && !saved && condition === "saved") ||
      (activeNote === "second" && !saved && condition === "saved")
    ) {
      startRecording();
      setCondition("recording");
    }
    if (condition === "recording") {
      stopRecording();
    }
  };
  const handleClick = () => {
    if (name === "first") {
      tasks["Пропевание"].saveFirstNote(base64Audio, taskId, id as string);
      setActiveNote({ note: "second", saved: false });
    } else {
      tasks["Пропевание"].saveSecondNote(base64Audio, taskId, id as string);
      setActiveNote({ note: "second", saved: true });
    }
    setCondition("saved");
  };
  return (
    <div
      className={classnames(
        styles.card,
        activeNote !== name && name === "second" ? styles.disable_card : "",
      )}
    >
      {((condition === "default" && !saved) ||
        condition === "recorded" ||
        (activeNote === "first" && !saved && condition === "saved") ||
        (activeNote === name &&
          activeNote === "second" &&
          !saved &&
          condition === "saved")) && (
        <p className="text_32_r">{`Нажми, чтобы записать ${name === "first" ? "первую" : "вторую"} ноту`}</p>
      )}
      {condition === "recording" && (
        <p className="text_32_r">{`Идет запись...`}</p>
      )}
      {!saved && (
        <button
          onClick={toggleRecording}
          className={classnames(
            styles.icon_container,
            condition === "recording" ? styles.active_mic : "",
          )}
        >
          <MicIcon className={styles.icon} />
        </button>
      )}
      {condition === "recorded" && (
        <p className="text_24_r">
          Послушай аудиозапись. Если не<br/> сомневаешься в ответе, нажми сохранить
        </p>
      )}
      <div className={styles.audio}>
        {mediaBlobUrl && condition === "recorded" && (
          <audio src={mediaBlobUrl} controls />
        )}
      </div>
      {condition === "recorded" && (
        <Button className={styles.btn} onClick={handleClick}>
          Сохранить
        </Button>
      )}
      {saved && (
        <>
          <CheckIcon width={120} height={120} className={styles.check_icon} />
          <p className="text_32_r">Запись сохранена</p>
        </>
      )}
    </div>
  );
};
