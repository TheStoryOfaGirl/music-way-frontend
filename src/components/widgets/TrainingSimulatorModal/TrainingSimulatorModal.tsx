import { useGetTrainingSimulator } from "@api";
import styles from "./TrainingSimulatorModal.module.css";
import { Settings } from "@models";
import { Dispatch, SetStateAction, useState } from "react";
import { Select, Button, Modal } from "@components/shared";
import CloseIcon from "@assets/icons/X.svg?react";

interface TrainingSimulatorModalProps {
  name: string;
  description: string;
  settings: Settings;
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const TrainingSimulatorModal = ({
  name,
  description,
  settings,
  showModal,
  setShowModal,
}: TrainingSimulatorModalProps) => {
  const [selectedSettings, setSelectedSettings] = useState([] as string[]);
  console.log(selectedSettings);
  return (
    <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
      <div className={styles.content}>
        <div className={styles.heading}>
          <p className="heading_3">{name}</p>
          <CloseIcon onClick={() => setShowModal(false)} className={styles.icon}/>
        </div>
        <p className="text_24_r">{description}</p>
        {settings != null && settings != undefined && settings.description && (
          <div className={styles.settings}>
            <p className="text_24_b">{settings.description}</p>
            {(name === "Пропевание" || name === "Определение на слух")  && settings.intervals && (
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
        <Button color="purple" className={styles.btn}>Начать</Button>
      </div>
    </Modal>
  );
};
