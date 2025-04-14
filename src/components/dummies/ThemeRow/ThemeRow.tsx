import styles from "./ThemeRow.module.css";
import ChevronRight from "@assets/icons/chevron-right.svg?react";

interface ThemeRowProps {
  name: string;
  number: number;
  onClick: () => void;
}

export const ThemeRow = ({ name, number, onClick }: ThemeRowProps) => {
  return (
    <div className={styles.container} onClick={onClick}>
      <p className="text_24_r">{`${number}. ${name}`}</p>
      <ChevronRight className={styles.icon} width={56} height={48} />
    </div>
  );
};
