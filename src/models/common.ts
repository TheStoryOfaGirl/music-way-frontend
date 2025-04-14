export type ValuePiece = Date | null;

export interface SelectOption {
  value: string | number;
  label: string;
}

export interface TableColumn {
  key: string;
  title: string;
  width: string;
  align?: "left" | "center" | "right";
  tooltip?: boolean;
}
