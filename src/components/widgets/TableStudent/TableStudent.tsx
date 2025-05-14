import { Table } from "@components/shared";
import { ClassStudent, StudentTable, TableColumn } from "@models";

interface TableStudentProps {
  data: Omit<StudentTable, "id">[];
}

export const TableStudent = ({ data }: TableStudentProps) => {
  const columns: TableColumn[] = [
    {
      key: "number",
      title: "№",
      width: "120px",
      align: "center"
    },
    {
      key: "name",
      title: "Имя",
      width: "220px",
    },
    { key: "surname", title: "Фамилия", width: "240px" },
    {
      key: "patronymic",
      title: "Отчество",
      width: "1fr",
    },
  ];
  const tableData = data.map((student, id) => ({ ...student, number: id + 1 }));
  return <Table notDataMessage="Нет учеников" headerVariant="primary" data={tableData} columns={columns}/>;
};
