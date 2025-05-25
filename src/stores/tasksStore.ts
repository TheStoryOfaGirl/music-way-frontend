import { CheckHomework } from "@models";
import { ChangeEvent } from "react";
import { create } from "zustand";

export type TasksState = {
  Пропевание: {
    id: string;
    settings: {
      checked: boolean;
      countTasks: number;
      selectedOptions: string[];
      updateCountTasks: (countTasks: ChangeEvent<HTMLInputElement>) => void;
      updateChecked: (checked: boolean) => void;
      updateSelectedOptions: (selectedOptions: string[]) => void;
      updateId: (id: string) => void;
    };
    saveFirstNote: (note: string, task_id: string, homework_id: string) => void;
    saveSecondNote: (
      note: string,
      task_id: string,
      homework_id: string,
    ) => void;
    reset: (task_id: string, homework_id: string) => void;
  };
  "Мелодия на клавиатуре": {
    id: string;
    settings: {
      checked: boolean;
      selectedOptions: string[];
      updateChecked: (checked: boolean) => void;
      updateSelectedOptions: (selectedOptions: string[]) => void;
      updateId: (id: string) => void;
    };
    saveMelody: (
      intervals: string[],
      task_id: string,
      homework_id: string,
    ) => void;
    reset: (task_id: string, homework_id: string) => void;
  };
};

