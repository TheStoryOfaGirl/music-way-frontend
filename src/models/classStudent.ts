import { HomeworkShortTeacher } from "./homework";

export type ClassStudentShort = {
  id: string;
  class_number: number;
  week_day: string;
  class_time: string;
}

export type ClassStudent = {
  id: string;
  class_number: number;
  week_day: string;
  class_time: string;
  students: StudentTable[];
  active_homeworks: HomeworkShortTeacher[];
}

export type StudentTable = {
  id: string;
  name: string;
  surname: string;
  patronymic: string
}

