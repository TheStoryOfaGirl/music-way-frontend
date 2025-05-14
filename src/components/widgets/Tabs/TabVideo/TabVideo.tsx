import { useState } from "react";
import styles from "./TabVideo.module.css";

interface TabVideoProps {
  videoUrl: string;
}

export const TabVideo = ({ videoUrl }: TabVideoProps) => {
  return (
    <div className={styles.tab}>
      {videoUrl ? (
        <video controls>
          <source src={videoUrl} type="video/mp4" />
        </video>
      ) : (
        <p className="text_24_m">
          Пока видео на данную тему нет, но скоро появится!
        </p>
      )}
    </div>
  );
};
