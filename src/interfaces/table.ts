import { DataProps } from "./types";

export interface TableProps {
  data: DataProps;
}

export interface ColumnProps {
  title: string;
  key: string;
}

export interface FormTableProps {
  numberPage: number;
}

export interface PageControlButtonsProps {
  numberPage: number;
  onNextPreviousPage: (count: 1 | -1) => void;
}