import { useCreateTaskTrainingSimulator } from "@api";
import styles from "./TrainingSimulatorModal.module.css";
import { Settings } from "@models";
import { Dispatch, SetStateAction, useState } from "react";
import { Select, Button, Modal } from "@components/shared";
import CloseIcon from "@assets/icons/X.svg?react";
import { useNavigate } from "react-router-dom";
import { URLS } from "@utils";

interface TrainingSimulatorModalProps {
  id: string;
  name: string;
  description: string;
  settings: Settings;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const TrainingSimulatorModal = ({
  id,
  name,
  description,
  settings,
  showModal,
  setShowModal,
}: TrainingSimulatorModalProps) => {
  const navigate = useNavigate();
  const [selectedSettings, setSelectedSettings] = useState(["Все"] as string[]);
  const { mutate, isPending } = useCreateTaskTrainingSimulator();
  const handleClick = () => {
    const settings =
      name === "Мелодия на клавиатуре"
        ? {
            melodies: selectedSettings,
          }
        : {
            intervals: selectedSettings,
          };
    mutate(
      {
        variant_id: id,
        settings: settings,
      },
      {
        onSuccess: (data) => {
          navigate(`${URLS.STUDENT.TRAINING_SIMULATORS}/${data.data.id}`, {
            state: { task: data.data, variant_id: id, settings: settings },
          });
        },
      },
    );
  };
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <p className="heading_3">{name}</p>
          <CloseIcon
            onClick={() => setShowModal(false)}
            className={styles.icon}
          />
        </div>
        <p className="text_24_r">{description}</p>
        {settings != null && settings != undefined && settings.description && (
          <div className={styles.settings}>
            <p className="text_24_b">{settings.description}</p>
            {(name === "Пропевание" || name === "Определение на слух") &&
              settings.intervals && (
                <Select
                  placeholder="Выбери интервалы"
                  multiple
                  options={settings.intervals.map((interval) => ({
                    value: interval,
                    label: interval,
                  }))}
                  selectedOption={{ label: "Все", value: "Все" }}
                  onChange={(selectedOptions) => {
                    if (Array.isArray(selectedOptions) && selectedOptions) {
                      setSelectedSettings(
                        selectedOptions.map(
                          (selectedOption) => selectedOption.label,
                        ),
                      );
                    }
                  }}
                />
              )}
          </div>
        )}
        <Button
          color="purple"
          className={styles.btn}
          disabled={isPending}
          onClick={handleClick}
        >
          {isPending ? "Загрузка..." : "Начать"}
        </Button>
      </div>
    </Modal>
  );
};
