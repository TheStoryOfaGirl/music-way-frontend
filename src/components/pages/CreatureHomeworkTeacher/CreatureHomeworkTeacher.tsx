import {
  Button,
  CalendarCustom,
  IconContainer,
  Input,
  Loader,
  Select,
} from "@components/shared";
import styles from "./CreatureHomeworkTeacher.module.css";
import { useNavigate, useParams } from "react-router-dom";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { FormProvider, useForm } from "react-hook-form";
import {
  classnames,
  formatDate,
  formatDateForCreateHomework,
  formatDateForUpdateHomework,
  URLS,
  useOnClickOutside,
} from "@utils";
import { CreateHomeworkData, ValuePiece, VariantTask } from "@models";
import { RefObject, useRef, useState } from "react";
import {
  useCreateHomeworkTeacher,
  useGetMaterials,
  useGetVariantsTaskByBlock,
} from "@api";
import { TaskRow } from "@components/widgets";
import { TasksState, useTasksStore } from "@stores";

function CreatureHomeworkTeacher() {
  const navigate = useNavigate();
  const methods = useForm<CreateHomeworkData>();
  const { classId } = useParams();
  const [blockId, setBlockId] = useState("");
  const [dateRange, setDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece]
  >([new Date(), new Date()]);
  const [isVisibleCalendar, setIsVisibleCalendar] = useState({
    firstCalendar: false,
    secondCalendar: false,
  });
  const firstCalendarRef = useRef<HTMLDivElement>(null);
  const secondCalendarRef = useRef<HTMLDivElement>(null);
  useOnClickOutside(firstCalendarRef as RefObject<HTMLDivElement>, () =>
    setIsVisibleCalendar({
      firstCalendar: false,
      secondCalendar: false,
    }),
  );
  useOnClickOutside(secondCalendarRef as RefObject<HTMLDivElement>, () =>
    setIsVisibleCalendar({
      firstCalendar: false,
      secondCalendar: false,
    }),
  );
  const {
    data: blocks,
    isSuccess: isSuccessMaterials,
    isLoading: isLoadingMaterials,
  } = useGetMaterials();
  const {
    data: variants,
    isSuccess: isSuccessVariants,
    isLoading: isLoadingVariants,
  } = useGetVariantsTaskByBlock(blockId);

  const tasks = useTasksStore();
  const { mutate } = useCreateHomeworkTeacher();
  const onSubmit = (data: CreateHomeworkData) => {
    const variants: VariantTask[] = Object.keys(tasks)
      .map((task) => {
        if (tasks[task as keyof TasksState].settings.checked) {
          return {
            variant_id: tasks[task as keyof TasksState].id,
            settings:
              task === "Мелодия на клавиатуре"
                ? {
                    melodies:
                      tasks[task as keyof TasksState].settings.selectedOptions,
                  }
                : {
                    intervals:
                      tasks[task as keyof TasksState].settings.selectedOptions,
                    count: tasks["Пропевание"].settings.countTasks,
                  },
          };
        }
        return null;
      })
      .filter(Boolean) as VariantTask[];
    mutate(
      {
        topic: data.topic,
        start_date:
          Array.isArray(dateRange) && dateRange[0]
            ? formatDateForUpdateHomework(dateRange[0])
            : "",
        end_date:
          Array.isArray(dateRange) && dateRange[1]
            ? formatDateForUpdateHomework(dateRange[1])
            : "",
        block_id: blockId,
        class_id: classId as string,
        variants: variants,
      },
      {
        onSuccess: (data) => {
          navigate(
            `${URLS.TEACHER.CLASSES}/${classId}/homeworks/${data.data}/active`,
          );
        },
      },
    );
  };
  return (
    <>
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
          <h2 className="heading_2">{`Новое домашнее задание`}</h2>
        </div>
        <FormProvider {...methods}>
          <form onSubmit={methods.handleSubmit(onSubmit)}>
            <Input
              name="topic"
              defaultValue={`Домашнее задание от ${formatDateForCreateHomework(new Date())}`}
              className={styles.input_heading}
            />
            <div className={styles.date_edit}>
              <p className="text_24_r">{`Срок выполнения:`}</p>
              <div className={styles.date_inputs}>
                <div className={styles.date_calendar}>
                  <Input
                    className={styles.date_input}
                    name="start_date"
                    value={
                      Array.isArray(dateRange)
                        ? formatDate(String(dateRange[0]))
                        : formatDate(String(dateRange))
                    }
                    onClick={() => {
                      setIsVisibleCalendar({
                        secondCalendar: false,
                        firstCalendar: true,
                      });
                    }}
                    readOnly
                  />
                  {isVisibleCalendar.firstCalendar && (
                    <div ref={firstCalendarRef}>
                      <CalendarCustom
                        className={styles.calendar}
                        value={dateRange}
                        onClickDay={(value) => {
                          setDateRange(value);
                          setIsVisibleCalendar((prev) => ({
                            ...prev,
                            firstCalendar: false,
                          }));
                        }}
                      />
                    </div>
                  )}
                </div>
                <div className={styles.date_calendar}>
                  <Input
                    className={styles.date_input}
                    name="end_date"
                    value={
                      Array.isArray(dateRange)
                        ? formatDate(String(dateRange[1]))
                        : ""
                    }
                    onClick={() => {
                      setIsVisibleCalendar({
                        firstCalendar: false,
                        secondCalendar: true,
                      });
                    }}
                    readOnly
                  />
                  {isVisibleCalendar.secondCalendar && (
                    <div ref={secondCalendarRef}>
                      <CalendarCustom
                        className={styles.calendar}
                        onChange={(value) => {
                          if (Array.isArray(value)) {
                            setDateRange(value);
                            setIsVisibleCalendar((prev) => ({
                              ...prev,
                              secondCalendar: false,
                            }));
                          }
                        }}
                        value={dateRange}
                        onClickDay={(value) => {
                          if (!Array.isArray(value)) {
                            setDateRange(value);
                          }
                        }}
                      />
                    </div>
                  )}
                </div>
              </div>
            </div>
            <div className={styles.tasks}>
              <h3 className="heading_3">Упражнения</h3>
              <p className={classnames(styles.max_tasks, "text_20_r")}>
                Можно задать максимум 10 упражнений
              </p>
              {isLoadingMaterials && (
                <div className={styles.loader}>
                  <Loader />
                </div>
              )}
              {isSuccessMaterials && (
                <Select
                  className={styles.select}
                  placeholder="Выбрать раздел"
                  options={blocks.data.map((block) => ({
                    value: block.name,
                    label: block.name,
                  }))}
                  onChange={(selectedOption) => {
                    setBlockId(
                      blocks.data.find((block) => {
                        if (!Array.isArray(selectedOption) && selectedOption) {
                          return block.name === selectedOption.label;
                        }
                      })?.id as string,
                    );
                  }}
                />
              )}
              {isLoadingVariants && (
                <div className={styles.loader}>
                  <Loader />
                </div>
              )}
              {isSuccessVariants && (
                <div className={styles.task_row}>
                  {variants.data[0].variants.map((variant) => (
                    <TaskRow
                      key={variant.id}
                      variant_id={variant.id}
                      name={variant.name}
                    />
                  ))}
                </div>
              )}
            </div>
            <Button type="submit" className={styles.btn}>
              Выдать задание
            </Button>
          </form>
        </FormProvider>
      </div>
    </>
  );
}

export default CreatureHomeworkTeacher;
