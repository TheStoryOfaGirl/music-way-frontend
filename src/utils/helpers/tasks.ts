import { CheckHomework } from "@models";

// export const getAnswers = (answers: string | null): CheckHomework[] | null => {
//   if (answers) {
//     return JSON.parse(localStorage.getItem("answers") as string);
//   }
//   return null;
// };

export const checkActiveHomework = (homework_id: string) => {
  const homeworks = localStorage.getItem("homeworks");
  if (homeworks) {
    const homeworkList = JSON.parse(homeworks);
    return homeworkList.find((homework: {homework_id: string, answers: CheckHomework[]}) => homework.homework_id === homework_id)
  }
}

export const deleteHomeworkFromLocalStorage = (homework_id: string) => {
  const homeworks = localStorage.getItem("homeworks");
  if (homeworks) {
    const homeworkList = JSON.parse(homeworks);
    localStorage.setItem("homeworks", homeworkList.filter((homework: {homework_id: string, answers: CheckHomework[]}) => homework.homework_id !== homework_id))
  }
}

export const getActiveNoteAndStatus = (task_id: string, homework_id: string) => {
  const homeworks = localStorage.getItem("homeworks");
  const homeworkList: { homework_id: string; answers: CheckHomework[] }[] =
    homeworks ? JSON.parse(localStorage.getItem("homeworks") as string) : null;
  if (homeworkList) {
    const currentTask: CheckHomework | undefined = homeworkList.find((homework) => homework.homework_id === homework_id)?.answers.find(
      (answer) => answer.task_id === task_id,
    );
    console.log(currentTask);
    if (
      currentTask &&
      "audio_1" in currentTask.check_data &&
      !currentTask.check_data.hasOwnProperty("audio_2")
    ) {
      return {
        note: "second",
        saved: false,
      };
    } else if (
      currentTask &&
      "audio_1" in currentTask.check_data &&
      currentTask.check_data.hasOwnProperty("audio_2")
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
