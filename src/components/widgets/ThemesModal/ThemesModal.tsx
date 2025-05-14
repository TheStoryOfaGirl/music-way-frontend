import { Theme } from "@models";
import styles from "./ThemesModal.module.css";
import CloseIcon from "@assets/icons/X.svg?react";
import { Dispatch, SetStateAction } from "react";
import { Modal } from "@components/shared";
import { ThemeRow } from "@components/dummies";
import { useNavigate } from "react-router-dom";
import { URLS } from "@utils";

interface ThemesModalProps {
  name: string;
  themes: Theme[];
  showModal: boolean;
  setShowModal: Dispatch<SetStateAction<boolean>>;
}

export const ThemesModal = ({
  name,
  themes,
  showModal,
  setShowModal,
}: ThemesModalProps) => {
  const navigate = useNavigate();
  return (
    <Modal
      isOpen={showModal}
      onClose={() => setShowModal(false)}
      className={styles.modal}
    >
      <div className={styles.content}>
        <div className={styles.heading}>
          <h2>{name}</h2>
          <CloseIcon
            onClick={() => setShowModal(false)}
            className={styles.icon}
          />
        </div>
        <div className={styles.theme_list}>
          {themes.map((theme) => (
            <ThemeRow
              key={theme.id}
              name={theme.name}
              number={theme.number}
              onClick={() => navigate(`${URLS.MATERIALS}/${theme.id}`)}
            />
          ))}
        </div>
      </div>
    </Modal>
  );
};
