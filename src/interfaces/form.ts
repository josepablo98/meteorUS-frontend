import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from "formik";
import { ActuatorFilter, DataProps, Filter, Register } from "./types";

export interface FormProps {
  boardId: number;
  startDate: Date | null;
  endDate: Date | null;
  register: Register;
  filter: Filter;
  actuatorFilter: ActuatorFilter;
}

export interface ErrorProps {
  error: string;
}

export interface FormComponentProps {
  values: FormProps;
  errors: FormikErrors<FormProps>;
  touched: FormikTouched<FormProps>;
  isLoading: boolean;
  data: DataProps;
  isBoardId: boolean;
  isDate: boolean;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FormProps>>;
  getFieldProps: (nameOrOptions: string | FieldConfig<FormProps>) => FieldInputProps<FormProps>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResetForm: (e: any) => void;
  onTableReset: () => void;
  onToggleGraphic: () => void;
}

export interface InputFormProps {
  touched: FormikTouched<FormProps>;
  errors: FormikErrors<FormProps>;
  isBoardId: boolean;
  isDate: boolean;
  getFieldProps: (nameOrOptions: string | FieldConfig<FormProps>) => FieldInputProps<FormProps>;
}

export interface SelectFormProps {
  errors: FormikErrors<FormProps>;
  register: Register;
  filter: Filter;
  touched: FormikTouched<FormProps>;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  setFieldValue: (field: string, value: any, shouldValidate?: boolean | undefined) => Promise<void> | Promise<FormikErrors<FormProps>>;
  getFieldProps: (nameOrOptions: string | FieldConfig<FormProps>) => FieldInputProps<FormProps>;
}

export interface ButtonProps {
  data: DataProps;
  isLoading: boolean;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  onResetForm: (e: any) => void;
  onToggleGraphic: () => void;
  onTableReset: () => void;
}

export interface SchemaProps {
  isBoardId: boolean;
  isDate: boolean;
  isFilterAvailable: boolean;
  isActuatorFilterAvailable: boolean;
}