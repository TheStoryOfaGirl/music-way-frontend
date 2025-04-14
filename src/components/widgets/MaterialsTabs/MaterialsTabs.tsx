import { Button } from "@components/shared";
import Book from "@assets/icons/Book.svg?react";
import CaretRightSquare from "@assets/icons/CaretRightSquare.svg?react";
import MusicNote from "@assets/icons/MusicNote.svg?react";
import Pencil from "@assets/icons/MusicNote.svg?react";
import styles from "./MaterialsTabs.module.css";
import { TabType } from "@models";

interface MaterialsTabsProps {
  variant: "student" | "teacher";
  activeTab: TabType;
  onTabChange: (tab: TabType) => void;
}

export const MaterialsTabs = ({
  variant,
  activeTab,
  onTabChange,
}: MaterialsTabsProps) => {
  const studentTabs = [
    { id: "video", label: "Видео", icon: <CaretRightSquare /> },
    { id: "text", label: "Текст", icon: <Book /> },
    { id: "tasks", label: "Задания", icon: <MusicNote /> },
  ];

  const teacherTabs = [
    ...studentTabs,
    { id: "feedback", label: "Обратная связь", icon: <Pencil /> },
  ];

  const tabs = variant === "student" ? studentTabs : teacherTabs;

  return (
    <div className={styles.container}>
      {tabs.map((tab) => (
        <Button
          variant="tertiary"
          icon={tab.icon}
          iconPosition="left"
          active={activeTab === tab.id}
          onClick={() => onTabChange(tab.id as TabType)}
          key={tab.id}
        >
          {tab.label}
        </Button>
      ))}
    </div>
  );
};
