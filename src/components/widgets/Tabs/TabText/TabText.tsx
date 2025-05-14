import { useCheckAuth, useGetTextByTheme } from "@api";
import styles from "./TabText.module.css";
import { useLocation, useParams } from "react-router-dom";
import parse from "html-react-parser";
import { Button } from "@components/shared";
import { TabType } from "@models";
import { Dispatch, SetStateAction } from "react";

interface TabTextProps {
  setActiveTab: Dispatch<SetStateAction<TabType>>;
}

export const TabText = ({ setActiveTab }: TabTextProps) => {
  const location = useLocation();
  const { id } = useParams();
  const { isSuccess: isSuccessAuth } = useCheckAuth(location.pathname);
  const { data: text, isSuccess: isSuccessText } =
    useGetTextByTheme(id as string);
  return (
    <>
      {isSuccessAuth && isSuccessText && (
        <>
        <div className={styles.text}>{parse(text.data.text)}</div>
        <div className={styles.btn_container}>
          <Button color="purple" variant="secondary" className={styles.btn} onClick={() => setActiveTab("video")}>К видео</Button>
          <Button color="purple" className={styles.btn} onClick={() => setActiveTab("tasks")}>К заданиям</Button>
        </div>
        </>
      )}
    </>
  );
};
