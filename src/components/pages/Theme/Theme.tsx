import { IconContainer, Loader } from "@components/shared";
import styles from "./Theme.module.css";
import ChevronLeftIcon from "@assets/icons/chevron-left.svg?react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import {
  MaterialsTabs,
  TabFeedback,
  TabTasks,
  TabText,
  TabVideo,
} from "@components/widgets";
import { useAuthStore } from "@stores";
import { useState } from "react";
import { TabType } from "@models";
import { useCheckAuth, useGetVideoByTheme } from "@api";

function Theme() {
  const navigate = useNavigate();
  const location = useLocation();
  const { role } = useAuthStore();
  const { isSuccess: isSuccessAuth, isLoading: isLoadingAuth } = useCheckAuth(
    location.pathname,
  );
  const { id } = useParams();
  const [activeTab, setActiveTab] = useState<TabType>("video" as TabType);
  const {
    data: video,
    isLoading: isLoadingVideo,
    isSuccess: isSuccessVideo,
  } = useGetVideoByTheme(id as string);

  const getActiveTab = (activeTab: string) => {
    switch (activeTab) {
      case "tasks":
        return <TabTasks />;
      case "text":
        return <TabText setActiveTab={setActiveTab} />;
      case "feedback":
        return <TabFeedback />;
      default:
        return (
          <>{isSuccessVideo && <TabVideo videoUrl={video.data.video_url} />}</>
        );
    }
  };

  if (isLoadingAuth || isLoadingVideo) return <Loader />;
  return (
    <>
      {isSuccessAuth && isSuccessVideo && (
        <div className={styles.container}>
          <div className={styles.heading}>
            <IconContainer
              color="sky"
              content="icon"
              shadow
              onClick={() => {
                navigate(-1);
              }}
            >
              <ChevronLeftIcon width={48} height={48} />
            </IconContainer>
            <h1 className="heading_1">{video.data.name}</h1>
          </div>
          {role && (
            <MaterialsTabs
              variant={role}
              activeTab={activeTab}
              onTabChange={setActiveTab}
            />
          )}
          <div className={styles.tab}>{getActiveTab(activeTab)}</div>
        </div>
      )}
    </>
  );
}

export default Theme;
