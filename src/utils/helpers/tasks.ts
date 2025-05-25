import { CheckHomework } from "@models";

export const checkActiveHomework = (homework_id: string) => {
  const homeworks = localStorage.getItem("homeworks");
  if (homeworks) {
    const homeworkList = JSON.parse(homeworks);
    return homeworkList.find(
      (homework: { homework_id: string; answers: CheckHomework[] }) =>
        homework.homework_id === homework_id,
    );
  }
};

export const deleteHomeworkFromLocalStorage = (homework_id: string) => {
  const homeworks = localStorage.getItem("homeworks");
  if (homeworks) {
    const homeworkList = JSON.parse(homeworks);
    localStorage.setItem(
      "homeworks",
      homeworkList.filter(
        (homework: { homework_id: string; answers: CheckHomework[] }) =>
          homework.homework_id !== homework_id,
      ),
    );
  }
};

export const checkSavingTaskInLocalStorage = (
  homework_id: string,
  task_id: string,
) => {
  const homeworks = localStorage.getItem("homeworks");
  const homeworkList: { homework_id: string; answers: CheckHomework[] }[] =
    homeworks ? JSON.parse(localStorage.getItem("homeworks") as string) : null;
  if (homeworkList) {
    const currentTask: CheckHomework | undefined = homeworkList
      .find((homework) => homework.homework_id === homework_id)
      ?.answers.find((answer) => answer.task_id === task_id);
    return !!currentTask;
  }
  return false;
};

export const getInitialNotesForMelodyOnPiano = (
  task_id: string,
  homework_id: string,
  initial_note: string,
) => {
  const homeworks = localStorage.getItem("homeworks");
  const homeworkList: { homework_id: string; answers: CheckHomework[] }[] =
    homeworks ? JSON.parse(localStorage.getItem("homeworks") as string) : null;
  if (homeworkList) {
    const currentTask: CheckHomework | undefined = homeworkList
      .find((homework) => homework.homework_id === homework_id)
      ?.answers.find((answer) => answer.task_id === task_id);
    if (currentTask && "notes" in currentTask.check_data) {
      return currentTask.check_data.notes;
    } else {
      return [initial_note];
    }
  }
  return [initial_note];
};

export const getActiveNoteAndStatus = (
  task_id: string,
  homework_id: string,
) => {
  const homeworks = localStorage.getItem("homeworks");
  const homeworkList: { homework_id: string; answers: CheckHomework[] }[] =
    homeworks ? JSON.parse(localStorage.getItem("homeworks") as string) : null;
  if (homeworkList) {
    const currentTask: CheckHomework | undefined = homeworkList
      .find((homework) => homework.homework_id === homework_id)
      ?.answers.find((answer) => answer.task_id === task_id);
    if (
      currentTask &&
      "audio_1" in currentTask.check_data &&
      !Object.prototype.hasOwnProperty.call(currentTask.check_data, 'audio_2')
    ) {
      return {
        note: "second",
        saved: false,
      };
    } else if (
      currentTask &&
      "audio_1" in currentTask.check_data &&
      Object.prototype.hasOwnProperty.call(currentTask.check_data, 'audio_2')
    ) {
      return {
        note: "second",
        saved: true,
      };
    } else
      return {
        note: "first",
        saved: false,
      };
  }
  return {
    note: "first",
    saved: false,
  };
};

export const noteToMidi = (note: string): number => {
  const noteMap: Record<string, number> = {
    C: 0,
    "C#": 1,
    D: 2,
    "D#": 3,
    E: 4,
    F: 5,
    "F#": 6,
    G: 7,
    "G#": 8,
    A: 9,
    "A#": 10,
    B: 11,
  };

  const match = note.match(/^([A-Z]#?)(-?\d+)$/);
  if (!match) return 60;

  const [, noteName, octave] = match;
  const semitone = noteMap[noteName];
  const octaveNum = parseInt(octave);

  return (octaveNum + 1) * 12 + semitone;
};

export const midiToNote = (midiNumber: number): string => {
  const notes = [
    "C",
    "C#",
    "D",
    "D#",
    "E",
    "F",
    "F#",
    "G",
    "G#",
    "A",
    "A#",
    "B",
  ];
  const octave = Math.floor(midiNumber / 12) - 1;
  const noteName = notes[midiNumber % 12];
  return `${noteName}${octave}`;
};
