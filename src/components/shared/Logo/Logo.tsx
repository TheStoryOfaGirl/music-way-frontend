import { classnames } from "@utils";
import styles from "./Logo.module.css";
import LogoIcon from "@assets/icons/logo.svg?react";

export const Logo = () => {
  return (
    <div className={styles.container}>
      <LogoIcon />
      <span className={classnames("heading_3", styles.text_logo)}>
        Music Way
      </span>
    </div>
  );
};
