import { classnames } from "@utils";
import styles from "./Tab.module.css";

interface TabProps {
  name: string;
  active: string;
  onClick: (name: string) => void;
}

export const Tab = ({ name, active, onClick }: TabProps) => {
  return (
    <p
      className={classnames(
        "text_24_r",
        styles.tab,
        active === name ? styles.tab_active : "",
      )}
      onClick={() => onClick(name)}
    >
      {name}
    </p>
  );
};
