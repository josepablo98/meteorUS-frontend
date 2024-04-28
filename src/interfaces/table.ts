import { ActuatorFilter, DataProps, Filter, Register } from "./types";

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
  boardId: number;
  isNextPage: boolean;
  data: DataProps;
  startDate: Date | null;
  endDate: Date | null;
  finalRegisterValue: Register;
  finalFilterValue: Filter;
  finalActuatorFilterValue: ActuatorFilter;
  onNextPreviousPage: (count: 1 | -1) => void;
}