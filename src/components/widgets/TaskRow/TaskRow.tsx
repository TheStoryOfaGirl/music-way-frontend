import { Checkbox, Input, Modal, Select } from "@components/shared";
import { useState } from "react";
import QuestionIcon from "@assets/icons/QuestionLgPurple.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import styles from "./TaskRow.module.css";
import { classnames } from "@utils";
import { SelectOption } from "@models";

interface TaskRowProps {
  label: string;
  options: SelectOption[];
  showCountTasks: boolean;
  descriptionSelect: string;
  placeholder: string;
  descriptionTask: string;
  pathImage: string;
}

export const TaskRow = ({
  label,
  options,
  showCountTasks,
  descriptionSelect,
  placeholder,
  descriptionTask,
  pathImage,
}: TaskRowProps) => {
  const [showSettings, setShowSettings] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const handleClick = () => {
    setShowSettings((prev) => !prev);
  };
  return (
    <>
      <div className={styles.container}>
        <div className={styles.checkbox_question}>
          <Checkbox label={label} onClick={handleClick} />
          <QuestionIcon
            className={styles.question_icon}
            onClick={() => setShowModal(true)}
          />
        </div>
        {showSettings && (
          <div className={styles.settings}>
            <p className={classnames(styles.settings_title, "text_24_b")}>
              Настройки
            </p>
            {showCountTasks && (
              <div className={styles.count_tasks}>
                <p className="text_20_r">Количество упражнений</p>
                <Input
                  name="countTasks"
                  placeholder="Число"
                  rules={{ required: "Обязательно для заполнения" }}
                />
              </div>
            )}
            <div className={styles.select}>
              <p className="text_20_r">{descriptionSelect}</p>
              <Select
                options={options}
                multiple
                selectedOption={{ label: "Все", value: "All" }}
                placeholder={placeholder}
              />
            </div>
          </div>
        )}
      </div>
      <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
        <div className={styles.modal}>
          <div className={styles.title}>
            <p className="heading_3">{label}</p>
            <CloseIcon
              className={styles.close_icon}
              width={48}
              height={48}
              onClick={() => setShowModal(false)}
            />
          </div>
          <p className="text_24_r">{descriptionTask}</p>
          <img src={pathImage} alt={label} />
        </div>
      </Modal>
    </>
  );
};
