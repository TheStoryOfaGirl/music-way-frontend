import { URLS } from "./urls";

export const navListStudent = [
  {
    name: "Материалы",
    path: URLS.MATERIALS,
  },
  {
    name: "Домашние задания",
    path: URLS.STUDENT.HOMEWORKS,
  },
  {
    name: "Тренажёры",
    path: URLS.STUDENT.TRAINING_SIMULATORS,
  },
  {
    name: "Статистика",
    path: URLS.STUDENT.STATISTICS,
  },
];

export const navListTeacher = [
  {
    name: "Учебные материалы",
    path: URLS.MATERIALS,
  },
  {
    name: "Мои классы",
    path: URLS.TEACHER.CLASSES,
  },
];
