import {
  BarChartCustom,
  Button,
  CalendarCustom,
  Card,
  Checkbox,
  IconContainer,
  Input,
  Modal,
  Search,
  Select,
  Table,
  Textarea,
} from "@components/shared";
import { FormProvider, useForm } from "react-hook-form";
import ChevronleftIcon from "@assets/icons/chevron-left.svg?react";
import PencilIcon from "@assets/icons/Pencil.svg?react";
import styles from "./Test.module.css";
import { useEffect, useState } from "react";
import {
  ActiveHomeworkRow,
  AccordionCompletedHomework,
  Tab,
  CompletedHomeworkRow,
  LinkItem,
  ThemeRow,
} from "@components/dummies";
import { mockTaskMark } from "./../../../mocks/mockTaskMarks";
import { MaterialsTabs, TaskRow } from "@components/widgets";
import { TableColumn, TabType, ValuePiece } from "@models";
import { useCheckAuth, useGetActiveHomeworks } from "@api";

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
}

const Test = () => {
  const { data: dataHome, isSuccess } = useGetActiveHomeworks(false);
  const { data: dataHomee, isSuccess: isSuccessHom } =
    useGetActiveHomeworks(true);
  console.log(dataHome?.data);
  const [activeTab, setActiveTab] = useState("Активные");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [activeMaterialsTab, setActiveMaterialsTab] =
    useState<TabType>("video");
  const handleClickActiveTab = (name: string) => {
    setActiveTab(name);
  };

  useEffect(() => {
    if (isSuccess) {
      console.log(dataHome.data);
    }
    if (isSuccessHom) {
      console.log(dataHomee.data);
    }
  }, [dataHome, dataHomee]);

  const products: Product[] = [
    {
      id: 1,
      name: "Ноутбук НоутбукНоутбу кНоутбукНоутбук",
      price: 999,
      category: "Электроника",
    },
    { id: 2, name: "Смартфон", price: 699, category: "Электроника" },
    { id: 3, name: "Кофемашина", price: 299, category: "Бытовая техника" },
  ];

  const columns: TableColumn[] = [
    { key: "id", title: "ID", width: "80px", align: "center" }, // Узкая колонка
    {
      key: "name",
      title: "Названиеbbbbb",
      width: "250px",
      tooltip: true,
    }, // Широкая колонка
    { key: "price", title: "Цена ($)", width: "120px" }, // Колонка средней ширины
    {
      key: "category",
      title: "Категорияvvvvvv",
      width: "200px",
    }, // Гибкая колонка (занимает оставшееся место)
  ];
  const methods = useForm();
  const onSubmit = (data: any) => console.log(data);
  const [value, setValue] = useState<ValuePiece | [ValuePiece, ValuePiece]>([
    new Date(),
    new Date(),
  ]);
  const [value2, setValue2] = useState<ValuePiece | [ValuePiece, ValuePiece]>([
    new Date(),
    new Date(),
  ]);
  const [firstDay, setFirstDay] = useState<ValuePiece>(new Date());
  const options = [
    { value: "м3", label: "м3" },
    { value: "ч1", label: "ч1" },
    { value: "ч8", label: "ч8" },
    { value: "б2", label: "б2" },
    { value: "All", label: "Все" },
  ];

  const options2 = [
    { value: "тема 1", label: "Тема 1" },
    { value: "тема 2", label: "Тема 2" },
    { value: "тема 3", label: "Тема 3" },
    { value: "тема 4", label: "Тема 4" },
  ];

  const data = [
    { name: "Определение на слух", value: 40 },
    { name: "Домашнее задание от 22.03.24", value: 30 },
    { name: "Март", value: 60 },
    { name: "Март", value: 60 },
    { name: "Март", value: 60 },
    { name: "Март", value: 60 },
    { name: "Март", value: 60 },
    { name: "Март", value: 60 },
  ];

  return (
    <>
      <title>Домашние задания</title>
      <div className={styles.layout}>
        {isSuccess && dataHome.data.map((home) => <p>{home.topic}</p>)}
        {isSuccessHom && dataHomee.data.map((home) => <p>{home.topic}</p>)}
        <div style={{ margin: "32px", height: "1px" }}></div>
        <FormProvider {...methods}>
          <form
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "16px",
              margin: "16px",
            }}
            className={styles.form}
            onSubmit={methods.handleSubmit(onSubmit)}
          >
            <Input
              name="Логин"
              placeholder="Логин"
              rules={{ required: "Поле обязательно для заполнения" }}
            />
            <Input
              name="Пароль"
              placeholder="Пароль"
              rules={{ required: "Поле обязательно для заполнения" }}
            />
            <Textarea
              name="comment"
              placeholder="Напишите комментарий..."
              rules={{ required: "Поле обязательно для заполнения" }}
            />
            <TaskRow
              label="Пропевание"
              options={options}
              showCountTasks
              placeholder="Выберите интервалы"
              descriptionSelect="Можете задать определённые простые интервалы, по умолчанию выбраны все:"
              descriptionTask="Описание"
              pathImage={"..."}
            />
            <Button type="submit" className="text_20_b">
              Нажать
            </Button>
          </form>
        </FormProvider>
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            gap: "16px",
            padding: "16px",
          }}
        >
          <Search placeholder="Искать материалы..." className={styles.search} />
          <Checkbox label="Количество заданий" id="col" />
          <Select options={options} multiple placeholder="Выберите интервалы" />
          <Select options={options2} placeholder="Выберите тему" />
          <Button
            type="submit"
            variant="secondary"
            color="sky"
            className="text_20_b"
          >
            Нажать
          </Button>
          <Button
            type="submit"
            variant="secondary"
            color="purple"
            className="text_20_b"
            iconPosition="left"
            icon={<PencilIcon />}
          >
            Нажать
          </Button>
          <Button
            type="submit"
            variant="tertiary"
            color="purple"
            className="text_20_b"
            iconPosition="left"
            icon={<PencilIcon />}
          >
            Нажать
          </Button>
          <IconContainer
            color="blue"
            content="text"
            dataNumber="1"
            className="text_24_b"
          />
          <IconContainer color="blue" content="icon" shadow>
            <ChevronleftIcon width={48} height={48} />
          </IconContainer>
          <IconContainer color="sky" shape="square" content="icon" shadow>
            <ChevronleftIcon />
          </IconContainer>
          <IconContainer color="purple" shape="square" content="icon">
            <PencilIcon width={32} height={32} />
          </IconContainer>

          <CalendarCustom onChange={setValue} value={value} />
          <Table columns={columns} data={products} headerVariant="primary" />
          <div style={{ height: "32px" }}></div>

          <Table columns={columns} data={products} headerVariant="secondary" />

          <div style={{ height: "32px" }}></div>

          <BarChartCustom
            data={data}
            layout="horizontal"
            sizeCategoryAxis={248}
            className={styles.barchart_hor}
          />
          <div style={{ height: "32px" }}></div>

          <BarChartCustom
            data={data}
            layout="vertical"
            sizeCategoryAxis={240}
            className={styles.barchart_ver}
            color="blue"
          />
          <div style={{ height: "32px" }}></div>

          <AccordionCompletedHomework
            name={mockTaskMark.name}
            totalMark={mockTaskMark.totalMark}
            mark={mockTaskMark.mark}
            tasks={mockTaskMark.tasks}
          />
          <div style={{ height: "32px" }}></div>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
              gap: "16px",
            }}
          >
            <Card name="Интервалы" pathImage="..." width="fill" />
            <Card name="Интервалы" pathImage="..." width="fill" />
            <Card name="Интервалы" pathImage="..." width="fill" />
          </div>
          <Card name="Интервалы" pathImage="..." width="fix" />
          <Tab
            name="Активные"
            active={activeTab}
            onClick={handleClickActiveTab}
          />
          <Tab
            name="Завершенные"
            active={activeTab}
            onClick={handleClickActiveTab}
          />

          <ActiveHomeworkRow
            variant="student"
            topic="Домашнее задание от 01.01.2025"
            end_date="2025-04-03"
            max_mark={80}
          />
          <ActiveHomeworkRow
            variant="teacher"
            topic="Домашнее задание от 01.01.2025"
            end_date="2025-04-03"
            start_date="2025-03-17"
            max_mark={80}
            countTasks={3}
          />

          <CompletedHomeworkRow
            variant="teacher"
            topic="Домашнее задание от 01.01.2025"
          />
          <CompletedHomeworkRow
            variant="student"
            topic="Домашнее задание от 01.01.2025"
            student_mark={80}
            max_mark={100}
          />

          <LinkItem name="Ссылка" path="/" />

          <ThemeRow name="Тема" number={1} onClick={() => {}} />
          <div>
            <button onClick={() => setIsModalOpen(true)}>
              Открыть модальное окно
            </button>

            <Modal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)}>
              <div>
                <h2>Заголовок модального окна</h2>
                <p>Содержимое модального окна...</p>
                <button onClick={() => setIsModalOpen(false)}>Закрыть</button>
              </div>
            </Modal>
            <div style={{ height: "32px" }}></div>

            {/* <LearningMaterialsTabs variant="student" activeTab={activeMaterialsTab} onTabChange={setActiveMaterialsTab}/> */}
            <MaterialsTabs
              variant="teacher"
              activeTab={activeMaterialsTab}
              onTabChange={setActiveMaterialsTab}
            />
          </div>
        </div>
        <div style={{ height: "64px" }}></div>
      </div>
    </>
  );
};

export default Test;
