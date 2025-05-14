export type TrainingSimulatorShort = {
  block_name: string;
  variants: TrainingSimulatorVariantShort[]
}

export type TrainingSimulatorVariantShort = {
  id: string;
  name: string;
  image_url: string;
  description: string;
  demo_url: string;
}

export type TrainingSimulatorVariant = {
  id: string;
  name: string;
  description: string;
  demo_url: string;
  settings: Settings;
}

export type Settings = {
  description: string;
  intervals?: string[];
  melodies?: Melody[];
  is_need_count: boolean;
};

export type Melody = {
  id: string;
  name: string
}



