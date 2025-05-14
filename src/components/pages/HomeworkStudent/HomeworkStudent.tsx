import { Button, IconContainer } from "@components/shared";
import styles from "./HomeworkStudent.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { useGetActiveHomeworkInfo, useGetTask } from "@api";
import { useState } from "react";
import { TaskSinging } from "@components/widgets";
import { classnames } from "@utils";

function HomeworkStudent() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [activeTask, setActiveTask] = useState(1);
  const { data: homework, isSuccess: isSuccessHomework } =
    useGetActiveHomeworkInfo(id as string);
  const { data: task, isSuccess: isSuccessTask } = useGetTask(id as string, 1);
  const getActiveTask = () => {
    if (isSuccessTask) {
      switch (task.data.task_type_variant) {
        case "Пропевание":
          return <TaskSinging {...task.data} />;
      }
    }
  };
  return (
    <>
      {/* {isSuccessHomework && ( */}
        <div className={styles.container}>
          <div className={styles.heading}>
            <div className={styles.topic}>
            <IconContainer
              color="sky"
              content="icon"
              shape="square"
              shadow
              onClick={() => {
                navigate(-1);
              }}
            >
              <ChevronLeftIcon width={48} height={48} />
            </IconContainer>
            {/* <h2 className="heading_2">{homework.data.topic}</h2> */}
            </div>
            <Button color="purple" className={styles.btn}>Завершить</Button>
          </div>
          <div className={styles.number_list}>
            {/* {Array.from({ length: homework.data.count }, (_, i) => (
              <IconContainer
                color="blue"
                content="text"
                dataNumber={`${i + 1}`}
                className="text_24_b"
                active={activeTask === i + 1}
                onClick={() => setActiveTask(i + 1)}
              />
            ))} */}
          </div>
          {/* <div className={styles.task}>{getActiveTask()}</div> */}
          <div className={styles.task}><TaskSinging id={"1"} condition="ddd" task_type_variant="Пропевание" description="" content={{}}/></div>
        </div>
      {/* )} */}
    </>
  );
}

export default HomeworkStudent;
