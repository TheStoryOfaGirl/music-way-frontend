import { classnames } from "@utils";
import styles from "./Icon.module.css";

type IconShape = "circle" | "square";
type IconColor = "purple" | "blue" | "sky";
type IconContent = "text" | "icon";

interface IconProps {
  shape?: IconShape;
  color?: IconColor;
  shadow?: boolean;
  content?: IconContent;
  className?: string;
  children?: React.ReactNode;
  onClick?: () => void;
  active?: boolean;
  dataNumber?: string;
}

export const IconContainer = ({
  shape = "circle",
  color = "blue",
  shadow = false,
  content = "text",
  className,
  children,
  onClick,
  active,
  dataNumber,
}: IconProps) => {
  return (
    <div
      className={classnames(
        styles.container,
        styles[shape],
        styles[color],
        styles[content],
        !shadow ? styles.no_shadow : "",
        active ? styles.active_icon : "",
        className,
      )}
      onClick={onClick}
      data-number={dataNumber}
    >
      {children}
    </div>
  );
};