export const useTasksStore = create<TasksState>((set) => ({
  Пропевание: {
    id: "",
    settings: {
      checked: false,
      countTasks: 0,
      selectedOptions: ["Все"],
      updateCountTasks: (countTasks) =>
        set((state) => ({
          Пропевание: {
            ...state["Пропевание"],
            settings: {
              ...state["Пропевание"].settings,
              countTasks: Number(countTasks.target.value),
            },
          },
        })),
      updateChecked: (checked) =>
        set((state) => ({
          Пропевание: {
            ...state["Пропевание"],
            settings: {
              ...state["Пропевание"].settings,
              checked,
            },
          },
        })),
      updateSelectedOptions: (selectedOptions) =>
        set((state) => ({
          Пропевание: {
            ...state["Пропевание"],
            settings: {
              ...state["Пропевание"].settings,
              selectedOptions,
            },
          },
        })),
      updateId: (id) =>
        set((state) => ({
          Пропевание: {
            ...state["Пропевание"],
            id,
          },
        })),
    },
    saveFirstNote: (note, task_id, homework_id) => {
      const homeworks = localStorage.getItem("homeworks");
      if (homeworks) {
        const homeworkList = JSON.parse(homeworks);
        if (
          homeworkList.find(
            (homework: { homework_id: string; answers: CheckHomework[] }) =>
              homework.homework_id === homework_id,
          )
        ) {
          localStorage.setItem(
            "homeworks",
            JSON.stringify(
              homeworkList.map(
                (homework: {
                  homework_id: string;
                  answers: CheckHomework[];
                }) => {
                  if (homework.homework_id === homework_id) {
                    return {
                      ...homework,
                      answers: [
                        ...homework.answers,
                        {
                          task_id: task_id,
                          check_data: {
                            audio_1: note,
                          },
                        },
                      ],
                    };
                  }
                  return homework;
                },
              ),
            ),
          );
        } else {
          localStorage.setItem(
            "homeworks",
            JSON.stringify([
              ...homeworkList,
              {
                homework_id: homework_id,
                answers: [
                  {
                    task_id: task_id,
                    check_data: {
                      audio_1: note,
                    },
                  },
                ],
              },
            ]),
          );
        }
      } else {
        localStorage.setItem(
          "homeworks",
          JSON.stringify([
            {
              homework_id: homework_id,
              answers: [
                {
                  task_id: task_id,
                  check_data: {
                    audio_1: note,
                  },
                },
              ],
            },
          ]),
        );
      }
    },
    saveSecondNote: (note, task_id, homework_id) => {
      const homeworks = localStorage.getItem("homeworks");
      if (homeworks) {
        const homeworksList: {
          homework_id: string;
          answers: CheckHomework[];
        }[] = JSON.parse(homeworks).map(
          (homework: { homework_id: string; answers: CheckHomework[] }) => {
            if (homework.homework_id === homework_id) {
              return {
                ...homework,
                answers: homework.answers.map((answer) => {
                  if (answer.task_id === task_id) {
                    return {
                      ...answer,
                      check_data: {
                        ...answer.check_data,
                        audio_2: note,
                      },
                    };
                  }
                  return answer;
                }),
              };
            }
            return homework;
          },
        );
        localStorage.setItem("homeworks", JSON.stringify(homeworksList));
      }
    },
    reset: (task_id, homework_id) => {
      const homeworks = localStorage.getItem("homeworks");
      if (homeworks) {
        const homeworkList: {
          homework_id: string;
          answers: CheckHomework[];
        }[] = JSON.parse(homeworks).map(
          (homework: { homework_id: string; answers: CheckHomework[] }) => {
            if (homework.homework_id === homework_id) {
              const filterAnswers = homework.answers.filter(
                (answer: CheckHomework) => answer.task_id !== task_id,
              );
              return {
                homework_id: homework_id,
                answers: filterAnswers,
              };
            }
          },
        );
        localStorage.setItem("homeworks", JSON.stringify(homeworkList));
      }
    },
  },
  "Мелодия на клавиатуре": {
    id: "",
    settings: {
      checked: false,
      selectedOptions: [],
      updateChecked: (checked) =>
        set((state) => ({
          "Мелодия на клавиатуре": {
            ...state["Мелодия на клавиатуре"],
            settings: {
              ...state["Мелодия на клавиатуре"].settings,
              checked,
            },
          },
        })),
      updateSelectedOptions: (selectedOptions) =>
        set((state) => ({
          "Мелодия на клавиатуре": {
            ...state["Мелодия на клавиатуре"],
            settings: {
              ...state["Мелодия на клавиатуре"].settings,
              selectedOptions,
            },
          },
        })),
      updateId: (id) =>
        set((state) => ({
          "Мелодия на клавиатуре": {
            ...state["Мелодия на клавиатуре"],
            id,
          },
        })),
    },
    saveMelody: (intervals, task_id, homework_id) => {
      const homeworks = localStorage.getItem("homeworks");
      if (homeworks) {
        const homeworkList = JSON.parse(homeworks);
        if (
          homeworkList.find(
            (homework: { homework_id: string; answers: CheckHomework[] }) =>
              homework.homework_id === homework_id,
          )
        ) {
          localStorage.setItem(
            "homeworks",
            JSON.stringify(
              homeworkList.map(
                (homework: {
                  homework_id: string;
                  answers: CheckHomework[];
                }) => {
                  if (homework.homework_id === homework_id) {
                    return {
                      ...homework,
                      answers: [
                        ...homework.answers,
                        {
                          task_id: task_id,
                          check_data: {
                            notes: intervals,
                          },
                        },
                      ],
                    };
                  }
                  return homework;
                },
              ),
            ),
          );
        } else {
          localStorage.setItem(
            "homeworks",
            JSON.stringify([
              ...homeworkList,
              {
                homework_id: homework_id,
                answers: [
                  {
                    task_id: task_id,
                    check_data: {
                      notes: intervals,
                    },
                  },
                ],
              },
            ]),
          );
        }
      } else {
        localStorage.setItem(
          "homeworks",
          JSON.stringify([
            {
              homework_id: homework_id,
              answers: [
                {
                  task_id: task_id,
                  check_data: {
                    notes: intervals,
                  },
                },
              ],
            },
          ]),
        );
      }
    },
    reset: (task_id, homework_id) => {
      const homeworks = localStorage.getItem("homeworks");
      if (homeworks) {
        const homeworkList: {
          homework_id: string;
          answers: CheckHomework[];
        }[] = JSON.parse(homeworks).map(
          (homework: { homework_id: string; answers: CheckHomework[] }) => {
            if (homework.homework_id === homework_id) {
              const filterAnswers = homework.answers.filter(
                (answer: CheckHomework) => answer.task_id !== task_id,
              );
              return {
                homework_id: homework_id,
                answers: filterAnswers,
              };
            }
          },
        );
        localStorage.setItem("homeworks", JSON.stringify(homeworkList));
      }
    },
  },
}));
