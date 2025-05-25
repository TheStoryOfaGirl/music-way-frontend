import {
  Button,
  CalendarCustom,
  IconContainer,
  Input,
  Loader,
  Modal,
} from "@components/shared";
import styles from "./HomeworkTeacher.module.css";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import PencilIcon from "@assets/icons/Pencil.svg?react";
import TrashIcon from "@assets/icons/Trash.svg?react";
import {
  useCheckAuth,
  useDeleteHomeworkTeacher,
  useGetHomeworkTeacher,
  useUpdateHomeworkTeacher,
} from "@api";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  classnames,
  formatDate,
  formatDateForUpdateHomework,
  formatDateRange,
  pluralize,
  URLS,
  useOnClickOutside,
} from "@utils";
import { TableResultsByHomework } from "@components/widgets";
import { LinkItem } from "@components/dummies";
import { RefObject, useEffect, useRef, useState } from "react";
import { FormProvider, useForm } from "react-hook-form";
import { UpdateHomeworkTeacher, ValuePiece } from "@models";

function HomeworkTeacher() {
  const { homeworkId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();
  const [isEdit, setIsEdit] = useState({
    isUpdate: false,
    isEndUpdate: false,
  });
  const [showModal, setShowModal] = useState(false);
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );
  const {
    isSuccess: isSuccessHomework,
    isLoading: isLoadingHomework,
    data: homework,
  } = useGetHomeworkTeacher(homeworkId as string);
  const { mutate: updateHomewrork, isPending: isPendingUpdateHomework } =
    useUpdateHomeworkTeacher();
  const { mutate: deleteHomework, isPending: isPendingDeleteHomework } =
    useDeleteHomeworkTeacher();
  const [topic, setTopic] = useState("");
  const [dateRange, setDateRange] = useState<
    ValuePiece | [ValuePiece, ValuePiece]
  >([new Date(), new Date()]);
  const [isVisibleCalendar, setIsVisibleCalendar] = useState({
    firstCalendar: false,
    secondCalendar: false,
  });
  const isActive = location.pathname.includes("active");
  const methods = useForm<UpdateHomeworkTeacher>();
  const onSubmit = (data: UpdateHomeworkTeacher) => {
    updateHomewrork(
      {
        homework_id: homeworkId as string,
        data: {
          topic: data.topic,
          start_date:
            Array.isArray(dateRange) && dateRange[0]
              ? formatDateForUpdateHomework(dateRange[0])
              : "",
          end_date:
            Array.isArray(dateRange) && dateRange[1]
              ? formatDateForUpdateHomework(dateRange[1])
              : "",
        },
      },
      {
        onSuccess: () => {
          setTopic(data.topic);
          setIsEdit({ isEndUpdate: true, isUpdate: false });
        },
      },
    );
  };
  const handleClickDelete = () => {
    deleteHomework(homeworkId as string, {
      onSuccess: () => {
        setShowModal(false);
        navigate(`${URLS.TEACHER.CLASSES}`);
      },
    });
  };
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
  useEffect(() => {
    if (isSuccessHomework && homework?.data) {
      setDateRange([
        new Date(homework.data.start_date),
        new Date(homework.data.end_date),
      ]);
      setTopic(homework.data.topic);
    }
  }, [isSuccessHomework, homework?.data]);
  if (isLoadingAuth || isLoadingHomework) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessHomework && (
        <div className={styles.container}>
          <FormProvider {...methods}>
            <form onSubmit={methods.handleSubmit(onSubmit)}>
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
                {isEdit.isUpdate ? (
                  <Input
                    name="topic"
                    defaultValue={topic}
                    className={styles.input_heading}
                  />
                ) : (
                  <h2 className="heading_2">{topic}</h2>
                )}

                {isActive && (
                  <div className={styles.edit_icons}>
                    {isEdit.isUpdate ? (
                      <Button
                        type="submit"
                        className="text_20_b"
                        disabled={isPendingUpdateHomework}
                      >
                        Сохранить
                      </Button>
                    ) : (
                      <IconContainer
                        color="purple"
                        shape="square"
                        content="icon"
                        onClick={() => {
                          setIsEdit({
                            isEndUpdate: false,
                            isUpdate: true,
                          });
                        }}
                      >
                        <PencilIcon width={32} height={32} />
                      </IconContainer>
                    )}
                    <IconContainer
                      color="purple"
                      shape="square"
                      content="icon"
                      onClick={() => {
                        setShowModal(true);
                      }}
                    >
                      <TrashIcon width={32} height={32} />
                    </IconContainer>
                  </div>
                )}
              </div>
              <div className={styles.date_mark}>
                {isEdit.isUpdate ? (
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
                ) : (
                  <p className="text_24_r">{`Срок выполнения: ${formatDateRange(String(Array.isArray(dateRange) ? dateRange[0] : ""), String(Array.isArray(dateRange) ? dateRange[1] : ""))}`}</p>
                )}
                <p className="text_24_r">
                  Маскимальный балл:{" "}
                  <span
                    className={classnames(styles.max_mark, "text_24_b")}
                  >{`${homework.data.max_mark}`}</span>{" "}
                </p>
              </div>
            </form>
          </FormProvider>
          <div className={styles.block_task_info}>
            <p className="text_24_b">{`Раздел: ${homework.data.block}`}</p>
            <p
              className={classnames("text_20_r", styles.tasks_p)}
            >{`Состоит из заданий: ${homework.data.task_type_variants.map((variant) => `${variant.name.toLowerCase()} (${pluralize(variant.count, ["задание", "задания", "заданий"])})`).join(", ")}`}</p>
          </div>
          <div className={styles.results_container}>
            <h3 className="heading_3">
              Результаты выполнения домашнего задания
            </h3>
            <TableResultsByHomework
              results={homework.data.results}
              max_mark={homework.data.max_mark}
            />
          </div>
          <div className={styles.related_materials}>
            <p className="text_24_b">Связанные учебные материалы</p>
            <ul className={styles.related_materials_list}>
              {homework.data.related_materials.map((link) => (
                <LinkItem
                  className="text_20_r"
                  key={link.id}
                  name={link.name}
                  path={`${URLS.MATERIALS}/${link.id}`}
                />
              ))}
            </ul>
          </div>
        </div>
      )}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          className={styles.modal}
        >
          <h3 className="heading_3">Подтвердите удаление</h3>
          <div className={styles.btn}>
            <Button
              color="purple"
              variant="secondary"
              onClick={() => setShowModal(false)}
            >
              Отмена
            </Button>
            <Button
              color="purple"
              onClick={handleClickDelete}
              disabled={isPendingDeleteHomework}
            >
              Удалить
            </Button>
          </div>
        </Modal>
      )}
    </>
  );
}

export default HomeworkTeacher;
