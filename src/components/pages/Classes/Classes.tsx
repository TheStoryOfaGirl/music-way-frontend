import {
  useCheckAuth,
  useGetClasses,
  useGetClassStudent,
  useGetCompletedHomeworksTeacher,
} from "@api";
import styles from "./Classes.module.css";
import { Link, useLocation, useParams } from "react-router-dom";
import { Loader, Select, Table } from "@components/shared";
import PeopleIcon from "@assets/icons/PeopleFill.svg?react";
import { classnames, formatClassStudent, URLS } from "@utils";
import { useState } from "react";
import { HomeworksTeacher, TableStudent } from "@components/widgets";

function Classes() {
  const location = useLocation();
  const [activeClassId, setActiveClassId] = useState("");
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );
  const { isSuccess: isSuccessClassStudent, data: classStudent } =
    useGetClassStudent(activeClassId);

  const {
    isSuccess: isSuccessClasses,
    isLoading: isLoadingClasses,
    data: classes,
  } = useGetClasses();

  if (isLoadingAuth || isLoadingClasses) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessClasses && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <h1 className="heading_1">Мои классы</h1>
            <PeopleIcon />
          </div>
          <div className={styles.select_statistic}>
            <Select
              className={styles.select}
              options={
                classes.data.length > 0
                  ? classes.data.map((classStudent) => ({
                      value: formatClassStudent(
                        classStudent.class_number,
                        classStudent.week_day,
                        classStudent.class_time,
                      ),
                      label: formatClassStudent(
                        classStudent.class_number,
                        classStudent.week_day,
                        classStudent.class_time,
                      ),
                    }))
                  : [{ value: "Нет классов", label: "Нет классов" }]
              }
              placeholder="Выбрать класс"
              onChange={(selectedOption) => {
                console.log(selectedOption);
                setActiveClassId(
                  classes.data.find((classStudent) => {
                    if (!Array.isArray(selectedOption) && selectedOption) {
                      return (
                        formatClassStudent(
                          classStudent.class_number,
                          classStudent.week_day,
                          classStudent.class_time,
                        ) === selectedOption.label
                      );
                    }
                  })?.id as string,
                );
              }}
            />
            {isSuccessClassStudent && (
              <Link to={`${URLS.TEACHER.CLASSES}/${activeClassId}/statistic`} className={classnames(styles.link, "text_24_b")}>
                Перейти к статистике
              </Link>
            )}
          </div>
          {isSuccessClassStudent && (
            <TableStudent data={classStudent.data.students} />
          )}
          {isSuccessClassStudent && (
            <div className={styles.homeworks}>
              <HomeworksTeacher
                activeHomeworks={classStudent.data.active_homeworks}
                activeClassId={activeClassId}
              />
            </div>
          )}
        </div>
      )}
    </>
  );
}

export default Classes;
