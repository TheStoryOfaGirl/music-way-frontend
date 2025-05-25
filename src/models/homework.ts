import { Melody } from "./trainingSimulator";

export type HomeworkShort = {
  id: string;
  topic: string;
  end_date: string;
  max_mark: number;
};

export type HomeworkShortTeacher = HomeworkShort & {
  start_date: string;
  count: number;
};

export type ActiveHomeworkInfo = {
  id: string;
  topic: string;
  end_date: string;
  max_mark: number;
  block: string;
  count: number;
  task_type_variants: ActiveHomeworkVariantTask[];
  related_materials: RelatedMaterial[];
};

export type CompletedHomeworkStudent = {
  id: string;
  topic: string;
  student_mark: number;
  max_mark: number;
  task_type_variants: CompletedHomeworkVariantTask[];
};

export type CompletedHomeworkTeacher = Omit<
  CompletedHomeworkStudent,
  "student_mark" | "max_mark" | "task_type_variants"
>;

export type CompletedHomeworkVariantTask = {
  name: string;
  student_mark: number;
  max_mark: number;
  tasks: CompletedHomeworkTask[];
};

export type CompletedHomeworkTask = {
  number: number;
  student_mark: number;
  max_mark: number;
};

export type ActiveHomeworkVariantTask = {
  variant_id: string;
  name: string;
  count: number;
};

export type RelatedMaterial = {
  id: string;
  name: string;
};

export type HomeworkTeacher = {
  id: string;
  topic: string;
  end_date: string;
  max_mark: number;
  block: string;
  task_type_variants: ActiveHomeworkVariantTask[];
  related_materials: RelatedMaterial[];
  is_completed: boolean;
  start_date: string;
  results: ResultStudentByHomework[];
};

export type ResultStudentByHomework = {
  name: string;
  surname: string;
  patronymic: string;
  student_mark: number;
  tasks: ResultStudentByTask[];
};

export type ResultStudentByTask = {
  name: string;
  student_mark: number;
  max_mark: string;
};

export type UpdateHomeworkTeacher = Pick<
  HomeworkTeacher,
  "topic" | "start_date" | "end_date"
>;

export type CreateHomework = {
  topic: string;
  start_date: string;
  end_date: string;
  block_id: string;
  class_id: string;
  variants: VariantTask[];
};

export type VariantTask = {
  variant_id: string;
  settings: SettingsTaskCreateHomework;
};

export type SettingsTaskCreateHomework = {
  intervals?: string[];
  melodies?: MelodyCreate[];
  count?: number;
};

export type CreateHomeworkData = {
  topic: string;
  start_date: string;
  end_date: string;
  countTasks: number;
};

export type MelodyCreate = Omit<Melody, "name">;

export type CheckHomework = {
  task_id: string;
  check_data: CheckTaskSingingAudio | CheckTaskMelodyOnPiano;
};

export type CheckTaskSingingAudio = {
  audio_1: string;
  audio_2: string;
};

export type CheckTaskMelodyOnPiano = {
  notes: string[];
};
