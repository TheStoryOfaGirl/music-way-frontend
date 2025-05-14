import MicIcon from "@assets/icons/MicFill.svg?react"; // или другая иконка микрофона
import styles from "./SingingCard.module.css";
import { useReactMediaRecorder } from "react-media-recorder";
import { Dispatch, SetStateAction, useState } from "react";
import { classnames } from "@utils";
import { Button } from "@components/shared";

interface RecordingData {
  blob: Blob;
  blobURL: string;
  startTime?: number;
  stopTime?: number;
  options?: any;
}

type ConditionSingingNote = "default" | "recording" | "recorded" | "saved";

interface SingingCardProps {
  name: string;
  activeNote: string;
  setActiveNote: Dispatch<SetStateAction<string>>;
}

export const SingingCard = ({
  name,
  activeNote,
  setActiveNote,
}: SingingCardProps) => {
  const [condition, setCondition] = useState<ConditionSingingNote>("default");
  const { startRecording, stopRecording, mediaBlobUrl } = useReactMediaRecorder(
    { audio: true },
  );
  const toggleRecording = () => {
    if (condition === "default" || condition === "recorded") {
      startRecording();
      setCondition("recording");
    }
    if (condition === "recording") {
      stopRecording();
      setCondition("recorded");
    }
  };
  return (
    <div className={classnames(styles.card, activeNote !== name ? styles.disable_card : "")}>
      {(condition === "default" || condition === "recorded") && (
        <p className="text_32_r">{`Нажми, чтобы записать ${name === "first" ? "первую" : "вторую"} ноту`}</p>
      )}
      {condition === "recording" && (
        <p className="text_32_r">{`Идет запись...`}</p>
      )}
      {condition !== "saved" && (
        <button onClick={toggleRecording} className={styles.icon_container}>
          <MicIcon
            className={classnames(
              styles.icon,
              condition === "recording" ? styles.active_mic : "",
            )}
          />
        </button>
      )}
      {condition === "recorded" && (
        <p className="text_24_r">
          Послушай аудиозапись. Если уверен в ответе,
          <br /> нажми сохранить
        </p>
      )}
      <div className={styles.audio}>
        {mediaBlobUrl && condition === "recorded" && (
          <audio src={mediaBlobUrl} controls />
        )}
      </div>
      {condition === "recorded" && (
        <Button className={styles.btn}>Сохранить</Button>
      )}
    </div>
  );
};
