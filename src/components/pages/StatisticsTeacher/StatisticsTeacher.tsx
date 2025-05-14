import {
  BarChartCustom,
  IconContainer,
  Loader,
  Select,
} from "@components/shared";
import styles from "./StatisticsTeacher.module.css";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { useNavigate, useParams } from "react-router-dom";
import {
  useCheckAuth,
  useGetStatisticByHomeworkTask,
  useGetStatisticByHomework,
} from "@api";
import { useEffect, useState } from "react";
import { classnames } from "@utils";

function StatisticsTeacher() {
  const navigate = useNavigate();
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );
  const { classId } = useParams();
  const {
    isLoading: isLoadingStatisticByHomework,
    isSuccess: isSuccessStatisticByHomework,
    data: statisticByHomeworks,
  } = useGetStatisticByHomework(classId as string);
  const [activeHomeworkId, setActiveHomeworkId] = useState("");
  const {
    isLoading: isLoadingStatisticByHomeworkTask,
    isSuccess: isSuccessStatisticByHomeworkTask,
    data: statisticByHomeworkTask,
  } = useGetStatisticByHomeworkTask(activeHomeworkId);

  useEffect(() => {
    if (isSuccessStatisticByHomework && statisticByHomeworks?.data?.length) {
      const lastHomeworkId =
        statisticByHomeworks.data[statisticByHomeworks.data.length - 1].id;
      setActiveHomeworkId(lastHomeworkId);
    }
  }, [isSuccessStatisticByHomework, statisticByHomeworks?.data]);
  if (isLoadingAuth || isLoadingStatisticByHomework) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessStatisticByHomework && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <IconContainer
              color="blue"
              content="icon"
              shadow
              onClick={() => {
                navigate(-1);
              }}
            >
              <ChevronLeftIcon width={48} height={48} />
            </IconContainer>
            <h1 className="heading_2">Статистика</h1>
          </div>
          <div className={styles.chart_info}>
            <p className="heading_3">
              Успешность выполнения домашних заданий за последние 3 месяца:
            </p>
            <p className="text_20_r">
              Вы можете увидеть, насколько хорошо ученики справляются с
              домашними заданиями
            </p>
          </div>
          {statisticByHomeworks.data.length > 0 ? (
            <div className={styles.bar_chart_container}>
              <BarChartCustom
                data={statisticByHomeworks.data.map((statistic) => ({
                  name: statistic.topic,
                  value: statistic.success_rate,
                }))}
                layout="horizontal"
                sizeCategoryAxis={180}
                color="sky"
                className={styles.bar_chart}
              />
            </div>
          ) : (
            <p className={classnames("text_24_r", styles.no_homeworks)}>Нет завершенных домашних заданий</p>
          )}
          <div className={styles.chart_info}>
            <p className="heading_3">Успешность выполнения упражнений:</p>
            <p className="text_20_r">
              Вы можете увидеть, насколько хорошо ученики справляются с
              различными видами упражнений в рамках
              <br />
              конкретного домашнего задания
            </p>
          </div>
          <Select
            className={styles.select}
            options={
              statisticByHomeworks.data.length > 0
                ? statisticByHomeworks.data.map((homework) => ({
                    value: homework.topic,
                    label: homework.topic,
                  }))
                : [
                    {
                      value: "Нет домашних заданий",
                      label: "Нет домашних заданий",
                    },
                  ]
            }
            placeholder="Выбрать домашнее задание"
            selectedOption={
              statisticByHomeworks.data.length > 0
                ? {
                    value:
                      statisticByHomeworks.data[
                        statisticByHomeworks.data.length - 1
                      ].topic,
                    label:
                      statisticByHomeworks.data[
                        statisticByHomeworks.data.length - 1
                      ].topic,
                  }
                : null
            }
            onChange={(selectedOption) => {
              setActiveHomeworkId(
                statisticByHomeworks.data.find((homework) => {
                  if (!Array.isArray(selectedOption) && selectedOption) {
                    return homework.topic === selectedOption.label;
                  }
                })?.id as string,
              );
            }}
          />
          {isLoadingStatisticByHomeworkTask && <Loader />}
          {isSuccessStatisticByHomeworkTask && (
            <div className={styles.bar_chart_container}>
              <BarChartCustom
                data={statisticByHomeworkTask.data.map((statistic) => ({
                  name: statistic.name,
                  value: statistic.success_rate,
                }))}
                layout="horizontal"
                sizeCategoryAxis={120}
                color="blue"
                className={styles.bar_chart_task}
              />
            </div>
          )}
          {!statisticByHomeworks.data.length && (
            <p className={classnames("text_24_r", styles.no_homeworks)}>Нет завершенных домашних заданий</p>
          )}
        </div>
      )}
    </>
  );
}

export default StatisticsTeacher;
