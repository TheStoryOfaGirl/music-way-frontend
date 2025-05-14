import { ResultStudentByHomework, TableColumn } from "@models";
import styles from "./TableResultsByHomework.module.css";
import { title } from "process";
import { Table } from "@components/shared";
import { translateTask } from "@utils";

interface TableResultsByHomeworkProps {
  results: ResultStudentByHomework[];
  max_mark: number;
}

export const TableResultsByHomework = ({
  results,
  max_mark,
}: TableResultsByHomeworkProps) => {
  const columns: TableColumn[] = [
    {
      key: "student",
      title: "Ученик",
      width: "240px",
      align: "left" as const,
    },
    ...results[0].tasks.map((task) => ({
      key: task.name,
      title: task.name,
      width: "220px",
      align: "right" as const,
    })),
    {
      key: "total_mark",
      title: "Общий балл",
      width: "1fr",
      align: "right" as const,
    },
  ];
  const tableData = results.map((result) => {
    const taskMarks = result.tasks.reduce(
      (acc, task) => {
        acc[task.name] = task.student_mark !== null ? `${task.student_mark}/${task.max_mark}` : '-';
        return acc;
      },
      {} as Record<string, string>,
    );
    return {
      student: `${result.surname} ${result.name}`,
      ...taskMarks,
      total_mark: result.student_mark !== null ? `${result.student_mark}/${max_mark}` : '-',
    };
  });
  return (
    <Table
      notDataMessage="Нет учеников"
      headerVariant="secondary"
      data={tableData}
      columns={columns}
    />
  );
};
