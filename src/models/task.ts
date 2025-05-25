import { CheckTaskMelodyOnPiano, CheckTaskSingingAudio } from "@models";

export type Task = {
  id: string;
  condition: string;
  task_type_variant: string;
  description: string;
  content: ContentTask;
};

export type ContentTask =
  | object
  | ContentTaskMelodyOnPiano
  | ContentTaskDefinitionByEar;

export type ContentTaskMelodyOnPiano = {
  intervals: string[];
  initial_note: string;
};

export type ContentTaskDefinitionByEar = {
  image_url: string;
  intervals: string[];
  audio_urls: AudioTaskDefinitionByEar[];
  image_name: string;
};

export type AudioTaskDefinitionByEar = {
  number: number;
  audio_url: string;
};

export type CheckTask = {
  delete_it: boolean;
  check_data:
    | CheckTaskSingingAudio
    | CheckTaskMelodyOnPiano
    | CheckTaskDefinitionByEar;
};

export type CheckTaskDefinitionByEar = {
  audio_number: number;
  interval: string;
};

export type AnswerTask = {
  is_right: boolean;
  answer: null;
};

export type CreateTask = {
  variant_id: string;
  settings: SettingsTaskCreate;
};

export type SettingsTaskCreate = {
  intervals?: string[];
  melodies?: string[];
};
