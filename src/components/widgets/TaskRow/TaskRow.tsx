import { Checkbox, Input, Modal, Select } from "@components/shared";
import { useEffect, useState } from "react";
import QuestionIcon from "@assets/icons/QuestionLgPurple.svg?react";
import CloseIcon from "@assets/icons/X.svg?react";
import styles from "./TaskRow.module.css";
import { classnames } from "@utils";
import { SelectOption } from "@models";
import { useGetTrainingSimulator } from "@api";
import { TasksState, useTasksStore } from "@stores";

interface TaskRowProps {
  variant_id: string;
  name: string;
}

export const TaskRow = ({ variant_id, name }: TaskRowProps) => {
  const { data: variant, isSuccess: isSuccessVariant } =
    useGetTrainingSimulator(variant_id);
  const tasks = useTasksStore();
  const [showModal, setShowModal] = useState(false);
  const handleChange = (checked: boolean) => {
    if (isSuccessVariant) {
      tasks[variant.data.name as keyof TasksState].settings.updateChecked(
        checked,
      );
    }
  };
  const [options, setOptions] = useState({
    optionsIntervals: [] as SelectOption[],
  });

  useEffect(() => {
    if (isSuccessVariant && variant.data.id) {
      tasks[variant.data.name as keyof TasksState].settings.updateId(
        variant.data.id,
      );
    }
    if (isSuccessVariant && variant.data.settings.intervals) {
      setOptions({
        optionsIntervals: variant.data.settings.intervals.map((interval) => ({
          label: interval,
          value: interval,
        })),
      });
    }
    if (isSuccessVariant && variant.data.settings.melodies) {
      setOptions({
        optionsIntervals: variant.data.settings.melodies.map((melody) => ({
          label: melody.name,
          value: melody.id,
        })),
      });
    }
  }, [isSuccessVariant, variant?.data, tasks]);
  return (
    <>
      <>
        <div className={styles.container}>
          <div className={styles.checkbox_question}>
            <Checkbox
              id={variant_id}
              checked={tasks[name as keyof TasksState].settings.checked}
              onChange={handleChange}
              label={name}
            />
            <QuestionIcon
              className={styles.question_icon}
              onClick={() => setShowModal(true)}
            />
          </div>
          {isSuccessVariant && (
            <>
              {tasks[variant.data.name as keyof TasksState].settings
                .checked && (
                <div className={styles.settings}>
                  <p className={classnames(styles.settings_title, "text_24_b")}>
                    Настройки
                  </p>
                  {variant.data.settings.is_need_count && (
                    <div className={styles.count_tasks}>
                      <p className="text_20_r">Количество упражнений</p>
                      <Input
                        onChange={tasks["Пропевание"].settings.updateCountTasks}
                        name="countTasks"
                        placeholder="Число"
                        //rules={{ required: "Обязательно для заполнения" }}
                      />
                    </div>
                  )}
                  <div className={styles.select}>
                    <p className="text_20_r">
                      {variant.data.settings.description}
                    </p>
                    <Select
                      onChange={(selectedOptions) => {
                        if (Array.isArray(selectedOptions) && selectedOptions) {
                          tasks[
                            variant.data.name as keyof TasksState
                          ].settings.updateSelectedOptions(
                            selectedOptions.map(
                              (selectedOption) => selectedOption.value,
                            ),
                          );
                        }
                      }}
                      options={
                        options.optionsIntervals.length > 0
                          ? options.optionsIntervals
                          : [
                              {
                                label: "Нет значений",
                                value: "Нет значений",
                              },
                            ]
                      }
                      multiple
                      selectedOption={
                        variant.data.name !== "Мелодия на клавиатуре"
                          ? { label: "Все", value: "Все" }
                          : null
                      }
                      placeholder={
                        variant.data.name === "Мелодия на клавиатуре"
                          ? "Выберите мелодии"
                          : "Выберите интервалы"
                      }
                      isTitle={name === "Мелодия на клавиатуре"}
                    />
                  </div>
                </div>
              )}
              <Modal isOpen={showModal} onClose={() => setShowModal(false)}>
                <div className={styles.modal}>
                  <div className={styles.title}>
                    <p className="heading_3">{variant.data.name}</p>
                    <CloseIcon
                      className={styles.close_icon}
                      width={48}
                      height={48}
                      onClick={() => setShowModal(false)}
                    />
                  </div>
                  <p className="text_24_r">{variant.data.description}</p>
                  <img src={variant.data.demo_url} alt={variant.data.name} />
                </div>
              </Modal>
            </>
          )}
        </div>
      </>
    </>
  );
};
