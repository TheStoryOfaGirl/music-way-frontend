import { classnames } from "@utils";
import styles from "./Table.module.css";
import { TableColumn } from "@models";

interface TableProps<T> {
  columns: TableColumn[];
  data: T[];
  headerVariant: "primary" | "secondary";
  notDataMessage: string;
}

export function Table<T extends Record<string, any>>({
  columns,
  data,
  headerVariant = "primary",
  notDataMessage,
}: TableProps<T>) {
  console.log(data.length);
  return (
    <div className={styles.table}>
      <div
        className={classnames(
          headerVariant === "primary"
            ? styles.header_primary
            : styles.header_secondary,
        )}
        style={{
          gridTemplateColumns: columns.map((col) => col.width).join(" "),
        }}
      >
        {columns.map((col) => (
          <div
            className={classnames(styles.col)}
            style={{ textAlign: col.align }}
            data-fulltext={col.title}
            key={col.key}
          >
            <div
              className={classnames(styles.col_content, "text_20_b")}
              data-fulltext={col.title}
            >
              {col.title}
            </div>
          </div>
        ))}
      </div>
      {data.length > 0 ? (
        data.map((row, index) => (
          <div
            className={styles.row}
            style={{
              gridTemplateColumns: columns.map((col) => col.width).join(" "),
            }}
            key={index}
          >
            {columns.map((col) => (
              <div
                className={classnames(
                  styles.col,
                  col.tooltip ? styles.tooltip : "",
                )}
                style={{ textAlign: col.align }}
                data-fulltext={row[col.key]}
                key={col.key}
              >
                <div className={classnames(styles.col_content, "text_20_r")}>
                  {row[col.key]}
                </div>
              </div>
            ))}
          </div>
        ))
      ) : (
        <p className={classnames(styles.notDataMessage, "text_24_r")}>
          {notDataMessage}
        </p>
      )}
    </div>
  );
}
