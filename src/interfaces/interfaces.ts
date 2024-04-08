import { FieldConfig, FieldInputProps, FormikErrors, FormikTouched } from "formik";

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
  message: string;
}

export interface FormComponentProps {
  values: FormProps;
  errors: FormikErrors<FormProps>;
  touched: FormikTouched<FormProps>;
  isLoading: boolean;
  data: DataProps;
  isBoardId: boolean;
  isDate: boolean;
  getFieldProps: (nameOrOptions: string | FieldConfig<FormProps>) => FieldInputProps<FormProps>;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
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
  touched: FormikTouched<FormProps>;
  getFieldProps: (nameOrOptions: string | FieldConfig<FormProps>) => FieldInputProps<FormProps>;
}

export interface ButtonProps {
  data: DataProps;
  isLoading: boolean;
  onSubmit: (e?: React.FormEvent<HTMLFormElement> | undefined) => void;
  onResetForm: (e: any) => void;
  onToggleGraphic: () => void;
  onTableReset: () => void;
}

export interface SchemaProps {
  isBoardId: boolean;
  isDate: boolean;
}

export interface TableProps {
  data: DataProps;
}

export interface GetDataProps {
  boardId: number;
  startDate: Date | null;
  endDate: Date | null;
  filter: Filter;
  data: DataProps;
  actuatorFilter?: ActuatorFilter;
}

export interface Board {
  id: number;
  boardId: number;
  timest: number;
}

export interface BoardFormatted {
  id: number;
  boardId: number;
  timest: number;
  formattedDate: string;
}

export interface Temperature {
  id: number;
  temperature: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface TemperatureFormatted {
  id: number;
  temperature: number;
  humidity: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Pressure {
  id: number;
  pressure: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface PressureFormatted {
  id: number;
  pressure: number;
  altitude: number;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface Actuator {
  id: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
}

export interface ActuatorFormatted {
  id: number;
  isOn: boolean;
  isHot: boolean;
  isCold: boolean;
  timest: number;
  boardId: number;
  sensorId: string;
  formattedDate: string;
}

export interface ColumnProps {
  title: string;
  key: string;
}

export interface GraphicProps {
  data: DataProps;
}

export type DataProps = BoardFormatted[] | TemperatureFormatted[] | PressureFormatted[] | ActuatorFormatted[];

export type DataSimpleProps = BoardFormatted | TemperatureFormatted | PressureFormatted | ActuatorFormatted;

export type EndPoint = "board" | "temphum" | "pressure" | "actuator";

export type Register = "Registros de placas" | "Registros de temperaturas y humedad" | "Registros de presion y altitud" | "Registros de actuadores" | "-";

export type Filter = "Mostrar todo" | "Mostrar por boardId" | "Mostrar por fecha" | "Mostrar por boardId y fecha" | "-";

export type ActuatorFilter = "Mostrar todo" | "Mostrar por calor" | "Mostrar por frio" | "-";

export type Selects = Register | Filter | ActuatorFilter;