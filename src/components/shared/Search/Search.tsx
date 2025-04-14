import { InputHTMLAttributes } from "react";
import styles from "./Search.module.css";
import SearchIcon from "@assets/icons/Search.svg?react";
import { classnames } from "@utils";

interface SearchProps
  extends Omit<InputHTMLAttributes<HTMLInputElement>, "type"> {
  onSearch?: () => void;
  className?: string;
}

export const Search = ({ onSearch, className, ...props }: SearchProps) => {
  return (
    <div className={styles.container}>
      <SearchIcon className={styles.icon_seacrh} />
      <input
        type="search"
        className={classnames(styles.input_search, "text_20_m", className)}
        onChange={onSearch}
        {...props}
      />
    </div>
  );
};
