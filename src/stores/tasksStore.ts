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
  },
}));
