export type TabType = "video" | "text" | "tasks" | "feedback";

export type MaterialBlock = {
  id: string;
  name: string;
  image_url: string;
};

export type Theme = {
  id: string;
  name: string;
  number: number;
};

export type VideoTheme = {
  name: string;
  video_url: string;
};

export type TextTheme = {
  name: string;
  text: string;
};

export type TasksTheme = {
  name: string;
  variants: VariantTheme[];
};

export type VariantTheme = {
  variant_id: string;
  name: string;
  count: number;
};

export type FeedbackData = {
  comment: string;
};
