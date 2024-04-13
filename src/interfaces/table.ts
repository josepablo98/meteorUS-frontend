import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from "formik";
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

export interface FormTableComponentProps {
  numberPage: number;
  errors: FormikErrors<FormTableProps>;
  touched: FormikTouched<FormTableProps>;
  values: FormTableProps;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  getFieldProps: (nameOrOptions: string | FieldConfig<any>) => FieldInputProps<any>;
  onNextPreviousPage: (count: number) => void;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
}