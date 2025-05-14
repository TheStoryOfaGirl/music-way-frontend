import { useLocation, useNavigate, useParams } from "react-router-dom";
import styles from "./ActiveHomeworkInfo.module.css";
import { formatFinishDate, pluralize, URLS } from "@utils";
import { Button, IconContainer, Loader } from "@components/shared";
import { useCheckAuth, useGetActiveHomeworkInfo } from "@api";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { DaysLeft, LinkItem } from "@components/dummies";

const ActiveHomeworkInfo = () => {
  const location = useLocation();
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );

  const { id } = useParams<{ id: string }>();
  const {
    data,
    isSuccess,
    isLoading: isLoadingActiveHomework,
  } = useGetActiveHomeworkInfo(id as string);
  const navigate = useNavigate()
  if (isLoadingActiveHomework || isLoadingAuth) return <Loader />;
  return (
    <>
      {isSuccess && isSuccessAuth && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <IconContainer color="blue" content="icon" shadow onClick={() => {navigate(-1)}}>
              <ChevronLeftIcon width={48} height={48} />
            </IconContainer>
            <h1 className="heading_2">{data.data.topic}</h1>
          </div>
          <div className={styles.add_info}>
            <div className={styles.deadline_container}>
              <div className={styles.deadline}>
                <p className="text_24_b">Срок сдачи:</p>
                <p className="text_24_m">
                  {formatFinishDate(data.data.end_date)}
                </p>
              </div>
              <DaysLeft countDays={data.data.end_date} />
            </div>
            <div className={styles.max_mark}>
              <p className="text_24_m">Максимальный балл:</p>
              <p className="text_24_b">{data.data.max_mark}</p>
            </div>
          </div>
          <div className={styles.main_info}>
            <div className={styles.theme}>
              <p className="text_24_b">{`Тема:`}</p>
              <p className="text_24_m">{data.data.block}</p>
            </div>
            <div className={styles.tasks}>
              <p className="text_24_b">Задания:</p>
              <ul className={styles.tasks_list}>
                {data.data.task_type_variants.map((task) => (
                  <li key={task.variant_id} className={styles.task}>
                    <p className="text_24_m">{task.name}</p>
                    <p className="text_24_m">{`(${pluralize(task.count, ["задание", "задания", "заданий"])})`}</p>
                  </li>
                ))}
              </ul>
            </div>
            <div className={styles.related_materials}>
              <p className="text_24_b">
                Перед тем, как приступить к выполнению, повтори темы:
              </p>
              <ul className={styles.related_materials_list}>
                {data.data.related_materials.map((link) => (
                  <LinkItem key={link.id} name={link.name} path={`${URLS.MATERIALS}/${link.id}`} />
                ))}
              </ul>
            </div>
          </div>
          <Button color="purple" className={styles.btn} onClick={() => {navigate(`${URLS.STUDENT.HOMEWORKS}/${id}/active/execute`)}}>Выполнить</Button>
        </div>
      )}
    </>
  );
};

export default ActiveHomeworkInfo;
