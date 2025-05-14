import { useLocation, useParams } from "react-router-dom";
import styles from "./TabTasks.module.css";
import { useCheckAuth, useGetTasksByTheme } from "@api";
import { LinkItem } from "@components/dummies";
import { pluralize } from "@utils";

export const TabTasks = () => {
  const location = useLocation();
  const { id } = useParams();
  const { isSuccess: isSuccessAuth } = useCheckAuth(location.pathname);
  const { data: tasks, isSuccess: isSuccessTasks } =
    useGetTasksByTheme(id as string);
  return (
    <>
      {isSuccessAuth && isSuccessTasks && (
        <div className={styles.tab}>
          {tasks.data.variants.length > 0 ? (
            <div className={styles.link_list}>
              {tasks.data.variants.map((variant) => (
                <div className={styles.link}>
                  <LinkItem
                    name={`${variant.name} (${pluralize(variant.count, ["задание", "задания", "заданий"])})`}
                    path="/"
                  />
                </div>
              ))}
            </div>
          ) : (
            <p className="text_24_m">Заданий на эту тему пока нет.</p>
          )}
        </div>
      )}
    </>
  );
};
