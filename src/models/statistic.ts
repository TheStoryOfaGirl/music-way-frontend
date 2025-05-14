export type StatisticByTopicBlock = {
  name: string;
  success_rate: number;
};

export type StatisticByUser = {
  success_rate: number;
  topic_blocks: TopicBlockShort[];
};

export type TopicBlockShort = {
  id: string;
  name: string;
};

export type StatisticByHomeworks = {
  id: string;
  topic: string;
  success_rate: number;
};

export type StatisticByHomeworkTask = StatisticByTopicBlock
