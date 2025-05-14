import {
  useCheckAuth,
  useGetStatisticByTopicBlock,
  useGetStatisticByUser,
} from "@api";
import styles from "./StatisticsStudent.module.css";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import { BarChartCustom, Loader, Select } from "@components/shared";
import { classnames, getStatusByStatistics } from "@utils";

function StatisticsStudent() {
  const [blockId, setBlockId] = useState("");
  const location = useLocation();
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );

  const {
    data: statisticsByUser,
    isSuccess: isSuccessStatisticsByUser,
    isLoading: isLoadingStatisticsByUser,
    isError: isErrorStatisticsByUser,
    error: errorStatisticsByUser,
  } = useGetStatisticByUser();

  const { data: statistics, isSuccess: isSuccessStatistics } =
    useGetStatisticByTopicBlock(blockId);

  if (isLoadingAuth || isLoadingStatisticsByUser) return <Loader />;
  return (
    <>
      {isSuccessAuth && (
        <div className={styles.container}>
          <h1 className="heading_1">Статистика</h1>
          {isErrorStatisticsByUser &&
            errorStatisticsByUser.response?.data.detail ===
              "Не найден класс с таким user_id" && (
              <p
                className={classnames("text_24_r", styles.error)}
              >{`Ты пока не состоишь ни в одном классе. Подожди, пока тебя внесут в список класса`}</p>
            )}
          {isSuccessStatisticsByUser && (
            <>
              <div className={styles.statisticsByUser}>
                {!statisticsByUser.data.success_rate ? (
                  <p className="text_24_r">
                    Ты пока не выполнил ни одного задания, но всё впереди!
                  </p>
                ) : (
                  <>
                    <p className="text_32_r">Ты справляешься с</p>
                    <p className="heading_2">{`${statisticsByUser.data.success_rate}%`}</p>
                    <p className="text_32_r">{`заданий. ${getStatusByStatistics(statisticsByUser.data.success_rate)}`}</p>
                  </>
                )}
              </div>
              <div className={styles.chart_info}>
                <p className="heading_3">
                  Диаграмма успешности выполнения различных типов заданий
                </p>
                <p className="text_24_r">
                  Здесь ты можешь узнать, насколько хорошо справляешься с
                  различными типами заданий по разным темам.
                </p>
              </div>
              <Select
                options={statisticsByUser.data.topic_blocks.map((block) => ({
                  value: block.name,
                  label: block.name,
                }))}
                placeholder="Выбрать тему"
                onChange={(selectedOption) => {
                  console.log(selectedOption);
                  setBlockId(
                    statisticsByUser.data.topic_blocks.find((block) => {
                      if (!Array.isArray(selectedOption) && selectedOption) {
                        return block.name === selectedOption.label;
                      }
                    })?.id as string,
                  );
                }}
              />
              {isSuccessAuth && isSuccessStatistics && (
                <div className={styles.bar_chart_container}>
                  <BarChartCustom
                    data={statistics.data.map((statistic) => ({
                      name: statistic.name,
                      value: statistic.success_rate,
                    }))}
                    layout="vertical"
                    sizeCategoryAxis={120}
                    color="blue"
                    className={styles.bar_chart}
                  />
                </div>
              )}
            </>
          )}
        </div>
      )}
    </>
  );
}

export default StatisticsStudent;
