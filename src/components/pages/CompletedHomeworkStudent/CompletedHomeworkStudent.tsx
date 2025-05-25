import { IconContainer, Loader } from "@components/shared";
import styles from "./CompletedHomeworkStudent.module.css";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { useCheckAuth, useGetCompletedHomework } from "@api";
import { useLocation, useParams, useNavigate } from "react-router-dom";
import { formatScoreCompletedHomework, URLS } from "@utils";
import { AccordionCompletedHomework } from "@components/dummies";

const CompletedHomeworkStudent = () => {
  const location = useLocation();
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );

  const { id } = useParams<{ id: string }>();
  const {
    data: completedHomework,
    isLoading: isLodaingCompletedHomework,
    isSuccess: isSuccessCompletedHomework,
  } = useGetCompletedHomework(id as string);
  const navigate = useNavigate();
  if (isLoadingAuth || isLodaingCompletedHomework) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessCompletedHomework && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <IconContainer
              color="sky"
              content="icon"
              shadow
              onClick={() => {
                navigate(`${URLS.STUDENT.HOMEWORKS}`);
              }}
            >
              <ChevronLeftIcon width={48} height={48} />
            </IconContainer>
            <h1 className="heading_2">{completedHomework.data.topic}</h1>
          </div>
          <div className={styles.scores}>
            <p className="text_24_r">
              {
                formatScoreCompletedHomework(
                  completedHomework.data.student_mark,
                  completedHomework.data.max_mark,
                )[0]
              }
            </p>
            <p className="text_24_b">
              {
                formatScoreCompletedHomework(
                  completedHomework.data.student_mark,
                  completedHomework.data.max_mark,
                )[1]
              }
            </p>
            <p className="text_24_r">
              {
                formatScoreCompletedHomework(
                  completedHomework.data.student_mark,
                  completedHomework.data.max_mark,
                )[2]
              }
            </p>
          </div>
          {completedHomework.data.task_type_variants?.map((variantTask) => (
            <AccordionCompletedHomework
              name={variantTask.name}
              totalMark={variantTask.max_mark}
              mark={variantTask.student_mark}
              tasks={variantTask.tasks}
            />
          ))}
        </div>
      )}
    </>
  );
};

export default CompletedHomeworkStudent;
